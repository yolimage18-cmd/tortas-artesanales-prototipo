import { products } from "../models/data.js";
import { Store } from "../models/store.js";
import { Router } from "../controllers/router.js";
import { CatalogController } from "../controllers/catalogController.js";
import { CartController } from "../controllers/cartController.js";

function productCard(p) {
  const price = Store.moneyCOP(p.price);
  const btnLabel = p.isAvailable ? "Carrito" : "Avisar";
  const btnClass = p.isAvailable ? "btn primary" : "btn soft";
  const disabled = p.isAvailable ? "" : "disabled";
  return `
    <article class="card product" data-open="${p.id}" aria-label="${p.name}">
      <div class="imgph">IMG</div>
      <div>
        <p class="p-name">${p.name}</p>
        <p class="p-sub">${p.size} • ${p.availability}</p>
        ${p.needs24hNotice ? `<p class="small" style="margin:6px 0 0;">Requiere 24h</p>` : ""}
      </div>
      <div class="actions">
        <span class="price-pill">${price}</span>
        <button class="${btnClass}" data-add="${p.id}" ${disabled}>${btnLabel}</button>
      </div>
    </article>
  `;
}

export function CatalogView(state) {
  const filter = state.catalog.sizeFilter;
  const list = (filter === "Todos"
    ? products
    : products.filter((p) => p.size === filter)
  ).map(productCard).join("");

  return `
    <div class="filters" aria-label="Filtros del catálogo">
      <button class="pill" data-pill="Filtro">Filtro</button>
      <button class="pill ${filter !== "Todos" ? "active": ""}" data-pill="Tamaño">Tamaño: ${filter}</button>
      <button class="pill" data-pill="Precio">Precio</button>
      <button class="pill" data-pill="Orden">↕</button>
    </div>

    <div class="list" style="margin-top:10px;">
      ${list}
    </div>

    <div style="display:flex;justify-content:center;margin-top:12px;">
      <button class="btn soft" data-action="loadMore">Cargar más</button>
    </div>
  `;
}

export function bindCatalogEvents(root) {
  // Filtros
  root.querySelectorAll("[data-pill]").forEach((b) => {
    b.addEventListener("click", () => {
      const key = b.getAttribute("data-pill");
      if (key === "Tamaño") {
        const next = prompt("Escribe tamaño: Todos / Mini / Mediana / Grande", "Todos");
        if (!next) return;
        const cleaned = next.trim();
        if (!["Todos","Mini","Mediana","Grande"].includes(cleaned)) {
          alert("Tamaño no válido.");
          return;
        }
        CatalogController.setSizeFilter(cleaned);
      } else {
        alert("Simulación: opción '" + key + "'");
      }
    });
  });

  // Abrir detalle
  root.querySelectorAll("[data-open]").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Si le dieron al botón, no abrir doble
      if (e.target && e.target.closest("[data-add]")) return;
      const id = card.getAttribute("data-open");
      Router.go("detail", { id });
    });
  });

  // Agregar al carrito
  root.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-add");
      const p = Store.getProduct(id);
      if (!p?.isAvailable) {
        alert("Producto no disponible. Puedes usar 'Avisar'.");
        return;
      }
      CartController.add(id, 1);
      toast(`${p.name} agregado al carrito`);
    });
  });

  // Cargar más (simulado)
  root.querySelector('[data-action="loadMore"]')?.addEventListener("click", () => {
    alert("Simulación: cargar más productos");
  });
}

function toast(msg){
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.bottom = "92px";
  t.style.background = "rgba(46,42,59,.92)";
  t.style.color = "white";
  t.style.padding = "10px 12px";
  t.style.borderRadius = "14px";
  t.style.fontSize = "12px";
  t.style.zIndex = "9999";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 1200);
}