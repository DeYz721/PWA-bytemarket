# ByteMarket - Componentes y PCs (PWA)

Proyecto de la asignatura **Programación de Aplicaciones Web Progresivas**, Universidad Tecnológica de Tabasco.

**Equipo 4**
- Aeryn Iztel Rodríguez García
- Jorge Emiliano Ruíz Díaz
- José Arturo Palomera Peralta

## Tecnologías

Next.js (App Router) · React · Tailwind CSS · JavaScript

## Cómo ejecutarlo

```bash
git clone https://github.com/DeYz721/PWA-bytemarket.git
cd PWA-bytemarket
npm install
npm run dev
```

Abrir http://localhost:3000

## Conexión con Supabase

Instala las dependencias con `npm install`, copia `.env.example` a `.env.local`
y completa la URL y la clave publicable desde el panel Connect de Supabase.
Para desplegar, configura esas mismas variables en el servicio de hosting.

Los clientes están en `src/lib/supabase/client.js` (navegador) y
`src/lib/supabase/server.js` (servidor). `src/proxy.js` renueva las sesiones
con cookies en Next.js 16. El archivo `.env.local` queda excluido de Git.

Ejemplo en un Server Component:

```js
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient();
const { data, error } = await supabase.from('productos').select('id, nombre, precio');
if (error) throw error;
```

## Carpetas

```
public/
└── icons/            Íconos de la PWA
src/
├── app/
│   ├── layout.js     App Shell
│   ├── page.js       Inicio
│   ├── catalogo/     Catálogo de componentes
│   ├── producto/     Detalle de producto
│   ├── ofertas/      Ofertas
│   ├── guias/        Guías de compatibilidad
│   ├── configurador/ Asistente de armado de PC
│   ├── carrito/      Carrito y pago
│   ├── perfil/       Perfil de usuario
│   └── admin/        Gestión de inventario
└── components/       Componentes reutilizables
```
