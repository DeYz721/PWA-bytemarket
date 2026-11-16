
import Link from "next/link";
import {
  Cpu, Monitor, MemoryStick, HardDrive,
  Zap, PcCase, ArrowRight, ShoppingCart
} from "lucide-react";

const categorias = [
  { nombre: "Procesadores", icono: Cpu, href: "procesadores" },
  { nombre: "Tarjetas Gráficas", icono: Monitor, href: "gpu" },
  { nombre: "Memorias RAM", icono: MemoryStick, href: "ram" },
  { nombre: "Almacenamiento", icono: HardDrive, href: "almacenamiento" },
  { nombre: "Fuentes de Poder", icono: Zap, href: "fuentes" },
  { nombre: "Gabinetes", icono: PcCase, href: "gabinetes" },
];

const productos = [
  { id: 1, nombre: "RTX 4070 Super", precio: "$9,499", icono: Monitor },
  { id: 2, nombre: "Ryzen 7 7800X3D", precio: "$6,299", icono: Cpu },
  { id: 3, nombre: "Kingston Fury 32GB", precio: "$1,899", icono: MemoryStick },
  { id: 4, nombre: "Samsung 990 Pro 2TB", precio: "$3,199", icono: HardDrive },
];

export default function HomePage() {
  return (
    <div className="bg-black text-white">

      {/* bannerr */}
      <section
        className="relative bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: "url('/banner_pag1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-emerald-950/20" />

        <div className="relative z-10">
          <p className="text-sm font-medium tracking-widest text-emerald-300">
            BIENVENIDO A BYTEMARKET
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Construye la PC que siempre imaginaste
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-gray-200">
            Encuentra componentes de calidad y arma tu equipo
            con ayuda de nuestro configurador inteligente.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/catalogo"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 hover:bg-gray-100">
              Ver catálogo
            </Link>

            <Link
              href="/configurador"
              className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white/10">
              Armar mi PC
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
          Explora por categoría
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categorias.map((cat) => {
            const Icono = cat.icono;
            return (
              <Link
                key={cat.nombre}
                href={`/catalogo?cat=${cat.href}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
              >
                <Icono
                  size={32}
                  strokeWidth={1.5}
                  className="mx-auto mb-4 text-emerald-400"
                />
                <p className="text-sm font-semibold">
                  {cat.nombre}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
            Productos destacados
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productos.map((prod) => {
              const Icono = prod.icono;
              return (
                <Link
                  key={prod.id}
                  href={`/producto?id=${prod.id}`}
                  className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-emerald-500 hover:shadow-lg"
                >
                  <div className="flex h-40 items-center justify-center bg-zinc-800">
                    <Icono
                      size={65}
                      strokeWidth={1}
                      className="text-emerald-400 transition group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold">{prod.nombre}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-emerald-400">
                        {prod.precio}
                      </span>
                      <ShoppingCart size={19} className="text-gray-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Ver todos los productos <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Configurador */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-700 px-8 py-12 text-center">
          <Cpu
            size={36}
            strokeWidth={1.5}
            className="mx-auto mb-4 text-emerald-300"
          />

          <h2 className="text-2xl font-bold sm:text-3xl">
            ¿No sabes qué componentes elegir?
          </h2>

          <p className="mx-auto my-4 max-w-xl text-emerald-100">
            Utiliza nuestro configurador para elegir las piezas
            y verificar su compatibilidad.
          </p>

          <Link
            href="/configurador"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 hover:bg-gray-100"
          >
            Ir al configurador <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
