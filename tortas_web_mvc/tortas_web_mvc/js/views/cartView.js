import { Store } from "../models/store.js";
import { CartController } from "../controllers/cartController.js";
import { Router } from "../controllers/router.js";

export function CartView(state) {
  const items = Store.cartItemsDetailed();
  const subtotal = Store.moneyCOP(Store.cartSubtotal());
  const delivery = Store.moneyCOP(Store.deliveryFee());
  const total = Store.moneyCOP(Store.cartTotal());

  if (!items.length) {
    return `
      <div class="card" style="padding:14px;text-align:center;margin-top:40px;">
        <p style="margin:0;color:var(--muted);font-weight:800;">Tu carrito está vacío.</p>
        <p class="small" style="margin:8px 0 0;">Agrega una torta desde el catálogo.</p>
        <div style="margin-top:14px;">
          <button class="btn primary" data-action="goCatalog">Ir al Catálogo</button>
        </div>
      </div>
    `;
  }

  const list = items.map((it) => `
    <div class="card" style="padding:14px;">
      <div class="row">
        <strong>${it.product.name} x${it.qty}</strong>
        <span class="price-pill">${Store.moneyCOP(it.subtotal)}</span>
      </div>
      <div class="row" style="gap:10px;justify-content:flex-end;">
        <button class="btn" data-dec="${it.product.id}" style="padding:10px 14px;">-</button>
        <button class="btn" data-inc="${it.product.id}" style="padding:10px 14px;">+</button>
      </div>
    </div>
  `).join("");

  return `
    <div class="list">
      ${list}
    </div>

    <div class="card summary">
      <div class="row"><span class="small">Subtotal</span><strong>${subtotal}</strong></div>
      <div class="row"><span class="small">Domicilio</span><strong>${delivery}</strong></div>
      <div class="hr"></div>
      <div class="row"><span style="font-weight:900;">Total</span><span style="font-weight:1000;">${total}</span></div>
    </div>

    <button class="btn primary" style="width:100%;margin-top:12px;" data-action="confirm">
      Confirmar pedido
    </button>
  `;
}

export function bindCartEvents(root) {
  root.querySelectorAll("[data-inc]").forEach((b) => {
    b.addEventListener("click", () => CartController.inc(b.getAttribute("data-inc")));
  });
  root.querySelectorAll("[data-dec]").forEach((b) => {
    b.addEventListener("click", () => CartController.dec(b.getAttribute("data-dec")));
  });

  root.querySelector('[data-action="confirm"]')?.addEventListener("click", () => {
    alert("Simulación: pedido confirmado (estado: Recibido).");
    CartController.clear();
    Router.go("home");
  });

  root.querySelector('[data-action="goCatalog"]')?.addEventListener("click", () => {
    Router.go("catalog");
  });
}