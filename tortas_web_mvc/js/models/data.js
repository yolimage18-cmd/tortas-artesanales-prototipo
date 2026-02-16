export const products = [
  {
    id: "p1",
    name: "Torta Chocolate",
    size: "Mini",
    availability: "Disponible",
    price: 45000,
    isAvailable: true,
    needs24hNotice: false,
    description: "Torta clásica de chocolate. Ideal para compartir."
  },
  {
    id: "p2",
    name: "Torta Vainilla",
    size: "Mediana",
    availability: "24h aviso",
    price: 49000,
    isAvailable: true,
    needs24hNotice: true,
    description: "Vainilla suave con relleno artesanal. Requiere pedido con 24 horas."
  },
  {
    id: "p3",
    name: "Torta Maracuyá",
    size: "Mediana",
    availability: "Disponible",
    price: 70000,
    isAvailable: true,
    needs24hNotice: false,
    description: "Sabor fresco a maracuyá. Perfecta para ocasiones especiales."
  },
  {
    id: "p4",
    name: "Torta Red Velvet",
    size: "Grande",
    availability: "Disponible",
    price: 46000,
    isAvailable: true,
    needs24hNotice: false,
    description: "Red Velvet clásica con crema suave. Una de las favoritas."
  },
  {
    id: "p5",
    name: "Torta Zanahoria",
    size: "Mediana",
    availability: "Agotada",
    price: 46000,
    isAvailable: false,
    needs24hNotice: false,
    description: "Torta de zanahoria con especias. Actualmente agotada."
  }
];

export const initialState = {
  route: { name: "home", params: {} },
  catalog: { sizeFilter: "Todos" },
  cart: {
    items: [] // { productId, qty }
  }
};