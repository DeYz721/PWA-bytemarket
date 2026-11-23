"use client";

import { useActionState } from "react";

// Botón que pide confirmación y luego llama a la acción de borrar del servidor
export function BotonBorrar({ accion, id, nombre }) {
  const [estado, enviar, enviando] = useActionState(accion, null);

  return (
    <form
      action={enviar}
      onSubmit={(e) => {
        if (!confirm(`¿Seguro que quieres borrar "${nombre}"? Esta acción no se puede deshacer.`)) e.preventDefault();
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={enviando} className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50">
        {enviando ? "Borrando…" : "Borrar"}
      </button>
      {estado?.error && <p className="mt-1 max-w-xs text-xs text-red-600">{estado.error}</p>}
    </form>
  );
}
