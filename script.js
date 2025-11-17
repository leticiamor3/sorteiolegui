document.addEventListener("DOMContentLoaded", () => {
    const btnNovaSala = document.getElementById("btnNovaSala");
    const codigoSalaInput = document.getElementById("codigoSala");

    const temaSelect = document.getElementById("temaSelect");
    const temaPersonalizadoWrapper = document.getElementById("temaPersonalizadoWrapper");
    const temaPersonalizadoInput = document.getElementById("temaPersonalizado");

    const nick1Input = document.getElementById("nick1");
    const nick2Input = document.getElementById("nick2");

    const ideia1_1 = document.getElementById("ideia1_1");
    const ideia1_2 = document.getElementById("ideia1_2");
    const ideia1_3 = document.getElementById("ideia1_3");

    const ideia2_1 = document.getElementById("ideia2_1");
    const ideia2_2 = document.getElementById("ideia2_2");
    const ideia2_3 = document.getElementById("ideia2_3");

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

        // Coletar ideias de cada pessoa
        const ideiasPessoa1 = coletarIdeiasDePessoa(nick1, [
            ideia1_1, ideia1_2, ideia1_3
        ], 1);

        const ideiasPessoa2 = coletarIdeiasDePessoa(nick2, [
            ideia2_1, ideia2_2, ideia2_3
        ], 2);

        const todasIdeias = [...ideiasPessoa1, ...ideiasPessoa2];

        if (todasIdeias.length === 0) {
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

        const vencedor = sortearVencedor(ideiasPessoa1, ideiasPessoa2, todasIdeias);
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

    function coletarIdeiasDePessoa(nick, campos, pessoaIndex) {
        const prefixoMagico = "ideia da lele";
        const lista = [];

        campos.forEach((campo) => {
            const texto = (campo.value || "").trim();
            if (!texto) return;

            const textoLower = texto.toLowerCase();
            const cheat = textoLower.startsWith(prefixoMagico);

            lista.push({
                nick,
                texto,
                pessoa: pessoaIndex,
                cheat
            });
        });

        return lista;
    }

    function sortearVencedor(ideiasPessoa1, ideiasPessoa2, todasIdeias) {
        const temIdeias1 = ideiasPessoa1.length > 0;
        const temIdeias2 = ideiasPessoa2.length > 0;

        // Se só uma pessoa tem ideias, ela ganha automaticamente
        if (temIdeias1 && !temIdeias2) {
            return escolherAleatoria(ideiasPessoa1);
        }
        if (!temIdeias1 && temIdeias2) {
            return escolherAleatoria(ideiasPessoa2);
        }

        // Ambas têm ideias: aplicar regra do prefixo mágico
        const cheatIdeias1 = ideiasPessoa1.filter(i => i.cheat);
        const cheatIdeias2 = ideiasPessoa2.filter(i => i.cheat);

        if (cheatIdeias1.length > 0 && cheatIdeias2.length === 0) {
            return escolherAleatoria(cheatIdeias1);
        }

        if (cheatIdeias1.length === 0 && cheatIdeias2.length > 0) {
            return escolherAleatoria(cheatIdeias2);
        }

        // Ou as duas usaram ou nenhuma usou: sorteio imparcial entre todas as ideias
        return escolherAleatoria(todasIdeias);
    }

    function escolherAleatoria(lista) {
        const idx = Math.floor(Math.random() * lista.length);
        return lista[idx];
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
