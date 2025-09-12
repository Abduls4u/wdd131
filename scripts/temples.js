document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.style.display === "flex";
  navMenu.style.display = isOpen ? "none" : "flex";
  hamburger.textContent = isOpen ? "☰" : "✖"; // toggle symbol
});