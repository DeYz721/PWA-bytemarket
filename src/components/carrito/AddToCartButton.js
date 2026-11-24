"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/carrito/CartProvider";

export function AddToCartButton({ producto }) {
  const { agregar, cargando, error, limpiarError } = useCart();
  const [agregado, setAgregado] = useState(false);
  const [ocupado, setOcupado] = useState(false);

  async function agregarProducto() {
    setOcupado(true);
    setAgregado(false);
    limpiarError();
    const resultado = await agregar(producto);
    setAgregado(resultado);
    setOcupado(false);
  }

  return (
    <div className="mb-8">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={agregarProducto}
          disabled={cargando || ocupado || Number(producto.existencias) < 1}
          className="flex-1 rounded-lg bg-emerald-700 py-3 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="inline-flex items-center justify-center gap-2">
            {agregado ? <Check size={18} /> : <ShoppingCart size={18} />}
            {cargando ? "Cargando carrito…" : ocupado ? "Agregando…" : agregado ? "Agregado al carrito" : "Agregar al carrito"}
          </span>
        </button>
        <button aria-label="Agregar a favoritos" className="rounded-lg border border-zinc-700 px-4 py-3 transition-colors hover:border-emerald-500">
          ❤️
        </button>
      </div>
      {agregado && (
        <Link href="/carrito" className="mt-2 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300">
          Ver carrito
        </Link>
      )}
      {error && <p role="status" className="mt-2 text-sm text-amber-300">{error}</p>}
    </div>
  );
}
