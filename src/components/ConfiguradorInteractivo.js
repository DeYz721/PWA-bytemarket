"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, CircleAlert, RotateCcw, ShoppingBag } from "lucide-react";
import { formatoPrecio } from "@/lib/formato";
import { ImagenProducto } from "@/components/ImagenProducto";
import { iconoCategoria } from "@/lib/iconosCategoria";

const slots = [
  { tipo: "cpu", label: "Procesador", icono: "procesadores", categorias: ["procesadores"] },
  { tipo: "motherboard", label: "Tarjeta madre", icono: "tarjetas-madre", categorias: ["tarjetas-madre", "motherboard"] },
  { tipo: "gpu", label: "Tarjeta gráfica", icono: "gpu", categorias: ["gpu", "tarjetas-graficas"] },
  { tipo: "ram", label: "Memoria RAM", icono: "ram", categorias: ["ram", "memorias-ram"] },
  { tipo: "storage", label: "Almacenamiento", icono: "almacenamiento", categorias: ["almacenamiento", "storage"] },
  { tipo: "psu", label: "Fuente de poder", icono: "fuentes", categorias: ["fuentes", "fuentes-de-poder", "psu"] },
  { tipo: "case", label: "Gabinete", icono: "gabinetes", categorias: ["gabinetes", "case"] },
];

function tipoDeProducto(producto) {
  const tipo = producto.compatibilidad?.component_type;
  if (slots.some((slot) => slot.tipo === tipo)) return tipo;
  return slots.find((slot) => slot.categorias.includes(producto.categorias?.identificador_url))?.tipo;
}

function valorDe(producto, clave) {
  const valor = producto?.compatibilidad?.[clave];
  if (Array.isArray(valor)) return valor.map(String);
  return valor == null || valor === "" ? [] : [String(valor)];
}

function revisarCompatibilidad(seleccion) {
  const problemas = [];
  const cpu = seleccion.cpu;
  const motherboard = seleccion.motherboard;
  const ram = seleccion.ram;
  const psu = seleccion.psu;
  const gpu = seleccion.gpu;
  const gabinete = seleccion.case;

  const socketCpu = valorDe(cpu, "socket");
  const socketMotherboard = valorDe(motherboard, "socket");
  if (socketCpu.length && socketMotherboard.length && !socketCpu.some((socket) => socketMotherboard.includes(socket))) {
    problemas.push(`El socket del procesador (${socketCpu.join(", ")}) no coincide con el de la tarjeta madre (${socketMotherboard.join(", ")}).`);
  }

  const tipoRam = valorDe(ram, "memory_type");
  const tipoRamMotherboard = [...valorDe(motherboard, "memory_type"), ...valorDe(motherboard, "memory_types")];
  if (tipoRam.length && tipoRamMotherboard.length && !tipoRam.some((tipo) => tipoRamMotherboard.includes(tipo))) {
    problemas.push(`El tipo de memoria RAM (${tipoRam.join(", ")}) no coincide con la tarjeta madre.`);
  }

  const formatoMotherboard = [...valorDe(motherboard, "form_factor"), ...valorDe(motherboard, "motherboard_form_factor")];
  const formatosGabinete = valorDe(gabinete, "motherboard_form_factors");
  if (formatoMotherboard.length && formatosGabinete.length && !formatoMotherboard.some((formato) => formatosGabinete.includes(formato))) {
    problemas.push("El formato de la tarjeta madre no está contemplado por el gabinete.");
  }

  const potenciaFuente = Number(valorDe(psu, "wattage")[0]);
  const consumoEstimado = Number(valorDe(cpu, "tdp_watts")[0] || 0) + Number(valorDe(gpu, "tdp_watts")[0] || 0) + 100;
  if (psu && potenciaFuente && (cpu || gpu) && consumoEstimado > potenciaFuente) {
    problemas.push(`La fuente (${potenciaFuente} W) podría ser insuficiente para el consumo estimado de ${consumoEstimado} W.`);
  }

  return problemas;
}

