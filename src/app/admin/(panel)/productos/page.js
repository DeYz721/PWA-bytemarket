import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { formatoPrecio } from "@/lib/formato";
import { BotonBorrar } from "@/components/admin/BotonBorrar";
import { borrarProducto } from "../acciones";

// El panel depende de la sesión del administrador: puede esperar al servidor al navegar
export const instant = false;

export default async function ProductosAdminPage() {
  const { supabase } = await requireAdmin();
  const { data: productos, error } = await supabase
    .from("productos")
    .select("id, nombre, precio, existencias, emoji, activo, destacado, categorias(nombre)")
    .order("nombre");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/admin/productos/nuevo" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
          + Agregar producto
        </Link>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-red-700">No se pudieron cargar los productos.</p>}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-right">Existencias</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(productos ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.emoji} {p.nombre}</td>
                <td className="px-4 py-3 text-gray-500">{p.categorias?.nombre}</td>
                <td className="px-4 py-3 text-right">{formatoPrecio.format(p.precio)}</td>
                <td className={`px-4 py-3 text-right ${p.existencias <= 5 ? "font-semibold text-orange-600" : ""}`}>{p.existencias}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.activo ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.activo ? "Activo" : "Oculto"}
                  </span>
                  {p.destacado && <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">Destacado</span>}
                </td>
                <td className="space-x-4 px-4 py-3 text-right">
                  <Link href={`/admin/productos/${p.id}`} className="text-sm font-medium text-emerald-700 hover:underline">Editar</Link>
                  <BotonBorrar accion={borrarProducto} id={p.id} nombre={p.nombre} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
