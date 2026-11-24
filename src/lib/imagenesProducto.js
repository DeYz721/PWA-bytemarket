// Fotos guardadas en /public para cada producto, según su nombre en Supabase
const imagenes = {
  "EVGA 750W 80+ Gold": "/fuentePoder/EVGA 750W 80 Plus.png",
  "NZXT H7 Flow": "/gabinete/NZXT H7 Flow.png",
  "Ryzen 5 7600X": "/procesador/AMD Ryzen 5 7600X.jpg",
  "Ryzen 7 7800X3D": "/procesador/AMD Ryzen 7 7800X3D.jpg",
  "Corsair 32GB DDR5": "/ram/Corsair Vengeance 32GB DDR5.jpg",
  "Kingston Fury 32GB DDR5": "/ram/Kingston Fury 32GB DDR5.jpg",
  "Samsung 990 Pro 2TB": "/ram/Samsung 990 Pro 2TB.png",
  "WD Black SN850X 1TB": "/ram/WD Black SN850X 1TB.jpg",
  "NVIDIA GeForce RTX 4070 Super": "/tarjetaGrafica/NVIDIA GeForce RTX 4070 Super.png",
  "RTX 4060 Ti": "/tarjetaGrafica/RTX 4060 Ti.png",
};

// La URL guardada desde el panel de administración tiene prioridad
export function imagenProducto(producto) {
  if (producto.url_imagen) return producto.url_imagen;
  const ruta = imagenes[producto.nombre];
  return ruta ? encodeURI(ruta) : null;
}
