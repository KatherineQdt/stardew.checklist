// Seleciona todos os checkboxes da página
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// Seleciona todos os buttons da página e itens da tabela
const botoes = document.querySelectorAll(".button button[data-estacao]");
const showAllButton = document.getElementById("todas");
const receitas = document.querySelectorAll("tbody tr");

//config da nav
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".menu-links");

// Percorre cada checkbox
checkboxes.forEach(cb => {
  // Quando o usuário marca ou desmarca, salva no LocalStorage
  cb.addEventListener("change", () => {
    localStorage.setItem(cb.id, cb.checked);
  });

  // Quando a página carrega, aplica o que já estava salvo
  if (localStorage.getItem(cb.id) === "true") {
    cb.checked = true;
  }
});

// Configuração dos botões de filtro (apenas um ativo)
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    // Remove "active" de todos os botões
    if (botao.classList.contains("active")) {
      botao.classList.remove("active");
      receitas.forEach(r => (r.style.display = ""));
      return; // sai da função
    }

    botoes.forEach(b => b.classList.remove("active"));
    botao.classList.add("active");

    const estacao = botao.dataset.estacao;

    // Mostra ou esconde receitas
    receitas.forEach(r => {
      const estacoesReceita = r.dataset.estacao.split(" "); // transforma "primavera verao" em ["primavera","verao"]

      if (estacao === "todas" || estacoesReceita.includes(estacao)) {
        r.style.display = ""; // mostra
      } else {
        r.style.display = "none"; // esconde
      }
    });
  });
});

// Botão "Todas"
showAllButton.addEventListener("click", () => {

    if (showAllButton.classList.contains("active")) {
    // Se já estava ativo → desativa e mostra tudo
    showAllButton.classList.remove("active");
    receitas.forEach(r => (r.style.display = ""));
    return;
  }

  // Remove "active" de todos os botões
  botoes.forEach(btn => btn.classList.remove("active"));

  // Marca o "Todas"
  showAllButton.classList.add("active");

  // Mostra todas as receitas
  receitas.forEach(r => (r.style.display = ""));
});

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

 // Pega todos os botões "toggle-all"
  document.querySelectorAll(".toggle-all").forEach(button => {
    button.addEventListener("click", function () {
      // Acha a tabela em que esse botão está
      let table = button.closest("table");
      let checkboxes = table.querySelectorAll("tbody input[type='checkbox']");
      
      // Verifica se todos já estão marcados
      let allChecked = Array.from(checkboxes).every(cb => cb.checked);

      // Marca ou desmarca todos
     // Marca ou desmarca todos + salva no localStorage
      checkboxes.forEach(cb => {
        cb.checked = !allChecked;
        localStorage.setItem(cb.id, cb.checked); // aqui salva o estado de cada checkbox
      });
    });
  });

document.querySelectorAll(".esconde").forEach(btn => {
  btn.textContent = ""; // garante que não tem texto

  btn.addEventListener("click", () => {
    const caixa = btn.closest(".caixa");
    caixa.classList.toggle("collapsed");

    if (caixa.classList.contains("collapsed")) {
      btn.style.backgroundImage = "url('src/imagens/baixo.png')";
    } else {
      btn.style.backgroundImage = "url('src/imagens/cima.png')";
    }
  });

  // ícone inicial (aberto)
  btn.style.backgroundImage = "url('src/imagens/cima.png')";
});