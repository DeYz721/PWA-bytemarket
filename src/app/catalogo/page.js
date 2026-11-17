import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const formatoPrecio = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export default function CatalogoPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold mb-2">Catálogo</h1>
      <p className="text-gray-500 mb-8">Explora todos nuestros componentes de hardware.</p>

      <Suspense fallback={<CargandoProductos />}>
        <ListaProductos searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Lee categorías y productos desde Supabase
async function ListaProductos({ searchParams }) {
  const { cat } = await searchParams;
  const supabase = await createClient();

  const { data: categorias } = await supabase
    .from("categorias")
    .select("nombre, identificador_url")
    .eq("activo", true)
    .order("nombre");

  let consulta = supabase
    .from("productos")
    .select("id, nombre, precio, precio_anterior, existencias, emoji, categorias!inner(nombre, identificador_url)")
    .eq("activo", true)
    .order("nombre");

  if (cat) {
    consulta = consulta.eq("categorias.identificador_url", cat);
  }

  const { data: productos, error } = await consulta;

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        <FiltroCategoria href="/catalogo" activo={!cat} nombre="Todos" />
        {(categorias ?? []).map((c) => (
          <FiltroCategoria
            key={c.identificador_url}
            href={`/catalogo?cat=${c.identificador_url}`}
            activo={cat === c.identificador_url}
            nombre={c.nombre}
          />
        ))}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 text-red-700 p-4">
          No se pudieron cargar los productos. Revisa tu conexión e inténtalo de nuevo.
        </p>
      )}

      {!error && productos.length === 0 && (
        <p className="text-center py-16 text-gray-400">No hay productos en esta categoría.</p>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(productos ?? []).map((prod) => (
          <Link
            key={prod.id}
            href={`/producto?id=${prod.id}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-emerald-400 transition-all"
          >
            <div className="flex items-center justify-center h-28 bg-gray-50 rounded-lg text-5xl mb-4 group-hover:bg-emerald-50 transition-colors">
              {prod.emoji}
            </div>
            <span className="text-xs font-medium text-emerald-600 uppercase">{prod.categorias.nombre}</span>
            <h3 className="font-semibold text-gray-900 mt-1">{prod.nombre}</h3>
            <div className="flex items-baseline gap-2 mt-3">
              <p className="text-lg font-bold text-emerald-700">{formatoPrecio.format(prod.precio)}</p>
              {prod.precio_anterior && (
                <p className="text-sm text-gray-400 line-through">{formatoPrecio.format(prod.precio_anterior)}</p>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {prod.existencias > 0 ? `${prod.existencias} disponibles` : "Agotado"}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

function FiltroCategoria({ href, activo, nombre }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        activo
          ? "bg-emerald-700 text-white border-emerald-700"
          : "border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-700"
      }`}
    >
      {nombre}
    </Link>
  );
}

function CargandoProductos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
          <div className="h-28 bg-gray-100 rounded-lg mb-4" />
          <div className="h-3 w-1/3 bg-gray-100 rounded mb-2" />
          <div className="h-4 w-4/5 bg-gray-100 rounded mb-3" />
          <div className="h-5 w-1/2 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
