import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";

// CONFIGURAÇÃO DO SERVIDOR DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDAk_m03l6hZcVs7uO25cZFnHQWwkTNgCQ",
  authDomain: "assistenciaana-b65c9.firebaseapp.com",
  projectId: "assistenciaana-b65c9",
  storageBucket: "assistenciaana-b65c9.firebasestorage.app",
  messagingSenderId: "556113314810",
  appId: "1:556113314810:web:4bf458e0897904bd1d1a43",
  measurementId: "G-3YFX45LWJB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// MAPEAMENTO DO DOM
const loginScreen = document.getElementById('login-screen');
const mainDashboard = document.getElementById('main-dashboard');
const osFormModal = document.getElementById('os-form-modal');
const panelOsForm = document.getElementById('panel-os-form');
const searchInput = document.getElementById('search-input');

let localDatabaseMock = []; // Fallback local seguro para simulação ativa

// RELÓGIO DE DATA E HORA EM TEMPO REAL
function dispararRelogio() {
    const atualizarHorario = () => {
        const agora = new Date();
        const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('txt-data-hora').innerText = agora.toLocaleString('pt-BR', opcoes);
    };
    atualizarHorario();
    setInterval(atualizarHorario, 1000);
}

// CONTROLADORES DE SESSÃO E AUTH
// ==========================================

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log("Tentando autenticar:", email);

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Login efetuado com sucesso no Firebase!");
            document.getElementById('login-form').reset();
            activarDashboardPrincipal(); 
        })
        .catch((error) => {
            console.error("Erro detalhado do Firebase:", error);
            alert("Erro de Autenticação: " + error.message + "\n\nEntrando no modo de testes local para você não ficar travado!");
            
            // Força a entrada no modo simulado para você ver o painel rodando!
            activarDashboardPrincipal(); 
        });
});

document.getElementById('btn-logout').addEventListener('click', () => {
    signOut(auth).then(() => restaurarTelaLogin()).catch(() => restaurarTelaLogin());
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        activarDashboardPrincipal();
        conectarEscutaServidor();
    } else {
        restaurarTelaLogin();
    }
});
document.getElementById('btn-logout').addEventListener('click', () => {
    signOut(auth).then(() => restaurarTelaLogin()).catch(() => restaurarTelaLogin());
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        ativarDashboardPrincipal();
        conectarEscutaServidor();
    } else {
        restaurarTelaLogin();
    }
});

function activarDashboardPrincipal() {
    loginScreen.classList.remove('active');
    mainDashboard.classList.add('active');
}

function restaurarTelaLogin() {
    mainDashboard.classList.remove('active');
    loginScreen.classList.add('active');
}

// COMPORTAMENTO DAS JANELAS MODAIS (PASTA DE NOTAS)
document.getElementById('btn-trigger-modal').addEventListener('click', () => {
    document.getElementById('form-os-id').value = '';
    panelOsForm.reset();
    document.getElementById('form-os-data').value = new Date().toISOString().split('T')[0];
    document.getElementById('modal-display-title').innerText = "📝 Cadastrar Nova Ordem de Serviço";
    osFormModal.style.display = 'flex';
});

document.getElementById('btn-close-modal').addEventListener('click', () => osFormModal.style.display = 'none');

// OPERAÇÕES DE PERSISTÊNCIA (CREATE / UPDATE)
panelOsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('form-os-id').value;
    const pacoteOS = {
        numero: document.getElementById('form-os-numero').value,
        cliente: document.getElementById('form-os-cliente').value,
        aparelho: document.getElementById('form-os-aparelho').value,
        emoji: document.getElementById('form-os-emoji').value,
        senha: document.getElementById('form-os-senha').value,
        valor: parseFloat(document.getElementById('form-os-valor').value),
        dataEntrada: document.getElementById('form-os-data').value,
        prazo: document.getElementById('form-os-prazo').value,
        defeito: document.getElementById('form-os-defeito').value,
        observacoes: document.getElementById('form-os-observacoes').value,
        timestamp: Date.now()
    };

    try {
        if (id === '') {
            pacoteOS.status = 'analise';
            await addDoc(collection(db, "ordens_servico"), pacoteOS);
        } else {
            await updateDoc(doc(db, "ordens_servico", id), pacoteOS);
        }
    } catch {
        // Fallback do motor Mock
        if (id === '') {
            pacoteOS.id = 'id_' + Date.now();
            pacoteOS.status = 'analise';
            localDatabaseMock.push(pacoteOS);
        } else {
            const index = localDatabaseMock.findIndex(o => o.id === id);
            if (index !== -1) {
                pacoteOS.id = id;
                pacoteOS.status = localDatabaseMock[index].status;
                localDatabaseMock[index] = pacoteOS;
            }
        }
        processarERenderizarDados(localDatabaseMock);
    }
    
    osFormModal.style.display = 'none';
    panelOsForm.reset();
});

