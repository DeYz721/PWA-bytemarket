import { UserRound } from "lucide-react";
import { FormularioLogin } from "./FormularioLogin";

export const metadata = { title: "Iniciar sesión | ByteMarket" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <UserRound size={36} strokeWidth={1.5} className="mx-auto mb-3 text-emerald-700" />
        <h1 className="mb-1 text-center text-2xl font-bold">Iniciar sesión</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Entra con tu cuenta de ByteMarket.</p>
        <FormularioLogin />
      </div>
    </div>
  );
}
