// Se muestra mientras carga cada sección del panel
export default function Cargando() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded bg-gray-100" />
      <div className="h-64 w-full rounded-xl bg-gray-100" />
    </div>
  );
}
