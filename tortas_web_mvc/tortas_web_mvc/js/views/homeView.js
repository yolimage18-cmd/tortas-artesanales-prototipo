import { Router } from "../controllers/router.js";

export function HomeView(state) {
  return `
    <section class="hero" aria-label="Encabezado">
      <p class="title">Tortas Artesanales</p>
      <p class="sub">Hechas a mano • Entrega a domicilio</p>
    </section>

    <div class="search" role="search">
      🔎 <span>Buscar tortas, sabores, tamaños...</span>
    </div>

    <div class="section-title">Promo del día</div>
    <div class="promo">
      <div>
        <div style="font-weight:900;font-size:12.5px;">Promo del día</div>
        <div class="small">Cupón: LAVANDA10 • -10% en tortas medianas</div>
      </div>
      <button class="btn primary" data-action="goCatalog">Ver</button>
    </div>

    <div class="section-title">Categorías</div>
    <div class="chips" aria-label="Categorías">
      <span class="chip">Chocolate</span>
      <span class="chip">Vainilla</span>
      <span class="chip">Red Velvet</span>
    </div>

    <div class="section-title">Destacadas</div>
    <div class="card" style="padding:12px;">
      <div class="product card" style="box-shadow:none;">
        <div class="imgph">IMG</div>
        <div>
          <p class="p-name">Torta de Chocolate</p>
          <p class="p-sub">8 porciones • 2h preparación</p>
        </div>
        <button class="btn primary" style="padding:10px 14px;" data-action="goCatalog">+ Carrito</button>
      </div>

      <div style="height:10px;"></div>

      <div class="product card" style="box-shadow:none;">
        <div class="imgph">IMG</div>
        <div>
          <p class="p-name">Red Velvet Clásica</p>
          <p class="p-sub">10 porciones • Disponible</p>
        </div>
        <button class="btn primary" style="padding:10px 14px;" data-action="goCatalog">+ Carrito</button>
      </div>
    </div>
  `;
}

export function bindHomeEvents(root) {
  root.querySelectorAll('[data-action="goCatalog"]').forEach((btn) => {
    btn.addEventListener("click", () => Router.go("catalog"));
  });
}