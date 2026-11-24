"use client";

import Link from "next/link";
import { useActionState, startTransition } from "react";
import { BotonGuardar, MensajeError } from "./Campos";

// Formulario genérico del panel: envía a una acción del servidor y muestra sus errores.
// onSubmit evita que se borre lo escrito si hay un error; action es el respaldo
// si el formulario se envía antes de que la página termine de cargar.
export function FormularioAdmin({ accion, id, cancelarHref, children }) {
  const [estado, enviar, enviando] = useActionState(accion, null);

  function alEnviar(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    startTransition(() => enviar(datos));
  }

  return (
    <form action={enviar} onSubmit={alEnviar} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
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
