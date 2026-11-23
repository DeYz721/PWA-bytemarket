import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Devuelve el cliente de Supabase si hay un administrador con sesión iniciada.
// Si no, manda a la página de inicio de sesión.
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: esAdmin } = await supabase.rpc("is_admin");
  if (!esAdmin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=no-admin");
  }

  return { supabase, user };
}

// Convierte los errores de la base de datos en mensajes entendibles
export function mensajeError(error) {
  if (error.code === "23503") return "No se puede borrar porque otros registros dependen de este (por ejemplo, productos de una categoría o pedidos de un producto). Puedes desactivarlo en lugar de borrarlo.";
  if (error.code === "23505") return "Ya existe un registro con ese valor.";
  if (error.code === "42501") return "No tienes permiso para hacer esto.";
  return `Error de la base de datos: ${error.message}`;
}

// "Tarjetas Gráficas" -> "tarjetas-graficas"
export function crearIdentificador(texto) {
  return texto
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