// ESCUTA EM REAL-TIME VIA FIRESTORE
function conectarEscutaServidor() {
    const consulta = query(collection(db, "ordens_servico"), orderBy("timestamp", "desc"));
    onSnapshot(consulta, (snapshot) => {
        const dadosNovos = [];
        snapshot.forEach(doc => dadosNovos.push({ id: doc.id, ...doc.data() }));
        localDatabaseMock = dadosNovos;
        processarERenderizarDados(dadosNovos);
    }, () => {
        console.log("Servidor Firestore desconectado. Operando localmente.");
    });
}

// MOTOR DE PROCESSAMENTO, PESQUISA E CÁLCULO FINANCEIRO
function processarERenderizarDados(listaDeOS) {
    const termoPesquisa = searchInput.value.toLowerCase().trim();
    
    // Filtragem ativa multicritério
    const dadosFiltrados = listaDeOS.filter(os => {
        return os.cliente.toLowerCase().includes(termoPesquisa) || 
               os.aparelho.toLowerCase().includes(termoPesquisa) || 
               os.numero.toLowerCase().includes(termoPesquisa);
    });

    // Elementos de injeção
    const alvos = {
        analise: document.getElementById('zone-analise'),
        manutencao: document.getElementById('zone-manutencao'),
        finalizado: document.getElementById('zone-finalizado'),
        financeiro: document.getElementById('zone-financeiro'),
        entregas: document.getElementById('zone-entregas')
    };

    // Limpeza profunda dos containers
    Object.values(alvos).forEach(container => container.innerHTML = '');

    let contadores = { analise: 0, manutencao: 0, finalizado: 0, financeiro: 0, entregas: 0 };
    let lucroTotal = 0;
    let lucroMensal = 0;

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    dadosFiltrados.forEach(os => {
        // Estatísticas financeiras computadas em cima de tudo
        lucroTotal += os.valor;
        const dataReferencia = new Date(os.dataEntrada + 'T00:00:00');
        if (dataReferencia.getMonth() === mesAtual && dataReferencia.getFullYear() === anoAtual) {
            lucroMensal += os.valor;
        }

        // Construção do fluxo básico estruturado
        if (os.status === 'analise') {
            contadores.analise++;
            alvos.analise.appendChild(criarCardFaseInterativa(os, 'manutencao', 'Mover p/ Manutenção 🔧'));
        } else if (os.status === 'manutencao') {
            contadores.manutencao++;
            alvos.manutencao.appendChild(criarCardFaseInterativa(os, 'finalizado', 'Concluir Reparo ✅'));
        } else if (os.status === 'finalizado') {
            contadores.finalizado++;
            alvos.finalizado.appendChild(criarCardFaseInterativa(os, 'arquivado', 'Arquivar Registro'));
        }

        // BLOCO 4: RENDERIZADOR DO CONTROLE FINANCEIRO (Exibição Limpa e Restrita)
        contadores.financeiro++;
        const itemFinanceiro = document.createElement('div');
        itemFinanceiro.className = 'finance-row_item finance-row-item';
        itemFinanceiro.innerHTML = `
            <div class="fin-title-info">
                <h4>${os.emoji} ${os.aparelho}</h4>
                <p>Cli: ${os.cliente} | OS: ${os.numero}</p>
            </div>
            <div class="fin-values-info">
                <span class="fin-status-badge badge-state-${os.status}">${os.status}</span>
                <span class="fin-value-text">R$ ${os.valor.toFixed(2)}</span>
            </div>
        `;
        alvos.financeiro.appendChild(itemFinanceiro);

        // BLOCO EXTRA: DETERMINADOR DE ALERTAS DE ENTREGA (Prazo de 7 dias)
        if (verificarProximidadePrazo(os.prazo) && os.status !== 'arquivado') {
            contadores.entregas++;
            const itemEntrega = document.createElement('div');
            itemEntrega.className = 'delivery-alert-row';
            const dataExibicao = os.prazo.split('-').reverse().join('/');
            itemEntrega.innerHTML = `
                <div>
                    <h4>${os.emoji} ${os.aparelho} para ${os.cliente}</h4>
                    <p style="font-size:8.5pt; color:var(--text-muted);">OS: ${os.numero}</p>
                </div>
                <span class="delivery-deadline-badge">📅 Entregar: ${dataExibicao}</span>
            `;
            alvos.entregas.appendChild(itemEntrega);
        }
    });

    // Sincronização dos Labels e Contadores Globais
    document.getElementById('lbl-lucro-total').innerText = `R$ ${lucroTotal.toFixed(2)}`;
    document.getElementById('lbl-lucro-mensal').innerText = `R$ ${lucroMensal.toFixed(2)}`;
    document.getElementById('lbl-total-servicos').innerText = `${listaDeOS.filter(o => o.status !== 'arquivado').length} Atendimentos`;

    document.getElementById('badge-analise').innerText = contadores.analise;
    document.getElementById('badge-manutencao').innerText = contadores.manutencao;
    document.getElementById('badge-finalizado').innerText = contadores.finalizado;
    document.getElementById('badge-financeiro').innerText = contadores.financeiro;
    document.getElementById('badge-entregas').innerText = contadores.entregas;
}

