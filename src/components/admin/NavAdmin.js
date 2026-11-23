"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/admin", texto: "Resumen" },
  { href: "/admin/productos", texto: "Productos" },
  { href: "/admin/categorias", texto: "Categorías" },
  { href: "/admin/promociones", texto: "Promociones" },
  { href: "/admin/guias", texto: "Guías" },
];

export function NavAdmin() {
  const ruta = usePathname();
  return (
    <nav className="flex flex-wrap gap-2">
      {enlaces.map((e) => {
        const activo = e.href === "/admin" ? ruta === "/admin" : ruta.startsWith(e.href);
        return (
          <Link
            key={e.href}
            href={e.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              activo ? "bg-emerald-700 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {e.texto}
          </Link>
        );
      })}
    </nav>
  );
}
