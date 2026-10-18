import Link from "next/link";

const itemsCarrito = [
  { id: 1, nombre: "RTX 4070 Super", precio: 9499, cantidad: 1, img: "🎮" },
  { id: 2, nombre: "Ryzen 7 7800X3D", precio: 6299, cantidad: 1, img: "🧠" },
  { id: 3, nombre: "Kingston Fury 32GB DDR5", precio: 1899, cantidad: 2, img: "💾" },
];

export default function CarritoPage() {
  const subtotal = itemsCarrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const envio = 149;
  const total = subtotal + envio;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {itemsCarrito.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg text-3xl">
                {item.img}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.nombre}</h3>
                <p className="text-sm text-gray-400">Cantidad: {item.cantidad}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-700">
                  ${(item.precio * item.cantidad).toLocaleString("es-MX")}
                </p>
                <button className="text-xs text-red-500 hover:text-red-700 mt-1">Eliminar</button>
              </div>
            </div>
          ))}

          {itemsCarrito.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">🛒</p>
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <Link href="/catalogo" className="text-emerald-600 hover:underline mt-2 inline-block">
                Ir al catálogo
              </Link>
            </div>
          )}
        </div>

        {/* Resumen de compra */}
        <aside className="rounded-xl border border-gray-200 bg-white p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4">Resumen de compra</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({itemsCarrito.reduce((s, i) => s + i.cantidad, 0)} productos)</span>
              <span>${subtotal.toLocaleString("es-MX")}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span>${envio.toLocaleString("es-MX")}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-emerald-700">${total.toLocaleString("es-MX")}</span>
            </div>
          </div>

          <button className="w-full mt-6 rounded-lg bg-emerald-700 text-white py-3 font-semibold hover:bg-emerald-800 transition-colors">
            Proceder al pago
          </button>
          <Link
            href="/catalogo"
            className="block text-center text-sm text-emerald-600 hover:underline mt-3"
          >
            Seguir comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
