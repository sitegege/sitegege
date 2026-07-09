/* ARQUITETURA DE DESIGN ULTRA-MODERNO NEON */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-tap-highlight-color: transparent;
}

:root {
    --color-bg-deep: #09030a;
    --color-surface-panel: #130a18;
    --color-surface-card: #1c1124;
    --neon-pink: #ff2a74;
    --neon-purple: #9d4edd;
    --neon-cyan: #05d9e8;
    --neon-green: #00ff88;
    --formal-gold: #e2b659;
    --text-pure: #ffffff;
    --text-muted: #a392ab;
    --glass-shimmer: rgba(255, 255, 255, 0.02);
}

body {
    background-color: var(--color-bg-deep);
    color: var(--text-pure);
    min-height: 100vh;
    overflow-x: hidden;
}

/* TIPOGRAFIA FORMAL */
h1, h2, h3 {
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
}

/* SISTEMA DE FLUXO DE TELAS */
.screen-wrapper {
    display: none;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.screen-wrapper.active {
    display: block;
    opacity: 1;
}

/* CARD DE LOGIN INICIAL */
#login-screen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at center, #1f0b29 0%, #09030a 100%);
    padding: 15px;
}

.login-card {
    background: var(--color-surface-panel);
    width: 100%;
    max-width: 420px;
    padding: 35px 25px;
    border-radius: 16px;
    border: 1px solid rgba(255, 42, 116, 0.4);
    box-shadow: 0 0 30px rgba(255, 42, 116, 0.15);
    text-align: center;
}

.security-icon {
    font-size: 45pt;
    color: var(--neon-pink);
    margin-bottom: 10px;
    text-shadow: 0 0 10px var(--neon-pink);
}

.login-card h1 {
    font-size: 20pt;
    font-weight: 800;
}

.login-subtitle {
    font-size: 9pt;
    color: var(--neon-cyan);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 25px;
}

.field-box {
    text-align: left;
    margin-bottom: 18px;
}

.field-box label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 8.5pt;
    color: var(--text-muted);
    margin-bottom: 6px;
    font-weight: 500;
}

.field-box label i { font-size: 11pt; color: var(--neon-purple); }

.field-box input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: var(--text-pure);
    font-size: 10pt;
    transition: all 0.2s ease;
}

.field-box input:focus {
    outline: none;
    border-color: var(--neon-pink);
    box-shadow: 0 0 12px rgba(255, 42, 116, 0.3);
}

.btn-neon-purple {
    width: 100%;
    padding: 14px;
    background: transparent;
    border: 2px solid var(--neon-purple);
    border-radius: 8px;
    color: var(--text-pure);
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s ease;
}

.btn-neon-purple:hover {
    background: var(--neon-purple);
    box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
}

/* PAINEL DE CONTROLE ADMINISTRATIVO */
.main-header {
    background: rgba(19, 10, 24, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 42, 116, 0.15);
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 90;
}

.brand-title { font-size: 18pt; font-weight: 800; }
.brand-line { height: 2px; background: linear-gradient(90deg, var(--neon-pink), transparent); margin-top: 2px; }

.meta-container { display: flex; align-items: center; gap: 20px; }
.live-clock { display: flex; align-items: center; gap: 6px; font-size: 9.5pt; color: var(--neon-cyan); font-weight: 500; }
.live-clock span { font-size: 13pt; }

.btn-logout-panel {
    background: transparent;
    border: 1px solid var(--text-muted);
    color: var(--text-muted);
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 8.5pt;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;
}

.btn-logout-panel:hover { border-color: var(--neon-pink); color: var(--text-pure); }

.panel-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px 15px 80px 15px;
}

/* GRID DE MÉTRICAS */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 15px;
    margin-bottom: 25px;
}

.metric-card {
    background: var(--color-surface-panel);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.03);
}

.metric-info h3 { font-size: 8.5pt; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; }
.metric-info p { font-size: 16pt; font-weight: 700; }

.card-pink { border-right: 4px solid var(--neon-pink); }
.card-pink span { color: var(--neon-pink); }
.card-purple { border-right: 4px solid var(--neon-purple); }
.card-purple span { color: var(--neon-purple); }
.card-cyan { border-right: 4px solid var(--neon-cyan); }
.card-cyan span { color: var(--neon-cyan); }

/* FILTRO DE PESQUISA */
.search-filter-bar {
    background: var(--color-surface-panel);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 20px;
}

.search-icon { color: var(--text-muted); margin-right: 10px; }
.search-filter-bar input {
    width: 100%;
    padding: 14px 0;
    background: transparent;
    border: none;
    color: var(--text-pure);
    font-size: 10pt;
}
.search-filter-bar input:focus { outline: none; }

.action-trigger-row { margin-bottom: 25px; }
.btn-action-create {
    background: rgba(255, 42, 116, 0.08);
    border: 1px solid var(--neon-pink);
    color: var(--text-pure);
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 0 10px rgba(255, 42, 116, 0.1);
}
.btn-action-create:hover { background: var(--neon-pink); box-shadow: 0 0 15px rgba(255, 42, 116, 0.4); }

/* ORGANIZAÇÃO EM COLUNAS VERTICAIS */
.vertical-workflow {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.workflow-column {
    background: var(--color-surface-panel);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.02);
}

.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.column-header h2 { font-size: 12pt; font-weight: 700; display: flex; align-items: center; gap: 8px; }
.column-header h2 span { font-size: 15pt; }

.badge-count { background: rgba(255,255,255,0.08); padding: 2px 10px; border-radius: 20px; font-size: 8.5pt; font-weight: 700; }

