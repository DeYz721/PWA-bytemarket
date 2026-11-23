import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { FormularioAdmin } from "@/components/admin/FormularioAdmin";
import { BotonBorrar } from "@/components/admin/BotonBorrar";
import { Campo, Casilla } from "@/components/admin/Campos";
import { guardarCategoria, borrarCategoria } from "../acciones";

export default async function CategoriasAdminPage({ searchParams }) {
  const { editar } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nombre, identificador_url, icono, activo, productos(count)")
    .order("nombre");

  const editando = (categorias ?? []).find((c) => c.id === editar);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Categorías</h1>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Identificador</th>
                <th className="px-4 py-3 text-right">Productos</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(categorias ?? []).map((c) => (
                <tr key={c.id} className={c.id === editar ? "bg-emerald-50" : "hover:bg-gray-50"}>
                  <td className="px-4 py-3 font-medium">
                    {c.icono} {c.nombre}
                    {!c.activo && <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Oculta</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.identificador_url}</td>
                  <td className="px-4 py-3 text-right">{c.productos?.[0]?.count ?? 0}</td>
                  <td className="space-x-4 px-4 py-3 text-right">
                    <Link href={`/admin/categorias?editar=${c.id}`} className="font-medium text-emerald-700 hover:underline">Editar</Link>
                    <BotonBorrar accion={borrarCategoria} id={c.id} nombre={c.nombre} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">{editando ? "Editar categoría" : "Nueva categoría"}</h2>
        <FormularioAdmin
          key={editando?.id ?? "nueva"}
          accion={guardarCategoria}
          id={editando?.id}
          cancelarHref={editando ? "/admin/categorias" : undefined}
        >
          <Campo etiqueta="Nombre *" name="nombre" required defaultValue={editando?.nombre} />
          <Campo
            etiqueta="Identificador para la URL"
            name="identificador_url"
            defaultValue={editando?.identificador_url}
            ayuda="Si lo dejas vacío se genera del nombre. Ej. tarjetas-madre"
          />
          <Campo etiqueta="Ícono (emoji)" name="icono" maxLength={8} defaultValue={editando?.icono ?? ""} />
          <Casilla etiqueta="Activa (visible en la tienda)" name="activo" defaultChecked={editando?.activo ?? true} />
        </FormularioAdmin>
      </div>
    </div>
  );
}
