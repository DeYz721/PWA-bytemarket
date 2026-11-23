import { requireAdmin } from "@/lib/admin";
import { FormularioAdmin } from "@/components/admin/FormularioAdmin";
import { CamposProducto } from "@/components/admin/CamposProducto";
import { guardarProducto } from "../../acciones";

export default async function NuevoProductoPage() {
  const { supabase } = await requireAdmin();
  const { data: categorias } = await supabase.from("categorias").select("id, nombre").order("nombre");

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Agregar producto</h1>
      <FormularioAdmin accion={guardarProducto} cancelarHref="/admin/productos">
        <CamposProducto categorias={categorias ?? []} />
      </FormularioAdmin>
    </div>
  );
}
