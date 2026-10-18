import Link from "next/link";

const productos = [
  { id: 1, nombre: "RTX 4070 Super", precio: "$9,499", categoria: "GPU", img: "🎮" },
  { id: 2, nombre: "Ryzen 7 7800X3D", precio: "$6,299", categoria: "CPU", img: "🧠" },
  { id: 3, nombre: "Kingston Fury 32GB DDR5", precio: "$1,899", categoria: "RAM", img: "💾" },
  { id: 4, nombre: "Samsung 990 Pro 2TB", precio: "$3,199", categoria: "SSD", img: "💿" },
  { id: 5, nombre: "EVGA 750W 80+ Gold", precio: "$1,599", categoria: "PSU", img: "⚡" },
  { id: 6, nombre: "NZXT H7 Flow", precio: "$2,199", categoria: "Gabinete", img: "🖥️" },
  { id: 7, nombre: "Ryzen 5 7600X", precio: "$3,499", categoria: "CPU", img: "🧠" },
  { id: 8, nombre: "RTX 4060 Ti", precio: "$7,299", categoria: "GPU", img: "🎮" },
];

const categorias = ["Todos", "CPU", "GPU", "RAM", "SSD", "PSU", "Gabinete"];

export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold mb-2">Catálogo</h1>
      <p className="text-gray-500 mb-8">Explora todos nuestros componentes de hardware.</p>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors first:bg-emerald-700 first:text-white first:border-emerald-700"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <Link
            key={prod.id}
            href={`/producto?id=${prod.id}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-emerald-400 transition-all"
          >
            <div className="flex items-center justify-center h-28 bg-gray-50 rounded-lg text-5xl mb-4 group-hover:bg-emerald-50 transition-colors">
              {prod.img}
            </div>
            <span className="text-xs font-medium text-emerald-600 uppercase">{prod.categoria}</span>
            <h3 className="font-semibold text-gray-900 mt-1">{prod.nombre}</h3>
            <div className="flex items-center justify-between mt-3">
              <p className="text-lg font-bold text-emerald-700">{prod.precio}</p>
              <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver detalle →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
