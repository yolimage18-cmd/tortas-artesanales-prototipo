import { Store } from "../models/store.js";

export const CartController = (() => {
  function add(productId, qty = 1) {
    Store.setState((s) => {
      const found = s.cart.items.find((x) => x.productId === productId);
      if (found) found.qty += qty;
      else s.cart.items.push({ productId, qty });
      return s;
    });
  }

  function inc(productId) {
    add(productId, 1);
  }

  function dec(productId) {
    Store.setState((s) => {
      const found = s.cart.items.find((x) => x.productId === productId);
      if (!found) return s;
      found.qty -= 1;
      if (found.qty <= 0) {
        s.cart.items = s.cart.items.filter((x) => x.productId !== productId);
      }
      return s;
    });
  }

  function clear() {
    Store.setState((s) => {
      s.cart.items = [];
      return s;
    });
  }

  return { add, inc, dec, clear };
})();