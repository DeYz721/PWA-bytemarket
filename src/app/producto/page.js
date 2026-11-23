import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatoPrecio } from "@/lib/formato";

export default function ProductoPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Suspense fallback={<CargandoProducto />}>
        <DetalleProducto searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Lee el producto de Supabase según el ?id= de la URL
async function DetalleProducto({ searchParams }) {
  const { id } = await searchParams;
  if (!id) return <NoEncontrado />;

  const supabase = await createClient();
  const { data: producto } = await supabase
    .from("productos")
    .select("nombre, descripcion, precio, precio_anterior, existencias, emoji, especificaciones, categorias(nombre, identificador_url)")
    .eq("id", id)
    .eq("activo", true)
    .maybeSingle();

  if (!producto) return <NoEncontrado />;

  const especificaciones = Object.entries(producto.especificaciones ?? {});

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Inicio</Link>
        {" / "}
        <Link href="/catalogo" className="hover:text-emerald-600">Catálogo</Link>
        {producto.categorias && (
          <>
            {" / "}
            <Link href={`/catalogo?cat=${producto.categorias.identificador_url}`} className="hover:text-emerald-600">
              {producto.categorias.nombre}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-gray-900">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="flex items-center justify-center h-80 bg-gray-100 rounded-2xl text-8xl">
          {producto.emoji}
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-medium text-emerald-600 uppercase">{producto.categorias?.nombre}</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{producto.nombre}</h1>
          <p className="text-gray-500 mb-6">{producto.descripcion}</p>

          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-3xl font-extrabold text-emerald-700">{formatoPrecio.format(producto.precio)}</p>
            {producto.precio_anterior && (
              <p className="text-lg text-gray-400 line-through">{formatoPrecio.format(producto.precio_anterior)}</p>
            )}
          </div>

          {producto.existencias > 0 ? (
            <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 mb-6">
              ✓ En stock ({producto.existencias} disponibles)
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
          {especificaciones.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">Especificaciones</h2>
              <dl className="divide-y divide-gray-100">
                {especificaciones.map(([etiqueta, valor]) => (
                  <div key={etiqueta} className="flex justify-between py-2 text-sm">
                    <dt className="text-gray-500">{etiqueta}</dt>
                    <dd className="font-medium text-gray-900">{String(valor)}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function NoEncontrado() {
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
      <Link href="/catalogo" className="text-emerald-600 hover:underline">Volver al catálogo</Link>
    </div>
  );
}

function CargandoProducto() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      <div className="h-80 bg-gray-100 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-3 w-24 bg-gray-100 rounded" />
        <div className="h-8 w-3/4 bg-gray-100 rounded" />
        <div className="h-16 w-full bg-gray-100 rounded" />
        <div className="h-9 w-40 bg-gray-100 rounded" />
        <div className="h-12 w-full bg-gray-100 rounded" />
      </div>
    </div>
  );
}
