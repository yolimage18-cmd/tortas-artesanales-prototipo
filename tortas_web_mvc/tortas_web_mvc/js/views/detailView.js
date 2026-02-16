import { Store } from "../models/store.js";
import { Router } from "../controllers/router.js";
import { CartController } from "../controllers/cartController.js";

export function DetailView(state) {
  const id = state.route.params?.id;
  const p = Store.getProduct(id);
  if (!p) {
    return `
      <div class="card" style="padding:14px;">
        No se encontró el producto.
        <div style="margin-top:10px;">
          <button class="btn primary" data-action="goCatalog">Volver al catálogo</button>
        </div>
      </div>
    `;
  }

  const price = Store.moneyCOP(p.price);
  const subtotal = Store.moneyCOP(Store.cartSubtotal());
  const delivery = Store.moneyCOP(Store.deliveryFee());
  const total = Store.moneyCOP(Store.cartTotal());

  return `
    <div class="detail-img">IMAGEN TORTA</div>

    <div class="detail-top">
      <div>
        <h2>${p.name}</h2>
        <div class="small">${p.size} • ${p.availability}${p.needs24hNotice ? " • 24h" : ""}</div>
      </div>
      <div class="price">${price}</div>
    </div>

    <div class="pills-row" aria-label="Opciones">
      <span class="pill active">Tamaño: ${p.size}</span>
      <span class="pill">Sabor</span>
      <span class="pill">Notas +</span>
    </div>

    <div class="section-title" style="margin-top:14px;">Cantidad</div>
    <div class="qty-row">
      <button class="qty-btn" data-qty="-">-</button>
      <div class="qty-box" id="qtyBox">1</div>
      <button class="qty-btn" data-qty="+">+</button>
      <button class="btn primary" style="flex:1;" data-action="addToCart">Agregar al carrito</button>
    </div>

    <div class="section-title">Carrito (resumen)</div>
    <div class="card summary">
      <div class="row"><span class="small">Subtotal</span><strong>${subtotal}</strong></div>
      <div class="row"><span class="small">Domicilio</span><strong>${delivery}</strong></div>
      <div class="hr"></div>
      <div class="row"><span style="font-weight:900;">Total</span><span style="font-weight:1000;">${total}</span></div>
    </div>

    <div class="two-btn">
      <button class="btn" data-action="back">Seguir comprando</button>
      <button class="btn primary" data-action="buy">Comprar</button>
    </div>
  `;
}

export function bindDetailEvents(root, state) {
  const id = state.route.params?.id;
  const p = Store.getProduct(id);
  let qty = 1;

  const qtyBox = root.querySelector("#qtyBox");

  root.querySelectorAll("[data-qty]").forEach((b) => {
    b.addEventListener("click", () => {
      const op = b.getAttribute("data-qty");
      if (op === "+") qty += 1;
      if (op === "-") qty = Math.max(1, qty - 1);
      qtyBox.textContent = String(qty);
    });
  });

  root.querySelector('[data-action="addToCart"]')?.addEventListener("click", () => {
    if (!p?.isAvailable) {
      alert("Producto no disponible.");
      return;
    }
    CartController.add(id, qty);
    qty = 1;
    qtyBox.textContent = "1";
    toast(`${p.name} agregado al carrito`);
  });

  root.querySelector('[data-action="back"]')?.addEventListener("click", () => {
    Router.go("catalog");
  });

  root.querySelector('[data-action="buy"]')?.addEventListener("click", () => {
    Router.go("cart");
  });

  root.querySelector('[data-action="goCatalog"]')?.addEventListener("click", () => {
    Router.go("catalog");
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