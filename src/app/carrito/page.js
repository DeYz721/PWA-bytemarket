"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/carrito/CartProvider";
import { iconoCategoria } from "@/lib/iconosCategoria";
import { formatoPrecio } from "@/lib/formato";

export default function CarritoPage() {
  const { items, cargando, error, subtotal, cantidadTotal, cambiarCantidad, quitar } = useCart();
  const envio = items.length ? 149 : 0;

  return (
    <div className="min-h-[60vh] bg-black text-white">
      <section className="relative bg-cover bg-center px-6 py-12 sm:py-16" style={{ backgroundImage: "url('/banner_pag1.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/75 to-emerald-950/50" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-medium tracking-widest text-emerald-200">BYTEMARKET</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Carrito de compras</h1>
          <p className="mt-2 text-emerald-50/80">Revisa tus componentes y actualiza las cantidades antes de continuar.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:py-14 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {error && <p role="status" className="rounded-xl border border-amber-900 bg-amber-950/40 p-4 text-sm text-amber-200">{error}</p>}

          {cargando ? (
            <div className="animate-pulse space-y-4">
              {[1, 2].map((item) => <div key={item} className="h-28 rounded-xl bg-zinc-900" />)}
            </div>
          ) : items.length ? items.map(({ producto, cantidad }) => {
            const IconoCategoria = iconoCategoria(producto.categorias?.identificador_url);
            return (
              <article key={producto.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-nowrap sm:p-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-emerald-400">
                  <IconoCategoria size={34} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">{producto.categorias?.nombre ?? "Componente"}</p>
                  <h2 className="mt-1 font-semibold text-white">{producto.nombre}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{formatoPrecio.format(producto.precio)} c/u · {producto.existencias} disponibles</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 p-1">
                  <button type="button" onClick={() => cambiarCantidad(producto.id, cantidad - 1)} aria-label={`Disminuir cantidad de ${producto.nombre}`} className="rounded p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                    <Minus size={16} />
                  </button>
                  <span className="min-w-7 text-center text-sm font-semibold">{cantidad}</span>
                  <button type="button" onClick={() => cambiarCantidad(producto.id, cantidad + 1)} aria-label={`Aumentar cantidad de ${producto.nombre}`} disabled={cantidad >= producto.existencias} className="rounded p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex min-w-24 items-center justify-end gap-3 sm:flex-col sm:items-end">
                  <span className="font-bold text-emerald-400">{formatoPrecio.format(producto.precio * cantidad)}</span>
                  <button type="button" onClick={() => quitar(producto.id)} className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                    <Trash2 size={14} /> Quitar
                  </button>
                </div>
              </article>
            );
          }) : !cargando ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-14 text-center">
              <ShoppingCart size={46} strokeWidth={1.3} className="mx-auto mb-4 text-emerald-400" />
              <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
              <p className="mt-2 text-zinc-400">Explora el catálogo y agrega los componentes que buscas.</p>
              <Link href="/catalogo" className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600">Ir al catálogo</Link>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Resumen de compra</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Productos ({cantidadTotal})</span><span>{formatoPrecio.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Envío estimado</span><span>{envio ? formatoPrecio.format(envio) : "—"}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-800 pt-4 text-lg font-bold">
              <span>Total estimado</span><span className="text-emerald-400">{formatoPrecio.format(subtotal + envio)}</span>
            </div>
          </div>
          <button type="button" disabled className="mt-6 w-full cursor-not-allowed rounded-lg bg-zinc-700 py-3 font-semibold text-zinc-400" title="El proceso de pago aún no está habilitado">
            Pago próximamente
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-zinc-500">Tu carrito se conserva en este navegador. Si iniciaste sesión, también se sincroniza con Supabase.</p>
          <Link href="/catalogo" className="mt-4 block text-center text-sm font-medium text-emerald-400 hover:text-emerald-300">Seguir comprando</Link>
        </aside>
      </section>
    </div>
  );
}
