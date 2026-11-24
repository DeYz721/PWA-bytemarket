import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatoPrecio } from "@/lib/formato";
import { ImagenProducto } from "@/components/ImagenProducto";
import { iconoCategoria } from "@/lib/iconosCategoria";
import { AddToCartButton } from "@/components/carrito/AddToCartButton";

export default function ProductoPage({ searchParams }) {
  return (
    <div className="bg-black text-white">
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
    .select("id, nombre, descripcion, precio, precio_anterior, existencias, emoji, url_imagen, especificaciones, categorias(nombre, identificador_url)")
    .eq("id", id)
    .eq("activo", true)
    .maybeSingle();

  if (!producto) return <NoEncontrado />;

  const especificaciones = Object.entries(producto.especificaciones ?? {});
  const IconoCategoria = iconoCategoria(producto.categorias?.identificador_url);

  return (
    <>
      <section
        className="relative bg-cover bg-center px-6 py-12 sm:py-16"
        style={{ backgroundImage: "url('/banner_pag1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/75 to-emerald-950/50" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-6 text-sm text-emerald-100/80">
            <Link href="/" className="hover:text-white">Inicio</Link>
            {" / "}
            <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
            {producto.categorias && (
              <>
                {" / "}
                <Link href={`/catalogo?cat=${producto.categorias.identificador_url}`} className="hover:text-white">
                  {producto.categorias.nombre}
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-emerald-200">
              <IconoCategoria size={31} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium tracking-widest text-emerald-200">{producto.categorias?.nombre ?? "COMPONENTE"}</p>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{producto.nombre}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 lg:h-[28rem]">
          <ImagenProducto producto={producto} sizes="(min-width: 1024px) 50vw, 100vw" className="p-6">
            <IconoCategoria size={104} strokeWidth={1} className="text-emerald-400" />
          </ImagenProducto>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">{producto.categorias?.nombre}</span>
          <h2 className="mt-2 text-2xl font-bold">Detalles del producto</h2>
          <p className="mb-6 mt-3 leading-relaxed text-zinc-400">{producto.descripcion}</p>

          <div className="mb-4 flex items-baseline gap-3">
            <p className="text-3xl font-extrabold text-emerald-400">{formatoPrecio.format(producto.precio)}</p>
            {producto.precio_anterior && (
              <p className="text-lg text-zinc-500 line-through">{formatoPrecio.format(producto.precio_anterior)}</p>
            )}
          </div>

          {producto.existencias > 0 ? (
            <span className="mb-6 inline-block rounded-full border border-emerald-800 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300">
              ✓ En stock ({producto.existencias} disponibles)
            </span>
          ) : (
            <span className="mb-6 inline-block rounded-full border border-red-900 bg-red-950/60 px-3 py-1 text-xs font-semibold text-red-300">
              Sin stock
            </span>
          )}

          <AddToCartButton producto={producto} />

          {especificaciones.length > 0 && (
            <>
              <h3 className="mb-3 text-lg font-semibold">Especificaciones</h3>
              <dl className="divide-y divide-zinc-800">
                {especificaciones.map(([etiqueta, valor]) => (
                  <div key={etiqueta} className="flex justify-between gap-5 py-3 text-sm">
                    <dt className="text-zinc-400">{etiqueta}</dt>
                    <dd className="text-right font-medium text-zinc-100">{String(valor)}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function NoEncontrado() {
  return (
    <div className="bg-black px-6 py-16 text-center text-white">
      <p className="mb-4 text-5xl">🔍</p>
      <h1 className="mb-2 text-2xl font-bold">Producto no encontrado</h1>
      <Link href="/catalogo" className="text-emerald-400 hover:underline">Volver al catálogo</Link>
    </div>
  );
}

function CargandoProducto() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse grid-cols-1 gap-8 bg-black px-6 py-12 lg:grid-cols-2">
      <div className="h-80 rounded-2xl bg-zinc-900" />
      <div className="space-y-4">
        <div className="h-3 w-24 rounded bg-zinc-900" />
        <div className="h-8 w-3/4 rounded bg-zinc-900" />
        <div className="h-16 w-full rounded bg-zinc-900" />
        <div className="h-9 w-40 rounded bg-zinc-900" />
        <div className="h-12 w-full rounded bg-zinc-900" />
      </div>
    </div>
  );
}
