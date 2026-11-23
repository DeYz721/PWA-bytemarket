// Campos de formulario reutilizables del panel de administración

const estiloInput = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-emerald-500 focus:outline-none";

export function Campo({ etiqueta, ayuda, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {etiqueta}
      <input className={estiloInput} {...props} />
      {ayuda && <span className="mt-1 block text-xs font-normal text-gray-400">{ayuda}</span>}
    </label>
  );
}

export function AreaTexto({ etiqueta, ayuda, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {etiqueta}
      <textarea className={estiloInput} rows={4} {...props} />
      {ayuda && <span className="mt-1 block text-xs font-normal text-gray-400">{ayuda}</span>}
    </label>
  );
}

export function Seleccion({ etiqueta, children, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {etiqueta}
      <select className={`${estiloInput} bg-white`} {...props}>{children}</select>
    </label>
  );
}

export function Casilla({ etiqueta, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <input type="checkbox" className="h-4 w-4 accent-emerald-700" {...props} />
      {etiqueta}
    </label>
  );
}

export function BotonGuardar({ enviando }) {
  return (
    <button
      type="submit"
      disabled={enviando}
      className="rounded-lg bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
    >
      {enviando ? "Guardando…" : "Guardar"}
    </button>
  );
}

export function MensajeError({ estado }) {
  if (!estado?.error) return null;
  return <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{estado.error}</p>;
}
