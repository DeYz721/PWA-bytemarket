import { redirect } from "next/navigation";

// El inicio de sesión ahora es uno solo para administradores y clientes
export default function AdminLoginPage() {
  redirect("/login");
}
