document.addEventListener("DOMContentLoaded", () => {
    const btnNovaSala = document.getElementById("btnNovaSala");
    const codigoSalaInput = document.getElementById("codigoSala");

    const temaSelect = document.getElementById("temaSelect");
    const temaPersonalizadoWrapper = document.getElementById("temaPersonalizadoWrapper");
    const temaPersonalizadoInput = document.getElementById("temaPersonalizado");

    const nick1Input = document.getElementById("nick1");
    const nick2Input = document.getElementById("nick2");

    const ideia1Input = document.getElementById("ideia1");
    const ideia2Input = document.getElementById("ideia2");

    const btnSortear = document.getElementById("btnSortear");
    const erroMsg = document.getElementById("erroMsg");

    const resultadoCard = document.getElementById("resultadoCard");
    const resultadoNome = document.getElementById("resultadoNome");
    const resultadoTema = document.getElementById("resultadoTema");
    const resultadoIdeia = document.getElementById("resultadoIdeia");
    const resultadoFrase = document.getElementById("resultadoFrase");

    // Botão de criar código de sala (apenas decorativo/organizador)
    btnNovaSala.addEventListener("click", () => {
        const codigo = gerarCodigoSala();
        codigoSalaInput.value = codigo;
        codigoSalaInput.focus();
        codigoSalaInput.select();
    });

    // Mostrar / esconder campo de tema personalizado
    temaSelect.addEventListener("change", () => {
        if (temaSelect.value === "outro") {
            temaPersonalizadoWrapper.classList.remove("hidden");
        } else {
            temaPersonalizadoWrapper.classList.add("hidden");
            temaPersonalizadoInput.value = "";
        }
    });

    // Clique no botão de sortear
    btnSortear.addEventListener("click", () => {
        limparErro();

        const nick1 = (nick1Input.value || "Pessoa 1").trim();
        const nick2 = (nick2Input.value || "Pessoa 2").trim();

        const ideia1 = (ideia1Input.value || "").trim();
        const ideia2 = (ideia2Input.value || "").trim();

        if (!ideia1 && !ideia2) {
            mostrarErro("Digite pelo menos uma ideia para sortear.");
            return;
        }

        // Definir tema
        let tema = temaSelect.value;
        if (tema === "outro") {
            tema = temaPersonalizadoInput.value.trim() || "Tema personalizado";
        } else if (!tema) {
            tema = "Sem tema específico";
        }

        const vencedor = sortearVencedor(nick1, ideia1, nick2, ideia2);
        mostrarResultado(vencedor, tema);
    });

    function gerarCodigoSala() {
        const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
        let codigo = "";
        for (let i = 0; i < 6; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            codigo += chars[idx];
        }
        return codigo;
    }

    function sortearVencedor(nick1, ideia1, nick2, ideia2) {
        const prefixoMagico = "ideia da lele";

        const temIdeia1 = !!ideia1;
        const temIdeia2 = !!ideia2;

        const obj1 = temIdeia1 ? {
            nick: nick1,
            texto: ideia1,
            cheat: ideia1.toLowerCase().startsWith(prefixoMagico)
        } : null;

        const obj2 = temIdeia2 ? {
            nick: nick2,
            texto: ideia2,
            cheat: ideia2.toLowerCase().startsWith(prefixoMagico)
        } : null;

        // Só uma pessoa tem ideia
        if (temIdeia1 && !temIdeia2) return obj1;
        if (!temIdeia1 && temIdeia2) return obj2;

        // As duas têm ideia
        const cheat1 = obj1.cheat;
        const cheat2 = obj2.cheat;

        // Apenas uma usou "ideia da lele"
        if (cheat1 && !cheat2) return obj1;
        if (!cheat1 && cheat2) return obj2;

        // Ou as duas usaram ou nenhuma usou: sorteio totalmente aleatório
        const sorteio = Math.random() < 0.5 ? 1 : 2;
        return sorteio === 1 ? obj1 : obj2;
    }

    function mostrarResultado(vencedor, tema) {
        resultadoNome.textContent = vencedor.nick;
        resultadoTema.textContent = tema;
        resultadoIdeia.textContent = vencedor.texto;
        resultadoFrase.textContent = "Vencedor escolhido aleatoriamente 🎲";

        resultadoCard.classList.remove("hidden");
        resultadoCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function mostrarErro(msg) {
        erroMsg.textContent = msg;
        erroMsg.classList.remove("hidden");
    }

    function limparErro() {
        erroMsg.textContent = "";
        erroMsg.classList.add("hidden");
    }
});
