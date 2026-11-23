import { Cpu, Monitor, MemoryStick, HardDrive, Zap, PcCase, CircuitBoard, Package } from "lucide-react";

// Ícono de Lucide para cada categoría, según su identificador_url en Supabase
const iconos = {
  procesadores: Cpu,
  gpu: Monitor,
  ram: MemoryStick,
  almacenamiento: HardDrive,
  fuentes: Zap,
  gabinetes: PcCase,
  "tarjetas-madre": CircuitBoard,
};

export function iconoCategoria(identificador) {
  return iconos[identificador] ?? Package;
}
