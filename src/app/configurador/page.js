import { Suspense } from "react";
import Link from "next/link";
import { Cpu, ArrowRight, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ConfiguradorInteractivo } from "@/components/ConfiguradorInteractivo";

export default function ConfiguradorPage() {
  return (
    <div className="bg-black text-white">
      <section
        className="relative bg-cover bg-center px-6 py-16 text-center sm:py-20"
        style={{ backgroundImage: "url('/banner_pag1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/75 to-emerald-950/50" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-widest text-emerald-300">CONFIGURADOR BYTEMARKET</p>
          <h1 className="mx-auto mt-4 text-4xl font-bold sm:text-5xl">Construye la PC que siempre imaginaste</h1>
          <p className="mx-auto mt-5 max-w-2xl text-gray-200">
            Elige componentes disponibles de nuestro catálogo y revisa el costo y la compatibilidad de tu equipo.
          </p>
          <Link href="/catalogo" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 hover:bg-gray-100">
            Explorar catálogo <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-900/60 p-3 text-emerald-300"><Wrench size={25} /></div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Arma tu equipo</h2>
            <p className="mt-1 text-sm text-zinc-400">Selecciona una pieza por categoría. Puedes cambiar tus elecciones cuando quieras.</p>
          </div>
        </div>

        <Suspense fallback={<CargandoConfigurador />}>
          <Componentes />
        </Suspense>
      </section>

      <section className="border-t border-zinc-900 bg-zinc-950 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Cpu size={34} className="text-emerald-400" />
          <div className="flex-1">
            <h2 className="text-xl font-bold">¿Buscas una pieza específica?</h2>
            <p className="mt-1 text-zinc-400">Revisa el catálogo completo de componentes ByteMarket.</p>
          </div>
          <Link href="/catalogo" className="rounded-lg border border-emerald-700 px-5 py-3 font-semibold text-emerald-300 transition hover:bg-emerald-900/40">
            Ver catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}

// Componentes disponibles desde Supabase; va dentro de <Suspense> porque lee cookies de sesión
async function Componentes() {
  const supabase = await createClient();
  const { data: productos, error } = await supabase
    .from("productos")
    .select("id, nombre, descripcion, precio, existencias, emoji, especificaciones, compatibilidad, categorias(nombre, identificador_url)")
    .eq("activo", true)
    .gt("existencias", 0)
    .order("nombre");

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/50 p-6 text-red-200">
        No se pudieron cargar los componentes de Supabase. Intenta recargar la página.
      </div>
    );
  }

  return <ConfiguradorInteractivo productos={productos ?? []} />;
}

function CargandoConfigurador() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl bg-zinc-900" />
      ))}
    </div>
  );
}
