import Link from "next/link";

const ofertas = [
  { id: 1, nombre: "RTX 4060 Ti", antes: "$8,499", ahora: "$7,299", descuento: "-14%", img: "🎮" },
  { id: 2, nombre: "Ryzen 5 7600X", antes: "$4,199", ahora: "$3,499", descuento: "-17%", img: "🧠" },
  { id: 3, nombre: "Corsair 32GB DDR5", antes: "$2,299", ahora: "$1,799", descuento: "-22%", img: "💾" },
  { id: 4, nombre: "WD Black SN850X 1TB", antes: "$2,499", ahora: "$1,999", descuento: "-20%", img: "💿" },
];

export default function OfertasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 sm:p-12 text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">🔥 Ofertas de la Semana</h1>
        <p className="text-red-100 text-lg">Descuentos exclusivos en componentes seleccionados.</p>
      </div>

      {/* Grid de ofertas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ofertas.map((prod) => (
          <Link
            key={prod.id}
            href={`/producto?id=${prod.id}`}
            className="group relative rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-emerald-400 transition-all"
          >
            {/* Badge descuento */}
            <span className="absolute top-3 right-3 rounded-full bg-red-500 text-white text-xs font-bold px-2 py-0.5">
              {prod.descuento}
            </span>

            <div className="flex items-center justify-center h-28 bg-gray-50 rounded-lg text-5xl mb-4 group-hover:bg-emerald-50 transition-colors">
              {prod.img}
            </div>
            <h3 className="font-semibold text-gray-900">{prod.nombre}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-emerald-700">{prod.ahora}</span>
              <span className="text-sm text-gray-400 line-through">{prod.antes}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
