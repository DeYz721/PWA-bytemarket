
import { Suspense } from "react";
import Link from "next/link";
import { Cpu, ArrowRight, ShoppingCart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatoPrecio } from "@/lib/formato";
import { iconoCategoria } from "@/lib/iconosCategoria";

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

        <Suspense fallback={<CargandoTarjetas cantidad={7} alto="h-28" />}>
          <Categorias />
        </Suspense>
      </section>

      {/* Productos destacados */}
      <section className="bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
            Productos destacados
          </h2>

          <Suspense fallback={<CargandoTarjetas cantidad={4} alto="h-64" />}>
            <ProductosDestacados />
          </Suspense>

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

// Categorías activas desde Supabase
async function Categorias() {
  const supabase = await createClient();
  const { data: categorias } = await supabase
    .from("categorias")
    .select("nombre, identificador_url")
    .eq("activo", true)
    .order("nombre");

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {(categorias ?? []).map((cat) => {
        const Icono = iconoCategoria(cat.identificador_url);
        return (
          <Link
            key={cat.identificador_url}
            href={`/catalogo?cat=${cat.identificador_url}`}
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
  );
}

// Productos marcados como destacados en Supabase
async function ProductosDestacados() {
  const supabase = await createClient();
  const { data: productos, error } = await supabase
    .from("productos")
    .select("id, nombre, precio, categorias(identificador_url)")
    .eq("activo", true)
    .eq("destacado", true)
    .order("nombre")
    .limit(4);

  if (error) {
    return <p className="text-center text-red-400">No se pudieron cargar los productos destacados.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {productos.map((prod) => {
        const Icono = iconoCategoria(prod.categorias?.identificador_url);
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
                  {formatoPrecio.format(prod.precio)}
                </span>
                <ShoppingCart size={19} className="text-gray-400" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function CargandoTarjetas({ cantidad, alto }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className={`animate-pulse rounded-xl bg-zinc-900 ${alto}`} />
      ))}
    </div>
  );
}
