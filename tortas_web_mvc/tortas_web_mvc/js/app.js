import { Store } from "./models/store.js";
import { Router } from "./controllers/router.js";
import { HomeView, bindHomeEvents } from "./views/homeView.js";
import { CatalogView, bindCatalogEvents } from "./views/catalogView.js";
import { DetailView, bindDetailEvents } from "./views/detailView.js";
import { CartView, bindCartEvents } from "./views/cartView.js";
import { ProfileView } from "./views/profileView.js";

const app = document.getElementById("app");
const title = document.getElementById("screenTitle");
const waFab = document.getElementById("waFab");

function render(state){
  const route = state.route?.name || "home";

  // título arriba (como wireframe)
  const titles = {
    home: "Inicio",
    catalog: "Catálogo",
    detail: "Detalle del producto",
    cart: "Carrito",
    profile: "Perfil"
  };
  title.textContent = titles[route] || "Inicio";

  // Vista
  let html = "";
  if (route === "home") html = HomeView(state);
  if (route === "catalog") html = CatalogView(state);
  if (route === "detail") html = DetailView(state);
  if (route === "cart") html = CartView(state);
  if (route === "profile") html = ProfileView(state);

  app.innerHTML = html;
  app.focus();

  // Bind eventos por pantalla
  if (route === "home") bindHomeEvents(app);
  if (route === "catalog") bindCatalogEvents(app);
  if (route === "detail") bindDetailEvents(app, state);
  if (route === "cart") bindCartEvents(app);

  // Nav
  document.querySelectorAll(".nav-item").forEach((btn) => {
    const name = btn.getAttribute("data-nav");
    btn.classList.toggle("active", name === route || (route === "detail" && name === "catalog"));
    btn.onclick = () => {
      if (name === "home") Router.go("home");
      if (name === "catalog") Router.go("catalog");
      if (name === "cart") Router.go("cart");
      if (name === "profile") Router.go("profile");
    };
  });
}

// WhatsApp (simulado)
waFab.addEventListener("click", () => {
  alert("Simulación: abrir WhatsApp con mensaje predefinido.");
});

Store.subscribe(render);
render(Store.getState());

// BONUS: permitir volver con back/forward del navegador (simple)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") Router.go("catalog");
});