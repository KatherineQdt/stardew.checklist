// Seleciona todos os checkboxes da página
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// Seleciona todos os buttons da página e itens da tabela
const botoes = document.querySelectorAll(".button button");
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
    botoes.forEach(b => b.classList.remove("active"));

    // Marca só o botão clicado
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