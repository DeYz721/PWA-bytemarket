import Link from "next/link";

const stats = [
  { label: "Productos", valor: "48", emoji: "📦" },
  { label: "Pedidos (mes)", valor: "12", emoji: "🛒" },
  { label: "Usuarios", valor: "156", emoji: "👤" },
  { label: "Ingresos (mes)", valor: "$98,400", emoji: "💰" },
];

const pedidosRecientes = [
  { id: "BM-002", cliente: "Arturo R.", total: "$9,499", estado: "En camino" },
  { id: "BM-001", cliente: "María G.", total: "$17,697", estado: "Entregado" },
  { id: "BM-000", cliente: "Carlos L.", total: "$5,298", estado: "Procesando" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-gray-500">Resumen general de ByteMarket</p>
        </div>
        <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1">
          Admin
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5 text-center"
          >
            <span className="text-3xl">{s.emoji}</span>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{s.valor}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pedidos recientes */}
      <h2 className="text-lg font-bold mb-4">Pedidos Recientes</h2>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">Pedido</th>
              <th className="px-5 py-3">Cliente</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pedidosRecientes.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">#{p.id}</td>
                <td className="px-5 py-3 text-gray-600">{p.cliente}</td>
                <td className="px-5 py-3 font-semibold text-emerald-700">{p.total}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.estado === "Entregado"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.estado === "En camino"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Acciones rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-emerald-400 transition-colors">
          <span className="text-2xl">➕</span>
          <p className="text-sm font-medium mt-1">Agregar producto</p>
        </button>
        <button className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-emerald-400 transition-colors">
          <span className="text-2xl">📊</span>
          <p className="text-sm font-medium mt-1">Ver reportes</p>
        </button>
        <button className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-emerald-400 transition-colors">
          <span className="text-2xl">⚙️</span>
          <p className="text-sm font-medium mt-1">Configuración</p>
        </button>
      </div>
    </div>
  );
}
