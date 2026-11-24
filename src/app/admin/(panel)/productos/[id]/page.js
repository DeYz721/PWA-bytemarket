import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { FormularioAdmin } from "@/components/admin/FormularioAdmin";
import { CamposProducto } from "@/components/admin/CamposProducto";
import { guardarProducto } from "../../acciones";

// El panel depende de la sesión del administrador: puede esperar al servidor al navegar
export const instant = false;

export default async function EditarProductoPage({ params }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [{ data: producto }, { data: categorias }] = await Promise.all([
    supabase.from("productos").select("*").eq("id", id).maybeSingle(),
    supabase.from("categorias").select("id, nombre").order("nombre"),
  ]);

  if (!producto) {
    return (
      <p>
        Producto no encontrado. <Link href="/admin/productos" className="text-emerald-700 hover:underline">Volver</Link>
      </p>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Editar: {producto.nombre}</h1>
      <FormularioAdmin accion={guardarProducto} id={producto.id} cancelarHref="/admin/productos">
        <CamposProducto categorias={categorias ?? []} producto={producto} />
      </FormularioAdmin>
    </div>
  );
}
