import Image from "next/image";
import { imagenProducto } from "@/lib/imagenesProducto";

// Foto del producto; si no tiene, muestra el contenido alternativo (ícono o emoji).
// El contenedor debe tener alto y ancho definidos.
export function ImagenProducto({ producto, sizes, className = "p-3", children }) {
  const src = imagenProducto(producto);
  if (!src) return children;

  return (
    <span className="relative block h-full w-full overflow-hidden rounded-[inherit] bg-white">
      <Image
        src={src}
        alt={producto.nombre}
        fill
        sizes={sizes}
        // Las URL externas del panel se muestran sin pasar por el optimizador
        unoptimized={!src.startsWith("/")}
        className={`object-contain ${className}`}
      />
    </span>
  );
}