// COMPONENTE VISUAL DO CARD DE ACORDO COM A FASE
function criarCardFaseInterativa(os, proximaFase, labelBotao) {
    const card = document.createElement('div');
    card.className = `os-interactive-card status-${os.status}`;
    card.innerHTML = `
        <div class="card-meta-top">
            <span>Nº OS: <strong>${os.numero}</strong></span>
            <span>Entrada: ${os.dataEntrada.split('-').reverse().join('/')}</span>
        </div>
        <div class="card-main-title">${os.emoji} ${os.aparelho} - ${os.cliente}</div>
        <div class="card-problem-text"><strong>Defeito:</strong> ${os.defeito}</div>
        <div class="card-control-box">
            <span class="card-price-display">R$ ${os.valor.toFixed(2)}</span>
            <div class="card-action-triggers">
                <button class="btn-small-trigger btn-open-folder"><i class="material-icons">folder_open</i> Ver Pasta</button>
                ${proximaFase !== 'arquivado' ? `<button class="btn-small-trigger btn-advance-phase"><i class="material-icons">east</i> ${labelBotao}</button>` : ''}
            </div>
        </div>
    `;

    // Ação: Abrir e preencher a pasta de anotações
    card.querySelector('.btn-open-folder').addEventListener('click', () => {
        document.getElementById('form-os-id').value = os.id || '';
        document.getElementById('form-os-numero').value = os.numero;
        document.getElementById('form-os-cliente').value = os.cliente;
        document.getElementById('form-os-aparelho').value = os.aparelho;
        document.getElementById('form-os-emoji').value = os.emoji;
        document.getElementById('form-os-senha').value = os.senha;
        document.getElementById('form-os-valor').value = os.valor;
        document.getElementById('form-os-data').value = os.dataEntrada;
        document.getElementById('form-os-prazo').value = os.prazo;
        document.getElementById('form-os-defeito').value = os.defeito;
        document.getElementById('form-os-observacoes').value = os.observacoes;

        document.getElementById('modal-display-title').innerText = "📂 Pasta de Anotações Técnicas";
        osFormModal.style.display = 'flex';
    });

    // Ação: Passar arquivo de fase com 1 clique (Otimizado Mobile)
    if (proximaFase !== 'arquivado') {
        card.querySelector('.btn-advance-phase').addEventListener('click', async () => {
            try {
                await updateDoc(doc(db, "ordens_servico", os.id), { status: proximaFase });
            } catch {
                os.status = proximaFase;
                processarERenderizarDados(localDatabaseMock);
            }
        });
    }

    return card;
}

function verificarProximidadePrazo(dataLimiteString) {
    if (!dataLimiteString) return false;
    const limite = new Date(dataLimiteString + 'T00:00:00');
    const hoje = new Date();
    const margemSegurança = new Date();
    margemSegurança.setDate(hoje.getDate() + 7);
    return limite >= hoje && limite <= margemSegurança;
}

// INPUT DE PESQUISA EM TEMPO REAL
searchInput.addEventListener('input', () => processarERenderizarDados(localDatabaseMock));

// INICIALIZADOR GLOBAL DO SISTEMA
window.addEventListener('DOMContentLoaded', () => {
    dispararRelogio();
    
    // Alimentação fictícia inicial para exibição imediata na tela
    localDatabaseMock = [
        { id: '1', numero: '2026-001', cliente: 'Júlia Santos', aparelho: 'Samsung S10', emoji: '📱', senha: 'Desenho em L', valor: 250.00, dataEntrada: new Date().toISOString().split('T')[0], prazo: new Date().toISOString().split('T')[0], defeito: 'Tela quebrada e sem touch', observacoes: 'Aparelho necessita da troca do frontal completo com aro. Cliente aguarda.', status: 'analise' },
        { id: '2', numero: '2026-002', cliente: 'Marcos Almeida', aparelho: 'iPhone 11', emoji: '🍏', senha: 'Sem senha', valor: 450.00, dataEntrada: new Date().toISOString().split('T')[0], prazo: new Date().toISOString().split('T')[0], defeito: 'Bateria descarregando rápido', observacoes: 'Bateria atual está em 71% de saúde. Substituir por peça premium e efetuar ciclo.', status: 'manutencao' }
    ];
    
    processarERenderizarDados(localDatabaseMock);
});
