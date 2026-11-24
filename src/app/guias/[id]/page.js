import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Cpu, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { TextoConFormato, minutosLectura } from "@/components/TextoConFormato";

export default function GuiaPage({ params }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Suspense fallback={<CargandoGuia />}>
        <Guia params={params} />
      </Suspense>
    </div>
  );
}

// Lee la guía y otras guías publicadas desde Supabase
async function Guia({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: guia }, { data: otras }] = await Promise.all([
    supabase.from("guias").select("titulo, descripcion, nivel, emoji, contenido").eq("id", id).eq("publicada", true).maybeSingle(),
    supabase.from("guias").select("id, titulo, emoji").eq("publicada", true).neq("id", id).order("titulo").limit(3),
  ]);

  if (!guia) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-5xl">📚</p>
        <h1 className="mb-2 text-2xl font-bold">Guía no encontrada</h1>
        <Link href="/guias" className="text-emerald-600 hover:underline">Ver todas las guías</Link>
      </div>
    );
  }

  return (
    <article>
      <Link href="/guias" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-700">
        <ArrowLeft size={16} /> Todas las guías
      </Link>

      {/* Encabezado */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <span className="text-5xl">{guia.emoji}</span>
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">{guia.titulo}</h1>
        <p className="mt-2 text-lg text-gray-500">{guia.descripcion}</p>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700">{guia.nivel}</span>
          {guia.contenido && (
            <span className="inline-flex items-center gap-1 text-gray-500">
              <Clock size={15} /> {minutosLectura(guia.contenido)} min de lectura
            </span>
          )}
        </div>
      </header>

      {/* Contenido del tutorial */}
      {guia.contenido ? (
        <TextoConFormato texto={guia.contenido} />
      ) : (
        <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">Esta guía todavía no tiene contenido.</p>
      )}

      {/* Siguiente paso */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/configurador" className="flex items-center gap-3 rounded-xl bg-emerald-700 p-5 font-semibold text-white hover:bg-emerald-800">
          <Cpu size={24} /> Arma tu PC en el configurador
        </Link>
        <Link href="/catalogo" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 font-semibold hover:border-emerald-400">
          <ShoppingBag size={24} className="text-emerald-700" /> Ver componentes en el catálogo
        </Link>
      </div>

      {/* Otras guías */}
      {otras?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-bold">Otras guías</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {otras.map((g) => (
              <Link key={g.id} href={`/guias/${g.id}`} className="rounded-xl border border-gray-200 bg-white p-4 text-sm font-medium hover:border-emerald-400">
                <span className="mr-1 text-xl">{g.emoji}</span> {g.titulo}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function CargandoGuia() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 w-12 rounded bg-gray-100" />
      <div className="h-9 w-3/4 rounded bg-gray-100" />
      <div className="h-5 w-full rounded bg-gray-100" />
      <div className="h-64 w-full rounded bg-gray-100" />
    </div>
  );
}
