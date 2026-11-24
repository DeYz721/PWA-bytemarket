import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatoPrecio } from "@/lib/formato";
import { ImagenProducto } from "@/components/ImagenProducto";

export default function OfertasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 sm:p-12 text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">🔥 Ofertas de la Semana</h1>
        <p className="text-red-100 text-lg">Descuentos exclusivos en componentes seleccionados.</p>
      </div>

      <Suspense fallback={<CargandoOfertas />}>
        <ListaOfertas />
      </Suspense>
    </div>
  );
}

// Promociones vigentes desde Supabase (las reglas RLS ya filtran las activas)
async function ListaOfertas() {
  const supabase = await createClient();
  const { data: ofertas, error } = await supabase
    .from("promociones")
    .select("id, precio_oferta, productos(id, nombre, precio, precio_anterior, emoji, url_imagen)")
    .eq("activo", true);

  if (error) {
    return <p className="rounded-lg bg-red-50 text-red-700 p-4">No se pudieron cargar las ofertas.</p>;
  }

  if (ofertas.length === 0) {
    return <p className="text-center py-16 text-gray-400">Por ahora no hay ofertas activas.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {ofertas.map(({ id, precio_oferta, productos: prod }) => {
        const antes = prod.precio_anterior ?? prod.precio;
        const descuento = Math.round((1 - precio_oferta / antes) * 100);
        return (
          <Link
            key={id}
            href={`/producto?id=${prod.id}`}
            className="group relative rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-emerald-400 transition-all"
          >
            {/* Badge descuento */}
            {descuento > 0 && (
              <span className="absolute top-3 right-3 z-10 rounded-full bg-red-500 text-white text-xs font-bold px-2 py-0.5">
                -{descuento}%
              </span>
            )}

            <div className="flex items-center justify-center h-28 bg-gray-50 rounded-lg text-5xl mb-4 group-hover:bg-emerald-50 transition-colors">
              <ImagenProducto producto={prod} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw">{prod.emoji}</ImagenProducto>
            </div>
            <h3 className="font-semibold text-gray-900">{prod.nombre}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-emerald-700">{formatoPrecio.format(precio_oferta)}</span>
              {antes > precio_oferta && (
                <span className="text-sm text-gray-400 line-through">{formatoPrecio.format(antes)}</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function CargandoOfertas() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="animate-pulse h-52 rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

