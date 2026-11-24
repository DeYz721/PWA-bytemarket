import { Suspense } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { minutosLectura } from "@/components/TextoConFormato";

export default function GuiasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Guías y Tutoriales</h1>
      <p className="text-gray-500 mb-8">
        Aprende todo lo que necesitas saber antes de comprar o armar tu PC.
      </p>

      <Suspense fallback={<CargandoGuias />}>
        <ListaGuias />
      </Suspense>
    </div>
  );
}

// Guías publicadas desde Supabase
async function ListaGuias() {
  const supabase = await createClient();
  const { data: guias, error } = await supabase
    .from("guias")
    .select("id, titulo, descripcion, nivel, emoji, contenido")
    .eq("publicada", true)
    .order("titulo");

  if (error) {
    return <p className="rounded-lg bg-red-50 text-red-700 p-4">No se pudieron cargar las guías.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {guias.map((guia) => (
        <Link
          key={guia.id}
          href={`/guias/${guia.id}`}
          className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-emerald-400 transition-all"
        >
          <span className="text-4xl mt-1">{guia.emoji}</span>
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5">
                {guia.nivel}
              </span>
              {guia.contenido && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={13} /> {minutosLectura(guia.contenido)} min
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700">{guia.titulo}</h2>
            <p className="text-sm text-gray-500 mt-1">{guia.descripcion}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">Leer guía →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CargandoGuias() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="animate-pulse h-28 rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

