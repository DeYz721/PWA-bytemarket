"use client";

import { useActionState, startTransition } from "react";
import { iniciarSesion } from "./acciones";

export function FormularioLogin({ errorInicial }) {
  const [estado, accion, enviando] = useActionState(iniciarSesion, { error: errorInicial });

  // onSubmit evita que se borre el correo si la contraseña es incorrecta.
  // action queda como respaldo: si la página aún no termina de cargar, el formulario
  // se envía por POST al servidor (nunca con la contraseña en la URL).
  function alEnviar(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    startTransition(() => accion(datos));
  }

  return (
    <form action={accion} onSubmit={alEnviar} className="space-y-4">
      <label className="block text-sm font-medium">
        Correo
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-emerald-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium">
        Contraseña
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-emerald-500 focus:outline-none"
        />
      </label>

      {estado?.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{estado.error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-emerald-700 py-2.5 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
