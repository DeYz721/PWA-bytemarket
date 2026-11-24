"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/carrito/CartProvider";

export function CartBadge() {
  const { cantidadTotal } = useCart();
  return (
    <Link
      href="/carrito"
      className="relative hover:text-emerald-200 transition-colors"
      aria-label={`Carrito, ${cantidadTotal} productos`}
    >
      <ShoppingCart size={21} strokeWidth={1.8} />
      {cantidadTotal > 0 && (
        <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {cantidadTotal > 99 ? "99+" : cantidadTotal}
        </span>
      )}
    </Link>
  );
}
