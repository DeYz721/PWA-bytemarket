"use client";

import Link from "next/link";
import { useActionState, startTransition } from "react";
import { BotonGuardar, MensajeError } from "./Campos";

// Formulario genérico del panel: envía a una acción del servidor y muestra sus errores.
// Se envía con onSubmit (no con action) para que, si hay un error, no se borre lo escrito.
export function FormularioAdmin({ accion, id, cancelarHref, children }) {
  const [estado, enviar, enviando] = useActionState(accion, null);

  function alEnviar(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    startTransition(() => enviar(datos));
  }

  return (
    <form onSubmit={alEnviar} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      {id && <input type="hidden" name="id" value={id} />}
      {children}
      <MensajeError estado={estado} />
      <div className="flex items-center gap-4">
        <BotonGuardar enviando={enviando} />
        {cancelarHref && (
          <Link href={cancelarHref} className="text-sm text-gray-500 hover:underline">Cancelar</Link>
        )}
      </div>
    </form>
  );
}
