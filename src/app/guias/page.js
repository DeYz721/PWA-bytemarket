import Link from "next/link";

const guias = [
  {
    titulo: "Cómo armar tu primera PC Gaming",
    descripcion: "Guía paso a paso para principiantes: desde elegir componentes hasta el primer encendido.",
    emoji: "🎮",
    nivel: "Principiante",
  },
  {
    titulo: "¿Cuánta RAM necesitas realmente?",
    descripcion: "Analizamos los escenarios de uso para saber si 16 GB, 32 GB o 64 GB es lo ideal para ti.",
    emoji: "💾",
    nivel: "Intermedio",
  },
  {
    titulo: "Intel vs AMD en 2026",
    descripcion: "Comparativa actualizada de rendimiento, precio y eficiencia entre las dos plataformas.",
    emoji: "⚔️",
    nivel: "Intermedio",
  },
  {
    titulo: "Guía de fuentes de poder",
    descripcion: "Todo sobre certificaciones 80+, modularidad y cómo calcular los watts que necesitas.",
    emoji: "⚡",
    nivel: "Principiante",
  },
];

export default function GuiasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Guías y Tutoriales</h1>
      <p className="text-gray-500 mb-8">
        Aprende todo lo que necesitas saber antes de comprar o armar tu PC.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guias.map((guia) => (
          <article
            key={guia.titulo}
            className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-4xl mt-1">{guia.emoji}</span>
            <div>
              <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 mb-2">
                {guia.nivel}
              </span>
              <h2 className="text-lg font-semibold text-gray-900">{guia.titulo}</h2>
              <p className="text-sm text-gray-500 mt-1">{guia.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
