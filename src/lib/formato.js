// Formato de precios en pesos mexicanos: 9499 -> "$9,499.00"
export const formatoPrecio = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
