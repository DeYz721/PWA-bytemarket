"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, mensajeError, crearIdentificador } from "@/lib/admin";

// ---------- utilidades ----------

// Los navegadores mandan los saltos de línea como \r\n: se guardan como \n
const texto = (fd, campo) => String(fd.get(campo) ?? "").replace(/\r\n/g, "\n").trim();
const textoOpcional = (fd, campo) => texto(fd, campo) || null;
const numeroOpcional = (fd, campo) => (texto(fd, campo) === "" ? null : Number(texto(fd, campo)));
const casilla = (fd, campo) => fd.get(campo) === "on";

// "Socket: AM5" (una por línea) -> { Socket: "AM5" }
function leerEspecificaciones(valor) {
  const especificaciones = {};
  for (const linea of valor.split("\n")) {
    const separador = linea.indexOf(":");
    if (separador === -1) continue;
    const clave = linea.slice(0, separador).trim();
    const dato = linea.slice(separador + 1).trim();
    if (clave) especificaciones[clave] = dato;
  }
  return especificaciones;
}

// Actualiza las páginas públicas después de un cambio
function refrescarSitio() {
  revalidatePath("/", "layout");
}

// ---------- productos ----------

export async function guardarProducto(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const id = texto(fd, "id");

  const producto = {
    nombre: texto(fd, "nombre"),
    id_categoria: texto(fd, "id_categoria"),
    descripcion: texto(fd, "descripcion"),
    precio: numeroOpcional(fd, "precio"),
    precio_anterior: numeroOpcional(fd, "precio_anterior"),
    existencias: numeroOpcional(fd, "existencias") ?? 0,
    emoji: texto(fd, "emoji"),
    url_imagen: textoOpcional(fd, "url_imagen"),
    especificaciones: leerEspecificaciones(texto(fd, "especificaciones")),
    destacado: casilla(fd, "destacado"),
    activo: casilla(fd, "activo"),
  };

  if (!producto.nombre) return { error: "El nombre es obligatorio." };
  if (!producto.id_categoria) return { error: "Elige una categoría." };
  if (producto.precio === null || !(producto.precio >= 0)) return { error: "Escribe un precio válido." };
  if (producto.existencias < 0) return { error: "Las existencias no pueden ser negativas." };

  const { error } = id
    ? await supabase.from("productos").update(producto).eq("id", id)
    : await supabase.from("productos").insert(producto);
  if (error) return { error: mensajeError(error) };

  refrescarSitio();
  redirect("/admin/productos");
}

export async function borrarProducto(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("productos").delete().eq("id", texto(fd, "id"));
  if (error) return { error: mensajeError(error) };
  refrescarSitio();
  return null;
}

// ---------- categorías ----------

export async function guardarCategoria(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const id = texto(fd, "id");
  const nombre = texto(fd, "nombre");
  if (!nombre) return { error: "El nombre es obligatorio." };

  const categoria = {
    nombre,
    identificador_url: crearIdentificador(texto(fd, "identificador_url") || nombre),
    icono: texto(fd, "icono"),
    activo: casilla(fd, "activo"),
  };

  const { error } = id
    ? await supabase.from("categorias").update(categoria).eq("id", id)
    : await supabase.from("categorias").insert(categoria);
  if (error) return { error: mensajeError(error) };

  refrescarSitio();
  redirect("/admin/categorias");
}

export async function borrarCategoria(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const id = texto(fd, "id");

  // Si se borra una categoría con productos, la base de datos los deja sin categoría
  // y desaparecen del catálogo. Por eso no se permite.
  const { count } = await supabase.from("productos").select("*", { count: "exact", head: true }).eq("id_categoria", id);
  if (count > 0) {
    return { error: `No se puede borrar: tiene ${count} producto(s). Cámbialos de categoría o desactiva la categoría.` };
  }

  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) return { error: mensajeError(error) };
  refrescarSitio();
  return null;
}

// ---------- promociones ----------

export async function guardarPromocion(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const id = texto(fd, "id");
  const inicio = texto(fd, "inicio_en");
  const fin = texto(fd, "fin_en");

  const promocion = {
    id_producto: texto(fd, "id_producto"),
    precio_oferta: numeroOpcional(fd, "precio_oferta"),
    inicio_en: inicio ? new Date(`${inicio}T00:00:00`).toISOString() : new Date().toISOString(),
    fin_en: fin ? new Date(`${fin}T23:59:59`).toISOString() : null,
    activo: casilla(fd, "activo"),
  };

  if (!promocion.id_producto) return { error: "Elige un producto." };
  if (promocion.precio_oferta === null || !(promocion.precio_oferta >= 0)) return { error: "Escribe un precio de oferta válido." };
  if (promocion.fin_en && promocion.fin_en < promocion.inicio_en) return { error: "La fecha de fin debe ser después del inicio." };

  const { error } = id
    ? await supabase.from("promociones").update(promocion).eq("id", id)
    : await supabase.from("promociones").insert(promocion);
  if (error) return { error: mensajeError(error) };

  refrescarSitio();
  redirect("/admin/promociones");
}

export async function borrarPromocion(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("promociones").delete().eq("id", texto(fd, "id"));
  if (error) return { error: mensajeError(error) };
  refrescarSitio();
  return null;
}

// ---------- guías ----------

export async function guardarGuia(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const id = texto(fd, "id");

  const guia = {
    titulo: texto(fd, "titulo"),
    descripcion: texto(fd, "descripcion"),
    nivel: texto(fd, "nivel"),
    emoji: texto(fd, "emoji"),
    contenido: texto(fd, "contenido"),
    publicada: casilla(fd, "publicada"),
  };
  if (!guia.titulo) return { error: "El título es obligatorio." };
  if (!guia.descripcion) return { error: "La descripción es obligatoria." };

  const { error } = id
    ? await supabase.from("guias").update(guia).eq("id", id)
    : await supabase.from("guias").insert(guia);
  if (error) return { error: mensajeError(error) };

  refrescarSitio();
  redirect("/admin/guias");
}

export async function borrarGuia(estadoPrevio, fd) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("guias").delete().eq("id", texto(fd, "id"));
  if (error) return { error: mensajeError(error) };
  refrescarSitio();
  return null;
}
