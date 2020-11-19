let menuToggle = document.querySelector("#menu-toogle");
let menu = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.toggle("visible");
});
