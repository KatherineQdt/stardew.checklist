// ==================== Seletores ====================
// Seleciona todos os checkboxes da página
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// Seleciona todos os buttons da página e itens da tabela
const botoes = document.querySelectorAll(".button button[data-estacao]");
const showAllButton = document.getElementById("todas");
const receitas = document.querySelectorAll("tbody tr");

// Config da nav
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".menu-links");

// Barra de progresso
const progressBar = document.getElementById("progress-bar");


// ==================== Funções ====================
// Atualiza progresso e salva no LocalStorage
function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll("input[type='checkbox']:checked").length;
  const percent = (checked / total) * 100;

  progressBar.style.width = percent + "%";
  //progressBar.innerText = Math.round(percent) + "%";

  // mover junimo
  const junimo = document.querySelector('.junimo');
  const containerWidth = document.querySelector('.progress-container').offsetWidth;
  const junimoWidth = junimo.offsetWidth;
  const posicao = (containerWidth - junimoWidth) * (percent / 100);

  junimo.style.left = posicao + "px";

  // Salvar progresso
  localStorage.setItem("progress", percent);

  // Salvar estado dos checkboxes
  checkboxes.forEach(cb => {
    localStorage.setItem(cb.id, cb.checked);
  });
}

// Restaurar estado dos checkboxes e progresso
function restoreState() {
  checkboxes.forEach(cb => {
    if (localStorage.getItem(cb.id) === "true") {
      cb.checked = true;
    }
  });

  const savedProgress = localStorage.getItem("progress");
  if (savedProgress) {
    progressBar.style.width = savedProgress + "%";
    //progressBar.innerText = Math.round(savedProgress) + "%";

    // restaurar posição do junimo
    const junimo = document.querySelector('.junimo');
    const containerWidth = document.querySelector('.progress-container').offsetWidth;
    const junimoWidth = junimo.offsetWidth;
    const posicao = (containerWidth - junimoWidth) * (savedProgress / 100);
    junimo.style.left = posicao + "px";

  } else {
    updateProgress(); // recalcula se não tem salvo
  }
}


// ==================== Listeners ====================
// Cada checkbox individual
checkboxes.forEach(cb => {
  cb.addEventListener("change", updateProgress);
});

// Configuração dos botões de filtro (apenas um ativo)
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
      if (estacao === "todas" || estacoesReceita.includes(estacao)) {
        r.style.display = "";
      } else {
        r.style.display = "none";
      }
    });
  });
});

// Botão "Todas"
showAllButton.addEventListener("click", () => {
  if (showAllButton.classList.contains("active")) {
    showAllButton.classList.remove("active");
    receitas.forEach(r => (r.style.display = ""));
    return;
  }

  botoes.forEach(btn => btn.classList.remove("active"));
  showAllButton.classList.add("active");
  receitas.forEach(r => (r.style.display = ""));
});

// Menu
toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

// Botões "toggle-all"
document.querySelectorAll(".toggle-all").forEach(button => {
  button.addEventListener("click", function () {
    let table = button.closest("table");
    let checkboxes = table.querySelectorAll("tbody input[type='checkbox']");

    let allChecked = Array.from(checkboxes).every(cb => cb.checked);

    checkboxes.forEach(cb => {
      cb.checked = !allChecked;
      localStorage.setItem(cb.id, cb.checked); // salva estado
    });

    updateProgress();
  });
});

// Botões de esconder/mostrar tabelas
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

  btn.style.backgroundImage = "url('src/imagens/cima.png')";
});


// ==================== Inicialização ====================
restoreState();
