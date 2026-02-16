import { Store } from "../models/store.js";

export const Router = (() => {
  function go(name, params = {}) {
    Store.setState((s) => {
      s.route = { name, params };
      return s;
    });
  }

  return { go };
})();