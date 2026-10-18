export default function PerfilPage() {
  const usuario = {
    nombre: "Arturo",
    email: "arturo@example.com",
    miembro: "Octubre 2026",
  };

  const pedidos = [
    { id: "BM-001", fecha: "10/10/2026", total: "$17,697", estado: "Entregado", color: "emerald" },
    { id: "BM-002", fecha: "15/10/2026", total: "$9,499", estado: "En camino", color: "yellow" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tarjeta de perfil */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mb-4">
            👤
          </div>
          <h2 className="text-xl font-bold">{usuario.nombre}</h2>
          <p className="text-sm text-gray-500">{usuario.email}</p>
          <p className="text-xs text-gray-400 mt-1">Miembro desde {usuario.miembro}</p>

          <div className="mt-6 space-y-2">
            <button className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium hover:border-emerald-400 transition-colors">
              Editar perfil
            </button>
            <button className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium hover:border-emerald-400 transition-colors">
              Direcciones
            </button>
            <button className="w-full rounded-lg border border-red-200 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Historial de pedidos */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Historial de Pedidos</h2>
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5"
              >
                <div>
                  <p className="font-semibold text-gray-900">Pedido #{pedido.id}</p>
                  <p className="text-sm text-gray-400">{pedido.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{pedido.total}</p>
                  <span
                    className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      pedido.color === "emerald"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {pedido.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
