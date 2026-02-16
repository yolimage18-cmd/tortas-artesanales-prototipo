import { Store } from "../models/store.js";

export const CatalogController = (() => {
  function setSizeFilter(size) {
    Store.setState((s) => {
      s.catalog.sizeFilter = size;
      return s;
    });
  }

  return { setSizeFilter };
})();