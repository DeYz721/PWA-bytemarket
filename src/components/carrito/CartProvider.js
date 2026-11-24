"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "bytemarket-carrito";
const CartContext = createContext(null);

function normalizarProducto(producto) {
  if (!producto) return null;
  return {
    id: producto.id,
    nombre: producto.nombre,
    precio: Number(producto.precio),
    precio_anterior: producto.precio_anterior == null ? null : Number(producto.precio_anterior),
    existencias: Number(producto.existencias ?? 0),
    emoji: producto.emoji,
    url_imagen: producto.url_imagen,
    categorias: producto.categorias ?? null,
  };
}

function leerAlmacenamiento() {
  try {
    const valores = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(valores) ? valores : [];
  } catch {
    return [];
  }
}

function guardarAlmacenamiento(items) {
  try {
    if (items.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(({ producto, cantidad }) => ({ producto, cantidad }))));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // El carrito sigue disponible durante esta sesión aunque el navegador no permita guardar localmente.
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const itemsRef = useRef([]);
  const usuarioRef = useRef(null);
  const carritoRef = useRef(null);
  const supabaseRef = useRef(null);

  const actualizarItems = useCallback((siguientes) => {
    itemsRef.current = siguientes;
    setItems(siguientes);
    if (!usuarioRef.current) guardarAlmacenamiento(siguientes);
  }, []);

  const obtenerCarritoId = useCallback(async () => {
    if (!usuarioRef.current) return null;
    if (carritoRef.current) return carritoRef.current;

    const supabase = supabaseRef.current;
    const { data: existente, error: errorLectura } = await supabase
      .from("carritos")
      .select("id")
      .eq("id_usuario", usuarioRef.current)
      .maybeSingle();
    if (errorLectura) throw errorLectura;
    if (existente) {
      carritoRef.current = existente.id;
      return existente.id;
    }

    const { data: nuevo, error: errorCreacion } = await supabase
      .from("carritos")
      .insert({ id_usuario: usuarioRef.current })
      .select("id")
      .single();
    if (errorCreacion) throw errorCreacion;
    carritoRef.current = nuevo.id;
    return nuevo.id;
  }, []);

  useEffect(() => {
    let cancelado = false;

    async function cargarCarrito() {
      const supabase = createClient();
      supabaseRef.current = supabase;
      const carritoLocal = leerAlmacenamiento()
        .filter((entrada) => entrada?.producto?.id && Number(entrada.cantidad) > 0)
        .map((entrada) => ({ producto: normalizarProducto(entrada.producto), cantidad: Number(entrada.cantidad) }));
      if (carritoLocal.length && !cancelado) actualizarItems(carritoLocal);

      try {
        const { data: { user }, error: errorSesion } = await supabase.auth.getUser();
        if (errorSesion) throw errorSesion;

        if (user) {
          usuarioRef.current = user.id;
          const { data: carrito, error: errorCarrito } = await supabase
            .from("carritos")
            .select("id")
            .eq("id_usuario", user.id)
            .maybeSingle();
          if (errorCarrito) throw errorCarrito;
          carritoRef.current = carrito?.id ?? null;

          let itemsBase = [];
          if (carrito?.id) {
            const { data, error: errorItems } = await supabase
              .from("articulos_carrito")
              .select("id_producto, cantidad, productos(id, nombre, precio, precio_anterior, existencias, emoji, url_imagen, categorias(nombre, identificador_url))")
              .eq("id_carrito", carrito.id);
            if (errorItems) throw errorItems;
            itemsBase = (data ?? []).filter((item) => item.productos).map((item) => ({
              producto: normalizarProducto(item.productos),
              cantidad: Number(item.cantidad),
            }));
          }

          if (carritoLocal.length) {
            const idsLocales = carritoLocal.map((item) => item.producto.id);
            const { data: productosLocales, error: errorProductos } = await supabase
              .from("productos")
              .select("id, nombre, precio, precio_anterior, existencias, emoji, url_imagen, categorias(nombre, identificador_url)")
              .in("id", idsLocales)
              .eq("activo", true)
              .gt("existencias", 0);
            if (errorProductos) throw errorProductos;
            const disponibles = new Map((productosLocales ?? []).map((producto) => [producto.id, normalizarProducto(producto)]));
            const actuales = new Map(itemsBase.map((item) => [item.producto.id, item.cantidad]));
            const carritoId = await obtenerCarritoId();
            for (const item of carritoLocal) {
              const producto = disponibles.get(item.producto.id);
              if (!producto) continue;
              const cantidad = Math.min((actuales.get(producto.id) ?? 0) + item.cantidad, producto.existencias);
              const { error: errorGuardar } = await supabase
                .from("articulos_carrito")
                .upsert({ id_carrito: carritoId, id_producto: producto.id, cantidad }, { onConflict: "id_carrito,id_producto" });
              if (errorGuardar) throw errorGuardar;
              actuales.set(producto.id, cantidad);
            }
            window.localStorage.removeItem(STORAGE_KEY);
          }

          if (carritoRef.current) {
            const { data, error: errorItems } = await supabase
              .from("articulos_carrito")
              .select("id_producto, cantidad, productos(id, nombre, precio, precio_anterior, existencias, emoji, url_imagen, categorias(nombre, identificador_url))")
              .eq("id_carrito", carritoRef.current);
            if (errorItems) throw errorItems;
            itemsBase = (data ?? []).filter((item) => item.productos && Number(item.productos.existencias) > 0).map((item) => ({
              producto: normalizarProducto(item.productos),
              cantidad: Math.min(Number(item.cantidad), Number(item.productos.existencias)),
            }));
          }
          if (!cancelado) actualizarItems(itemsBase);
        } else if (carritoLocal.length) {
          const ids = carritoLocal.map((item) => item.producto.id);
          const { data: productos, error: errorProductos } = await supabase
            .from("productos")
            .select("id, nombre, precio, precio_anterior, existencias, emoji, url_imagen, categorias(nombre, identificador_url)")
            .in("id", ids)
            .eq("activo", true)
            .gt("existencias", 0);
          if (errorProductos) throw errorProductos;
          const disponibles = new Map((productos ?? []).map((producto) => [producto.id, normalizarProducto(producto)]));
          const actuales = carritoLocal
            .map((item) => ({ producto: disponibles.get(item.producto.id), cantidad: item.cantidad }))
            .filter((item) => item.producto)
            .map((item) => ({ ...item, cantidad: Math.min(item.cantidad, item.producto.existencias) }));
          if (!cancelado) actualizarItems(actuales);
        }
      } catch (errorCarga) {
        if (!cancelado) setError(`No se pudo sincronizar el carrito: ${errorCarga.message}`);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarCarrito();
    return () => { cancelado = true; };
  }, [actualizarItems, obtenerCarritoId]);

  const agregar = useCallback(async (productoEntrada) => {
    const producto = normalizarProducto(productoEntrada);
    if (!producto || producto.existencias < 1) {
      setError("Este producto no tiene existencias disponibles.");
      return false;
    }
    const actuales = itemsRef.current;
    const existente = actuales.find((item) => item.producto.id === producto.id);
    const cantidad = (existente?.cantidad ?? 0) + 1;
    if (cantidad > producto.existencias) {
      setError(`Solo hay ${producto.existencias} unidades disponibles de ${producto.nombre}.`);
      return false;
    }
    const siguientes = existente
      ? actuales.map((item) => item.producto.id === producto.id ? { producto, cantidad } : item)
      : [...actuales, { producto, cantidad }];
    setError("");
    actualizarItems(siguientes);
    if (usuarioRef.current) {
      try {
        const carritoId = await obtenerCarritoId();
        const { error: errorGuardar } = await supabaseRef.current
          .from("articulos_carrito")
          .upsert({ id_carrito: carritoId, id_producto: producto.id, cantidad }, { onConflict: "id_carrito,id_producto" });
        if (errorGuardar) throw errorGuardar;
      } catch (errorGuardar) {
        setError(`El producto sigue visible en el carrito de esta sesión, pero no se guardó en Supabase: ${errorGuardar.message}`);
      }
    }
    return true;
  }, [actualizarItems, obtenerCarritoId]);

  const quitar = useCallback(async (productoId) => {
    const siguientes = itemsRef.current.filter((item) => item.producto.id !== productoId);
    setError("");
    actualizarItems(siguientes);
    if (usuarioRef.current && carritoRef.current) {
      const { error: errorEliminar } = await supabaseRef.current
        .from("articulos_carrito")
        .delete()
        .eq("id_carrito", carritoRef.current)
        .eq("id_producto", productoId);
      if (errorEliminar) setError(`No se pudo eliminar el producto en Supabase: ${errorEliminar.message}`);
    }
  }, [actualizarItems]);

  const cambiarCantidad = useCallback(async (productoId, cantidadSolicitada) => {
    const item = itemsRef.current.find((actual) => actual.producto.id === productoId);
    if (!item) return;
    const cantidad = Math.min(Number(cantidadSolicitada), item.producto.existencias);
    if (cantidad < 1) return quitar(productoId);
    const siguientes = itemsRef.current.map((actual) => actual.producto.id === productoId ? { ...actual, cantidad } : actual);
    setError("");
    actualizarItems(siguientes);
    if (usuarioRef.current) {
      try {
        const carritoId = await obtenerCarritoId();
        const { error: errorActualizar } = await supabaseRef.current
          .from("articulos_carrito")
          .update({ cantidad })
          .eq("id_carrito", carritoId)
          .eq("id_producto", productoId);
        if (errorActualizar) throw errorActualizar;
      } catch (errorActualizar) {
        setError(`No se pudo actualizar Supabase: ${errorActualizar.message}`);
      }
    }
  }, [actualizarItems, obtenerCarritoId, quitar]);

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);
  const subtotal = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);
  const valor = useMemo(() => ({
    items,
    cargando,
    error,
    cantidadTotal,
    subtotal,
    agregar,
    cambiarCantidad,
    quitar,
    limpiarError: () => setError(""),
  }), [items, cargando, error, cantidadTotal, subtotal, agregar, cambiarCantidad, quitar]);

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
  const contexto = useContext(CartContext);
  if (!contexto) throw new Error("useCart debe usarse dentro de CartProvider.");
  return contexto;
}
