console.log("Script carregado!");

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

  const junimo = document.querySelector('#junimo');
  const junimoDance = document.querySelector('#junimo-dance');
  const parabens = document.querySelector('#parabens');
  const confettiContainer = document.querySelector('#confetti-container');

  if (junimo && percent < 100 ) {
    const containerWidth = document.querySelector('.progress-container').offsetWidth;
    const junimoWidth = junimo.offsetWidth;
    const posicao = (containerWidth - junimoWidth) * (percent / 100);
    junimo.style.left = posicao + "px";
  }

  // quando chega a 100%
  if (percent === 100) {
    window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    junimo.classList.add("hidden");
    junimoDance.classList.remove("hidden");
    parabens.classList.remove("hidden");
    confettiContainer.classList.remove("hidden");
    launchConfetti();
  }, 800); // espera ~0.8s pro scroll

  } else {
    // garante que volta ao estado inicial se desmarcar algo
    junimo.classList.remove("hidden");
    junimoDance.classList.add("hidden");
    parabens.classList.add("hidden");
    confettiContainer.classList.add("hidden");
    confettiContainer.innerHTML = ""; // limpa confetes antigos
  }
}

// cria confetes
function launchConfetti() {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

function randomColor() {
  const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#577590"];
  return colors[Math.floor(Math.random() * colors.length)];
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

document.querySelectorAll(".esconde2").forEach(btn => {
  btn.textContent = "";
  btn.addEventListener("click", () => {
    const caixa = btn.closest(".caixa");
    caixa.classList.toggle("collapsed");
    btn.style.backgroundImage = caixa.classList.contains("collapsed")
      ? "url('../imagens/baixo.png')"
      : "url('../imagens/cima.png')";
  });
  btn.style.backgroundImage = "url('../imagens/cima.png')";
});

// ==================== Inicialização ====================
restoreState();

// Pega o botão
const btnTopo = document.getElementById("btnTopo");
console.log("Botão capturado:", btnTopo);

// Mostra ou esconde conforme a rolagem
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) { 
    btnTopo.style.display = "block"; 
  } else {
    btnTopo.style.display = "none";
  }
});

// Faz voltar para o topo ao clicar
btnTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // rolagem suave
  });
});

// ======================= Feedback ==========================

(function prefill() {
  try {

    var baseViewUrl = "https://docs.google.com/forms/d/e/1FAIpQLSelOSf-RJMDyNlyAzUZq8yGLrLTOpXZNZCiawDc9-SNQU4ZIg/viewform?usp=dialog";

    var entryPagina = "1103647892"; 

    var u = new URL(baseViewUrl);
    u.searchParams.set("usp", "pp_url");
    u.searchParams.set(entryPagina, window.location.href);

    document.getElementById("gform").src = u.toString();
  } catch (e) {

    console.warn("Prefill falhou (usando embed padrão):", e);
  }
})();