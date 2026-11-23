import { Campo, AreaTexto, Seleccion, Casilla } from "./Campos";

// Campos del formulario de producto (crear y editar)
export function CamposProducto({ categorias, producto = {} }) {
  const especificaciones = Object.entries(producto.especificaciones ?? {})
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join("\n");

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Nombre *" name="nombre" required defaultValue={producto.nombre} />
        <Seleccion etiqueta="Categoría *" name="id_categoria" required defaultValue={producto.id_categoria ?? ""}>
          <option value="" disabled>Elige una categoría</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </Seleccion>
      </div>
      <AreaTexto etiqueta="Descripción" name="descripcion" rows={3} defaultValue={producto.descripcion ?? ""} />
      <div className="grid gap-4 sm:grid-cols-4">
        <Campo etiqueta="Precio *" name="precio" type="number" step="0.01" min="0" required defaultValue={producto.precio} />
        <Campo etiqueta="Precio anterior" name="precio_anterior" type="number" step="0.01" min="0" defaultValue={producto.precio_anterior ?? ""} ayuda="Para mostrarlo tachado" />
        <Campo etiqueta="Existencias" name="existencias" type="number" min="0" defaultValue={producto.existencias ?? 0} />
        <Campo etiqueta="Emoji" name="emoji" maxLength={8} defaultValue={producto.emoji ?? ""} ayuda="Ej. 🎮" />
      </div>
      <Campo etiqueta="URL de imagen" name="url_imagen" type="url" defaultValue={producto.url_imagen ?? ""} ayuda="Opcional" />
      <AreaTexto
        etiqueta="Especificaciones"
        name="especificaciones"
        rows={5}
        defaultValue={especificaciones}
        placeholder={"Socket: AM5\nNúcleos: 8\nTDP: 120W"}
        ayuda="Una por línea, con el formato Nombre: valor"
      />
      <div className="flex gap-6">
        <Casilla etiqueta="Activo (visible en la tienda)" name="activo" defaultChecked={producto.activo ?? true} />
        <Casilla etiqueta="Destacado en el inicio" name="destacado" defaultChecked={producto.destacado ?? false} />
      </div>
    </>
  );
}
