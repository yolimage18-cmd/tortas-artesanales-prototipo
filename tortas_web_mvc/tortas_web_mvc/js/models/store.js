import { initialState, products } from "./data.js";

export const Store = (() => {
  let state = structuredClone(initialState);
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(patchFn) {
    const next = patchFn(structuredClone(state));
    state = next;
    listeners.forEach((fn) => fn(state));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function moneyCOP(value) {
    const s = String(value);
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const posFromEnd = s.length - i;
      out += s[i];
      if (posFromEnd > 1 && posFromEnd % 3 === 1) out += ".";
    }
    return `$ ${out}`;
  }

  function getProduct(id) {
    return products.find((p) => p.id === id);
  }

  function cartItemsDetailed() {
    return state.cart.items
      .map((it) => {
        const p = getProduct(it.productId);
        return p ? { product: p, qty: it.qty, subtotal: p.price * it.qty } : null;
      })
      .filter(Boolean);
  }

  function cartSubtotal() {
    return cartItemsDetailed().reduce((sum, it) => sum + it.subtotal, 0);
  }

  function deliveryFee() {
    return state.cart.items.length ? 6000 : 0;
  }

  function cartTotal() {
    return cartSubtotal() + deliveryFee();
  }

  return {
    getState,
    setState,
    subscribe,
    moneyCOP,
    getProduct,
    cartItemsDetailed,
    cartSubtotal,
    deliveryFee,
    cartTotal
  };
})();