export function ConfiguradorInteractivo({ productos }) {
  const [seleccion, setSeleccion] = useState({});
  const productosPorTipo = useMemo(() => {
    const porTipo = Object.fromEntries(slots.map(({ tipo }) => [tipo, []]));
    for (const producto of productos) {
      const tipo = tipoDeProducto(producto);
      if (tipo && porTipo[tipo]) porTipo[tipo].push(producto);
    }
    return porTipo;
  }, [productos]);

  const cantidad = Object.keys(seleccion).length;
  const total = Object.values(seleccion).reduce((suma, producto) => suma + Number(producto.precio), 0);
  const problemas = revisarCompatibilidad(seleccion);
  const porcentaje = Math.round((cantidad / slots.length) * 100);

  function cambiarSeleccion(tipo, id) {
    const producto = (productosPorTipo[tipo] ?? []).find((opcion) => opcion.id === id);
    setSeleccion((actual) => {
      const nueva = { ...actual };
      if (producto) nueva[tipo] = producto;
      else delete nueva[tipo];
      return nueva;
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {slots.map((slot, indice) => {
          const opciones = productosPorTipo[slot.tipo] ?? [];
          const producto = seleccion[slot.tipo];
          const IconoCategoria = iconoCategoria(slot.icono);
          return (
            <section key={slot.tipo} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-emerald-700 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-emerald-400">
                  {producto ? (
                    <ImagenProducto producto={producto} sizes="48px" className="p-1">
                      <IconoCategoria size={26} strokeWidth={1.7} />
                    </ImagenProducto>
                  ) : (
                    <IconoCategoria size={26} strokeWidth={1.7} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold tracking-wide text-emerald-400">PIEZA {String(indice + 1).padStart(2, "0")}</span>
                    <span className="text-xs text-zinc-500">{opciones.length} disponibles</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">{slot.label}</h3>
                  <select
                    aria-label={`Elegir ${slot.label}`}
                    value={producto?.id ?? ""}
                    onChange={(evento) => cambiarSeleccion(slot.tipo, evento.target.value)}
                    className="mt-3 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-500 sm:max-w-xl"
                  >
                    <option value="">{opciones.length ? `Seleccionar ${slot.label.toLowerCase()}` : "No hay productos disponibles en esta categoría"}</option>
                    {opciones.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.nombre} — {formatoPrecio.format(opcion.precio)}
                      </option>
                    ))}
                  </select>
                  {producto && (
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-zinc-400">{producto.existencias} en existencia · {producto.nombre}</p>
                      <Link href={`/producto?id=${producto.id}`} className="text-sm font-medium text-emerald-400 hover:text-emerald-300">Ver detalle</Link>
                    </div>
                  )}
                </div>
                {producto && <Check aria-label="Seleccionado" size={20} className="mt-1 shrink-0 text-emerald-400" />}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Resumen del equipo</h2>
          <button type="button" onClick={() => setSeleccion({})} disabled={!cantidad} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            <RotateCcw size={14} /> Limpiar
          </button>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm text-zinc-400">
            <span>{cantidad} de {slots.length} piezas</span><span>{porcentaje}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>

        <div className={`mt-5 rounded-xl border p-4 text-sm ${problemas.length ? "border-amber-900 bg-amber-950/40 text-amber-200" : "border-emerald-900 bg-emerald-950/40 text-emerald-200"}`}>
          <p className="flex items-center gap-2 font-semibold">
            {problemas.length ? <CircleAlert size={17} /> : <Check size={17} />}
            {problemas.length ? "Revisa la compatibilidad" : cantidad ? "Sin conflictos detectados" : "Listo para comenzar"}
          </p>
          {problemas.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed">{problemas.map((problema) => <li key={problema}>{problema}</li>)}</ul>
          ) : (
            <p className="mt-1 text-xs leading-relaxed opacity-80">
              {cantidad ? "La revisión usa los datos de compatibilidad registrados para los componentes." : "Selecciona tus componentes para ver el total y revisar sus datos de compatibilidad."}
            </p>
          )}
        </div>

        <div className="mt-5 space-y-2 border-t border-zinc-800 pt-4">
          {Object.entries(seleccion).map(([tipo, producto]) => (
            <div key={tipo} className="flex justify-between gap-3 text-sm">
              <span className="truncate text-zinc-400">{producto.nombre}</span>
              <span className="shrink-0 text-zinc-200">{formatoPrecio.format(producto.precio)}</span>
            </div>
          ))}
          {!cantidad && <p className="text-sm text-zinc-500">Aún no has elegido componentes.</p>}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
          <span className="font-semibold">Total estimado</span>
          <span className="text-xl font-extrabold text-emerald-400">{formatoPrecio.format(total)}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">El total se calcula con los precios actuales del catálogo; el resumen todavía no se guarda como pedido.</p>
        <Link href="/catalogo" className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600">
          <ShoppingBag size={18} /> Seguir explorando
        </Link>
      </aside>
    </div>
  );
}
