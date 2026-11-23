import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { FormularioAdmin } from "@/components/admin/FormularioAdmin";
import { BotonBorrar } from "@/components/admin/BotonBorrar";
import { Campo, AreaTexto, Seleccion, Casilla } from "@/components/admin/Campos";
import { guardarGuia, borrarGuia } from "../acciones";

const niveles = ["Principiante", "Intermedio", "Avanzado"];

export default async function GuiasAdminPage({ searchParams }) {
  const { editar } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: guias } = await supabase
    .from("guias")
    .select("id, titulo, descripcion, nivel, emoji, publicada")
    .order("titulo");

  const editando = (guias ?? []).find((g) => g.id === editar);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Guías</h1>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Guía</th>
                <th className="px-4 py-3">Nivel</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(guias ?? []).map((g) => (
                <tr key={g.id} className={g.id === editar ? "bg-emerald-50" : "hover:bg-gray-50"}>
                  <td className="px-4 py-3 font-medium">
                    {g.emoji} {g.titulo}
                    {!g.publicada && <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Borrador</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{g.nivel}</td>
                  <td className="space-x-4 px-4 py-3 text-right">
                    <Link href={`/admin/guias?editar=${g.id}`} className="font-medium text-emerald-700 hover:underline">Editar</Link>
                    <BotonBorrar accion={borrarGuia} id={g.id} nombre={g.titulo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">{editando ? "Editar guía" : "Nueva guía"}</h2>
        <FormularioAdmin
          key={editando?.id ?? "nueva"}
          accion={guardarGuia}
          id={editando?.id}
          cancelarHref={editando ? "/admin/guias" : undefined}
        >
          <Campo etiqueta="Título *" name="titulo" required defaultValue={editando?.titulo} />
          <AreaTexto etiqueta="Descripción *" name="descripcion" required defaultValue={editando?.descripcion ?? ""} />
          <div className="grid grid-cols-2 gap-3">
            <Seleccion etiqueta="Nivel" name="nivel" defaultValue={editando?.nivel ?? "Principiante"}>
              {niveles.map((n) => <option key={n}>{n}</option>)}
            </Seleccion>
            <Campo etiqueta="Emoji" name="emoji" maxLength={8} defaultValue={editando?.emoji ?? ""} />
          </div>
          <Casilla etiqueta="Publicada (visible en la tienda)" name="publicada" defaultChecked={editando?.publicada ?? true} />
        </FormularioAdmin>
      </div>
    </div>
  );
}
