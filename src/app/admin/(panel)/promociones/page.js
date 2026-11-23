import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { formatoPrecio } from "@/lib/formato";
import { FormularioAdmin } from "@/components/admin/FormularioAdmin";
import { BotonBorrar } from "@/components/admin/BotonBorrar";
import { Campo, Casilla, Seleccion } from "@/components/admin/Campos";
import { guardarPromocion, borrarPromocion } from "../acciones";

const fecha = (iso) => (iso ? new Date(iso).toLocaleDateString("es-MX") : "Sin fin");
const paraInput = (iso) => (iso ? iso.slice(0, 10) : "");

export default async function PromocionesAdminPage({ searchParams }) {
  const { editar } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: promociones }, { data: productos }] = await Promise.all([
    supabase
      .from("promociones")
      .select("id, id_producto, precio_oferta, inicio_en, fin_en, activo, productos(nombre, precio)")
      .order("inicio_en", { ascending: false }),
    supabase.from("productos").select("id, nombre, precio").order("nombre"),
  ]);

  const editando = (promociones ?? []).find((p) => p.id === editar);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Promociones</h1>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3 text-right">Precio normal</th>
                <th className="px-4 py-3 text-right">Oferta</th>
                <th className="px-4 py-3">Vigencia</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(promociones ?? []).map((p) => (
                <tr key={p.id} className={p.id === editar ? "bg-emerald-50" : "hover:bg-gray-50"}>
                  <td className="px-4 py-3 font-medium">
                    {p.productos?.nombre}
                    {!p.activo && <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Inactiva</span>}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">{p.productos && formatoPrecio.format(p.productos.precio)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-700">{formatoPrecio.format(p.precio_oferta)}</td>
                  <td className="px-4 py-3 text-gray-500">{fecha(p.inicio_en)} – {fecha(p.fin_en)}</td>
                  <td className="space-x-4 px-4 py-3 text-right">
                    <Link href={`/admin/promociones?editar=${p.id}`} className="font-medium text-emerald-700 hover:underline">Editar</Link>
                    <BotonBorrar accion={borrarPromocion} id={p.id} nombre={`promoción de ${p.productos?.nombre}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">{editando ? "Editar promoción" : "Nueva promoción"}</h2>
        <FormularioAdmin
          key={editando?.id ?? "nueva"}
          accion={guardarPromocion}
          id={editando?.id}
          cancelarHref={editando ? "/admin/promociones" : undefined}
        >
          <Seleccion etiqueta="Producto *" name="id_producto" required defaultValue={editando?.id_producto ?? ""}>
            <option value="" disabled>Elige un producto</option>
            {(productos ?? []).map((p) => (
              <option key={p.id} value={p.id}>{p.nombre} ({formatoPrecio.format(p.precio)})</option>
            ))}
          </Seleccion>
          <Campo etiqueta="Precio de oferta *" name="precio_oferta" type="number" step="0.01" min="0" required defaultValue={editando?.precio_oferta} />
          <div className="grid grid-cols-2 gap-3">
            <Campo etiqueta="Inicio" name="inicio_en" type="date" defaultValue={paraInput(editando?.inicio_en)} ayuda="Vacío = hoy" />
            <Campo etiqueta="Fin" name="fin_en" type="date" defaultValue={paraInput(editando?.fin_en)} ayuda="Vacío = sin fin" />
          </div>
          <Casilla etiqueta="Activa" name="activo" defaultChecked={editando?.activo ?? true} />
        </FormularioAdmin>
      </div>
    </div>
  );
}
