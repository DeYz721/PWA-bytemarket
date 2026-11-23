import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { FormularioLogin } from "./FormularioLogin";

export const metadata = { title: "Acceso de administrador | ByteMarket" };

export default function LoginPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <ShieldCheck size={36} strokeWidth={1.5} className="mx-auto mb-3 text-emerald-700" />
        <h1 className="mb-1 text-center text-2xl font-bold">Panel de administración</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Acceso solo para administradores de ByteMarket.</p>
        <Suspense fallback={<FormularioLogin />}>
          <Login searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function Login({ searchParams }) {
  const { error } = await searchParams;
  return (
    <FormularioLogin
      errorInicial={error === "no-admin" ? "Esta cuenta no tiene permisos de administrador." : undefined}
    />
  );
}
