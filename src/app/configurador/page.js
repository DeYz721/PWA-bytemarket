const slots = [
  { label: "Procesador (CPU)", seleccion: null, emoji: "🧠" },
  { label: "Tarjeta Gráfica (GPU)", seleccion: null, emoji: "🎮" },
  { label: "Memoria RAM", seleccion: null, emoji: "💾" },
  { label: "Almacenamiento", seleccion: null, emoji: "💿" },
  { label: "Fuente de Poder", seleccion: null, emoji: "⚡" },
  { label: "Tarjeta Madre", seleccion: null, emoji: "🔧" },
  { label: "Gabinete", seleccion: null, emoji: "🖥️" },
];

export default function ConfiguradorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Configurador de PC</h1>
      <p className="text-gray-500 mb-8">
        Selecciona cada componente y nuestro asistente verificará la compatibilidad automáticamente.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slots de componentes */}
        <div className="lg:col-span-2 space-y-4">
          {slots.map((slot) => (
            <div
              key={slot.label}
              className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-white p-5 hover:border-emerald-400 transition-colors"
            >
              <span className="text-3xl">{slot.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{slot.label}</h3>
                <p className="text-sm text-gray-400">Sin seleccionar</p>
              </div>
              <button className="rounded-lg bg-emerald-700 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-800 transition-colors">
                Elegir
              </button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <aside className="rounded-xl border border-gray-200 bg-white p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4">Resumen</h2>

          <div className="space-y-3 text-sm text-gray-500 mb-6">
            <p>0 de {slots.length} componentes seleccionados</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>

          {/* Estado de compatibilidad */}
          <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-400 mb-6">
            Selecciona componentes para verificar compatibilidad
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-4">
            <span className="font-semibold">Total estimado:</span>
            <span className="text-xl font-extrabold text-emerald-700">$0.00</span>
          </div>

          <button
            disabled
            className="w-full rounded-lg bg-gray-300 text-gray-500 py-3 font-semibold cursor-not-allowed"
          >
            Agregar todo al carrito
          </button>
        </aside>
      </div>
    </div>
  );
}
