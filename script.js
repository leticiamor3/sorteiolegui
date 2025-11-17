:root {
    --rosa-fundo: #ffe6f2;
    --rosa-card: #ffd1ec;
    --rosa-botao: #ff8ac2;
    --rosa-botao-hover: #ff6daf;
    --rosa-borda: #ffbfdc;
    --texto-escuro: #42273b;
    --erro: #ff3b6b;
    --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.08);
    --radius-card: 18px;
    --transition-base: 0.2s ease-out;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: linear-gradient(135deg, #ffe6f2, #ffeaf8);
    color: var(--texto-escuro);
    min-height: 100vh;
}

.page {
    max-width: 960px;
    margin: 0 auto;
    padding: 24px 16px 40px;
}

.header {
    text-align: center;
    margin-bottom: 24px;
}

.header h1 {
    font-size: 2.4rem;
    margin-bottom: 6px;
    letter-spacing: 0.05em;
}

.header p {
    font-size: 0.95rem;
    opacity: 0.85;
}

.card {
    background: #fff;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    padding: 18px 18px 16px;
    margin-bottom: 16px;
    border: 1px solid var(--rosa-borda);
}

.card h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.card h3 {
    font-size: 1rem;
    margin-bottom: 6px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 10px;
}

label {
    font-size: 0.9rem;
}

input,
select,
textarea {
    border-radius: 10px;
    border: 1px solid #f0b7d0;
    padding: 8px 10px;
    font-size: 0.9rem;
    outline: none;
    transition: border var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
    background: #fff9fd;
}

input:focus,
select:focus,
textarea:focus {
    border-color: var(--rosa-botao);
    box-shadow: 0 0 0 2px rgba(255, 138, 194, 0.25);
    transform: translateY(-1px);
}

textarea {
    resize: vertical;
    min-height: 60px;
}

.room-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.room-row input {
    flex: 1;
    min-width: 150px;
}

button {
    border: none;
    border-radius: 999px;
    background: var(--rosa-botao);
    color: #fff;
    padding: 8px 18px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
    box-shadow: 0 5px 12px rgba(255, 138, 194, 0.3);
    white-space: nowrap;
}

button:hover {
    background: var(--rosa-botao-hover);
    box-shadow: 0 8px 18px rgba(255, 138, 194, 0.4);
    transform: translateY(-1px);
}

button:active {
    transform: translateY(1px);
    box-shadow: 0 3px 8px rgba(255, 138, 194, 0.3);
}

.actions {
    text-align: center;
}

.actions button {
    padding: 10px 28px;
    font-size: 1rem;
}

.hint {
    font-size: 0.8rem;
    margin-top: 6px;
    opacity: 0.8;
}

.hint.small {
    margin-top: 10px;
}

code {
    background: #ffe6f4;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 0.8rem;
}

.two-columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.col {
    padding-top: 4px;
}

@media (min-width: 720px) {
    .two-columns {
        grid-template-columns: 1fr 1fr;
    }
}

.resultado {
    border-left: 6px solid var(--rosa-botao);
}

.resultado h2 {
    margin-bottom: 4px;
}

.frase {
    margin-top: 8px;
    font-weight: 600;
}

.footer {
    text-align: center;
    font-size: 0.8rem;
    margin-top: 10px;
    opacity: 0.8;
}

.hidden {
    display: none;
}

.erro {
    color: var(--erro);
    font-size: 0.85rem;
    margin-top: 8px;
}
