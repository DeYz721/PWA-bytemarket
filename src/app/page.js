import Link from "next/link";

const categorias = [
  { nombre: "Procesadores", emoji: "🧠", href: "/catalogo?cat=procesadores" },
  { nombre: "Tarjetas Gráficas", emoji: "🎮", href: "/catalogo?cat=gpu" },
  { nombre: "Memorias RAM", emoji: "💾", href: "/catalogo?cat=ram" },
  { nombre: "Almacenamiento", emoji: "💿", href: "/catalogo?cat=almacenamiento" },
  { nombre: "Fuentes de Poder", emoji: "⚡", href: "/catalogo?cat=fuentes" },
  { nombre: "Gabinetes", emoji: "🖥️", href: "/catalogo?cat=gabinetes" },
];

const productosDestacados = [
  { id: 1, nombre: "RTX 4070 Super", precio: "$9,499", categoria: "GPU", img: "🎮" },
  { id: 2, nombre: "Ryzen 7 7800X3D", precio: "$6,299", categoria: "CPU", img: "🧠" },
  { id: 3, nombre: "Kingston Fury 32GB", precio: "$1,899", categoria: "RAM", img: "💾" },
  { id: 4, nombre: "Samsung 990 Pro 2TB", precio: "$3,199", categoria: "SSD", img: "💿" },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Arma tu PC ideal con <span className="text-emerald-300">ByteMarket</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100 mb-8">
            Componentes de calidad, precios competitivos y un asistente inteligente que verifica la compatibilidad de tus piezas en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="rounded-full bg-white text-emerald-800 px-8 py-3 font-semibold hover:bg-emerald-50 transition-colors"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/configurador"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Configurador de PC
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categorías ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categorias.map((cat) => (
            <Link
              key={cat.nombre}
              href={cat.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{cat.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Productos Destacados ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosDestacados.map((prod) => (
              <Link
                key={prod.id}
                href={`/producto?id=${prod.id}`}
                className="group rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg text-5xl mb-4 group-hover:bg-emerald-50 transition-colors">
                  {prod.img}
                </div>
                <span className="text-xs font-medium text-emerald-600 uppercase">{prod.categoria}</span>
                <h3 className="font-semibold text-gray-900 mt-1">{prod.nombre}</h3>
                <p className="text-lg font-bold text-emerald-700 mt-2">{prod.precio}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner Configurador ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">¿No sabes qué componentes elegir?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Usa nuestro configurador inteligente. Selecciona las piezas y nosotros verificamos que sean 100% compatibles.
          </p>
          <Link
            href="/configurador"
            className="inline-block rounded-full bg-white text-emerald-800 px-8 py-3 font-semibold hover:bg-emerald-50 transition-colors"
          >
            Ir al Configurador
          </Link>
        </div>
      </section>
    </div>
  );
}
