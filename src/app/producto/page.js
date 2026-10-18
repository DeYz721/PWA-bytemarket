import Link from "next/link";

export default function ProductoPage() {
  // Producto de ejemplo (en producción vendría de una API o BD)
  const producto = {
    nombre: "NVIDIA GeForce RTX 4070 Super",
    precio: "$9,499",
    categoria: "Tarjeta Gráfica",
    descripcion:
      "La RTX 4070 Super cuenta con 7168 núcleos CUDA, 12 GB de GDDR6X y soporte para DLSS 3.5 y ray tracing de tercera generación. Ideal para gaming en 1440p y tareas de creación de contenido.",
    specs: [
      { label: "CUDA Cores", value: "7168" },
      { label: "VRAM", value: "12 GB GDDR6X" },
      { label: "TDP", value: "220W" },
      { label: "Interfaz", value: "PCIe 4.0 x16" },
      { label: "Salidas", value: "3× DP 1.4a, 1× HDMI 2.1" },
    ],
    stock: true,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Inicio</Link>
        {" / "}
        <Link href="/catalogo" className="hover:text-emerald-600">Catálogo</Link>
        {" / "}
        <span className="text-gray-900">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="flex items-center justify-center h-80 bg-gray-100 rounded-2xl text-8xl">
          🎮
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-medium text-emerald-600 uppercase">{producto.categoria}</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{producto.nombre}</h1>
          <p className="text-gray-500 mb-6">{producto.descripcion}</p>

          <p className="text-3xl font-extrabold text-emerald-700 mb-4">{producto.precio}</p>

          {producto.stock ? (
            <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 mb-6">
              ✓ En stock
            </span>
          ) : (
            <span className="inline-block rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 mb-6">
              Sin stock
            </span>
          )}

          <div className="flex gap-3 mb-8">
            <button className="flex-1 rounded-lg bg-emerald-700 text-white py-3 font-semibold hover:bg-emerald-800 transition-colors">
              Agregar al carrito
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-3 hover:border-emerald-400 transition-colors">
              ❤️
            </button>
          </div>

          {/* Especificaciones */}
          <h2 className="text-lg font-semibold mb-3">Especificaciones</h2>
          <dl className="divide-y divide-gray-100">
            {producto.specs.map((s) => (
              <div key={s.label} className="flex justify-between py-2 text-sm">
                <dt className="text-gray-500">{s.label}</dt>
                <dd className="font-medium text-gray-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
