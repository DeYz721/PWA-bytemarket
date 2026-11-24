import Link from "next/link";
import { Package, Tags, BadgePercent, BookOpen, ShoppingBag } from "lucide-react";
import { requireAdmin } from "@/lib/admin";

// El panel depende de la sesión del administrador: puede esperar al servidor al navegar
export const instant = false;

export default async function AdminPage() {
  const { supabase } = await requireAdmin();

  // Cuenta los registros de cada tabla
  const contar = async (tabla) => (await supabase.from(tabla).select("*", { count: "exact", head: true })).count ?? 0;
  const [productos, categorias, promociones, guias, pedidos] = await Promise.all(
    ["productos", "categorias", "promociones", "guias", "pedidos"].map(contar)
  );

  const tarjetas = [
    { titulo: "Productos", valor: productos, icono: Package, href: "/admin/productos" },
    { titulo: "Categorías", valor: categorias, icono: Tags, href: "/admin/categorias" },
    { titulo: "Promociones", valor: promociones, icono: BadgePercent, href: "/admin/promociones" },
    { titulo: "Guías", valor: guias, icono: BookOpen, href: "/admin/guias" },
    { titulo: "Pedidos", valor: pedidos, icono: ShoppingBag },
  ];

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Panel de administración</h1>
      <p className="mb-8 text-gray-500">Administra el contenido de la tienda.</p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {tarjetas.map(({ titulo, valor, icono: Icono, href }) => {
          const contenido = (
            <>
              <Icono size={28} strokeWidth={1.5} className="mx-auto text-emerald-700" />
              <p className="mt-2 text-3xl font-extrabold">{valor}</p>
              <p className="text-sm text-gray-500">{titulo}</p>
            </>
          );
          return href ? (
            <Link key={titulo} href={href} className="rounded-xl border border-gray-200 bg-white p-5 text-center hover:border-emerald-400">
              {contenido}
            </Link>
          ) : (
            <div key={titulo} className="rounded-xl border border-gray-200 bg-white p-5 text-center">{contenido}</div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/productos/nuevo" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
          + Agregar producto
        </Link>
        <Link href="/admin/promociones" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:border-emerald-400">
          + Crear promoción
        </Link>
      </div>
    </div>
  );
}
