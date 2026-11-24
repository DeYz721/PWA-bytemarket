import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { cerrarSesion } from "@/app/login/acciones";

// Todo lo que está dentro de (panel) exige un administrador con sesión iniciada
export default function PanelLayout({ children }) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-7xl px-4 py-10 text-gray-400">Verificando acceso…</p>}>
      <Protegido>{children}</Protegido>
    </Suspense>
  );
}

async function Protegido({ children }) {
  const { user } = await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <NavAdmin />
        <form action={cerrarSesion} className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{user.email}</span>
          <button type="submit" className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium hover:border-red-400 hover:text-red-600">
            Cerrar sesión
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
