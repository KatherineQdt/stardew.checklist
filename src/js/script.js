// ==================== Seletores ====================
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const botoes = document.querySelectorAll(".button button[data-estacao]");
const showAllButton = document.getElementById("todas");
const receitas = document.querySelectorAll("tbody tr");
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".menu-links");
const progressBar = document.getElementById("progress-bar");

// ==================== Funções ====================
// Atualiza progresso e salva estado dos checkboxes
function updateProgress() {
  let total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach(cb => {
    localStorage.setItem(cb.id, cb.checked);
    if (cb.checked) checked++;
  });

  const percent = (checked / total) * 100;
  progressBar.style.width = percent + "%";

  const junimo = document.querySelector('.junimo');
  if (junimo) {
    const containerWidth = document.querySelector('.progress-container').offsetWidth;
    const junimoWidth = junimo.offsetWidth;
    const posicao = (containerWidth - junimoWidth) * (percent / 100);
    junimo.style.left = posicao + "px";
  }
}

// Restaura estado dos checkboxes e recalcula progresso
function restoreState() {
  checkboxes.forEach(cb => {
    if (localStorage.getItem(cb.id) === "true") cb.checked = true;
  });
  updateProgress();
}

// ==================== Listeners ====================
checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.classList.contains("active")) {
      botao.classList.remove("active");
      receitas.forEach(r => (r.style.display = ""));
      return;
    }
    botoes.forEach(b => b.classList.remove("active"));
    botao.classList.add("active");
    const estacao = botao.dataset.estacao;
    receitas.forEach(r => {
      const estacoesReceita = r.dataset.estacao.split(" ");
      r.style.display = (estacao === "todas" || estacoesReceita.includes(estacao)) ? "" : "none";
    });
  });
});

showAllButton.addEventListener("click", () => {
  // remove estado ativo de todos os botões
  botoes.forEach(btn => btn.classList.remove("active"));
  showAllButton.classList.remove("active"); // garante que ele nunca fique ativo

  // mostra todas as receitas
  receitas.forEach(r => (r.style.display = ""));
});


toggle.addEventListener("click", () => links.classList.toggle("active"));

document.querySelectorAll(".toggle-all").forEach(button => {
  button.addEventListener("click", () => {
    let table = button.closest("table");
    let checks = table.querySelectorAll("tbody input[type='checkbox']");
    let allChecked = Array.from(checks).every(cb => cb.checked);
    checks.forEach(cb => {
      cb.checked = !allChecked;
      localStorage.setItem(cb.id, cb.checked);
    });
    updateProgress();
  });
});

document.querySelectorAll(".esconde").forEach(btn => {
  btn.textContent = "";
  btn.addEventListener("click", () => {
    const caixa = btn.closest(".caixa");
    caixa.classList.toggle("collapsed");
    btn.style.backgroundImage = caixa.classList.contains("collapsed")
      ? "url('src/imagens/baixo.png')"
      : "url('src/imagens/cima.png')";
  });
  btn.style.backgroundImage = "url('src/imagens/cima.png')";
});

// ==================== Inicialização ====================
restoreState();
