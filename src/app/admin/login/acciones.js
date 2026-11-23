"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function iniciarSesion(estadoPrevio, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Escribe tu correo y tu contraseña." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Correo o contraseña incorrectos." };

  const { data: esAdmin } = await supabase.rpc("is_admin");
  if (!esAdmin) {
    await supabase.auth.signOut();
    return { error: "Esta cuenta no tiene permisos de administrador." };
  }

  redirect("/admin");
}
