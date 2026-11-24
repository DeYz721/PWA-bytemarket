import Link from "next/link";
import { UserRound, ShieldCheck, LogOut, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cerrarSesion } from "@/app/login/acciones";

// Encabezado: muestra "Iniciar sesión" o el usuario con su menú.
// El botón de Admin solo aparece para administradores.
export async function MenuUsuario() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-1.5 text-sm font-medium hover:text-emerald-200 transition-colors">
        <LogIn size={19} strokeWidth={1.8} />
        <span className="hidden sm:inline">Iniciar sesión</span>
      </Link>
    );
  }

  const [{ data: esAdmin }, { data: perfil }] = await Promise.all([
    supabase.rpc("is_admin"),
    supabase.from("perfiles").select("nombre_completo").eq("id", user.id).maybeSingle(),
  ]);
  const nombre = perfil?.nombre_completo?.split(" ")[0] || user.email.split("@")[0];

  return (
    <div className="flex items-center gap-4">
      <Link href="/perfil" className="flex items-center gap-1.5 text-sm hover:text-emerald-200 transition-colors" aria-label="Mi perfil">
        <UserRound size={20} strokeWidth={1.8} />
        <span className="hidden max-w-28 truncate sm:inline">{nombre}</span>
      </Link>

      {esAdmin && (
        <Link
          href="/admin"
          className="flex items-center gap-2 rounded-md bg-emerald-900 px-3 py-2 text-xs font-semibold hover:bg-emerald-800 transition-colors"
        >
          <ShieldCheck size={16} strokeWidth={1.8} />
          <span className="hidden sm:inline">Admin</span>
        </Link>
      )}

      <form action={cerrarSesion}>
        <button type="submit" className="flex items-center hover:text-emerald-200 transition-colors" aria-label="Cerrar sesión" title="Cerrar sesión">
          <LogOut size={19} strokeWidth={1.8} />
        </button>
      </form>
    </div>
  );
}
