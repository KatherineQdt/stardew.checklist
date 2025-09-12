// menu toggle
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".menu-links");

toggle.addEventListener("click", () => links.classList.toggle("active"));

// Pega o botão
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
  
  
  if (window.scrollY > 200) {
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