.border-cyan { color: var(--neon-cyan); }
.border-purple { color: var(--neon-purple); }
.border-pink { color: var(--neon-pink); }
.border-gold { color: var(--formal-gold); }
.border-green { color: var(--neon-green); }

.card-dropzone {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 50px;
}

/* CARDS DE CONTEÚDO (MÓDULOS DE OS) */
.os-interactive-card {
    background: var(--color-surface-card);
    border-radius: 10px;
    padding: 16px;
    border-left: 4px solid var(--text-muted);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.os-interactive-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 42, 116, 0.15);
}

/* DETALHE REQUISITADO: Linhas finas de bordas baseadas no status */
.status-analise { border-left-color: var(--neon-cyan); border-top: 1px solid rgba(5, 217, 232, 0.1); }
.status-manutencao { border-left-color: var(--neon-purple); border-top: 1px solid rgba(157, 78, 221, 0.1); }
.status-finalizado { border-left-color: var(--neon-pink); border-top: 1px solid rgba(255, 42, 116, 0.1); }

.card-meta-top { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 8.5pt; color: var(--text-muted); }
.card-main-title { font-size: 11pt; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.card-problem-text { font-size: 9.5pt; color: var(--text-muted); margin-bottom: 12px; font-style: italic; }

.card-control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.04);
    padding-top: 12px;
}

.card-price-display { color: var(--neon-green); font-weight: 700; font-size: 11pt; }
.card-action-triggers { display: flex; gap: 8px; }

.btn-small-trigger {
    background: rgba(255,255,255,0.04);
    border: none;
    color: var(--text-pure);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 8pt;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}
.btn-small-trigger i { font-size: 9pt; }
.btn-advance-phase { background: rgba(255, 42, 116, 0.15); border: 1px solid var(--neon-pink); }

/* CONTROLES E EXIBIÇÕES DO FINANCEIRO (Apenas visualização do essencial) */
.finance-meta-labels {
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: var(--text-muted);
    text-transform: uppercase;
    padding: 0 5px 8px 5px;
    border-bottom: 1px solid rgba(226, 182, 89, 0.2);
    margin-bottom: 10px;
}

.finance-row-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(226, 182, 89, 0.02);
    border: 1px dashed rgba(226, 182, 89, 0.15);
    padding: 12px;
    border-radius: 6px;
}

.fin-title-info h4 { font-size: 10pt; font-weight: 600; }
.fin-title-info p { font-size: 8.5pt; color: var(--text-muted); }
.fin-values-info { text-align: right; }
.fin-status-badge { font-size: 7.5pt; text-transform: uppercase; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px; display: inline-block; }
.badge-state-analise { background: rgba(5, 217, 232, 0.15); color: var(--neon-cyan); }
.badge-state-manutencao { background: rgba(157, 78, 221, 0.15); color: var(--neon-purple); }
.badge-state-finalizado { background: rgba(255, 42, 116, 0.15); color: var(--neon-pink); }
.fin-value-text { color: var(--neon-green); font-weight: 700; font-size: 10.5pt; display: block; }

/* ROW ALERTAS DE ENTREGA */
.delivery-alert-row {
    background: rgba(0, 255, 136, 0.04);
    border-left: 4px solid var(--neon-green);
    padding: 12px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.delivery-alert-row h4 { font-size: 10pt; font-weight: 600; }
.delivery-deadline-badge { background: #000; padding: 4px 8px; border-radius: 4px; font-size: 8pt; color: var(--neon-green); font-weight: 600; }

/* MODAL OVERLAY WINDOW */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(9, 3, 10, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    padding: 15px;
}

.modal-window {
    background: var(--color-surface-panel);
    border: 1px solid var(--neon-pink);
    box-shadow: 0 0 35px rgba(255, 42, 116, 0.2);
    width: 100%;
    max-width: 650px;
    border-radius: 14px;
    padding: 25px;
    position: relative;
    animation: modalSlide 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlide {
    from { transform: translateY(15px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-header-bar { display: flex; justify-content: space-between; align-items: center; }
.modal-header-bar h2 { font-size: 14pt; font-weight: 700; }
.close-modal-btn { color: var(--text-muted); cursor: pointer; font-size: 20pt; }
.close-modal-btn:hover { color: var(--neon-pink); }
.modal-accent-line { height: 2px; width: 50px; background: var(--neon-pink); margin: 6px 0 20px 0; }

.form-row-grid { display: grid; gap: 15px; margin-bottom: 15px; }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }

.input-element { margin-bottom: 15px; display: flex; flex-direction: column; }
.input-element label { font-size: 8.5pt; color: var(--text-muted); font-weight: 600; margin-bottom: 6px; }
.input-element input, .input-element select, .input-element textarea {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 12px;
    border-radius: 6px;
    color: var(--text-pure);
    font-size: 9.5pt;
}
.input-element input:focus, .input-element select:focus, .input-element textarea:focus { outline: none; border-color: var(--neon-pink); }

.btn-submit-form {
    width: 100%;
    padding: 14px;
    background: var(--neon-pink);
    border: none;
    border-radius: 6px;
    color: var(--text-pure);
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 42, 116, 0.3);
}

/* RESPONSIVIDADE EM DISPOSITIVOS MÓVEIS (SEM TRAVAMENTOS OU QUEBRAS) */
@media (max-width: 650px) {
    .grid-3, .grid-2 { grid-template-columns: 1fr; }
    .main-header { padding: 12px 15px; }
    .brand-title { font-size: 14pt; }
    .panel-container { padding: 15px 10px; }
    .metrics-grid { grid-template-columns: 1fr; }
}
