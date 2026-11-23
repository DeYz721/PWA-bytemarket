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

Requisito: Node.js 20.9 o superior. No hace falta configurar nada más: la
conexión a la base de datos ya viene incluida en el archivo `.env`.

## Conexión con Supabase

La URL del proyecto y la clave **publicable** están en `.env`, que sí se sube
al repositorio. Esa clave está pensada para usarse en el navegador; la
seguridad de los datos la dan las reglas RLS de cada tabla en Supabase.
Nunca se suben la clave secret / service_role ni la contraseña de la base de datos.

Si quieres usar otro proyecto de Supabase en tu computadora, crea `.env.local`
(a partir de `.env.example`); tiene prioridad sobre `.env` y no se sube a Git.

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

## Panel de administración

Entra en http://localhost:3000/admin con una cuenta de administrador. Desde ahí se
pueden crear, editar y borrar productos, categorías, promociones y guías; los
cambios se ven de inmediato en la tienda.

Las cuentas de administrador se crean en Supabase (Authentication → Users → Add
user) y se les asigna `rol = 'admin'` en la tabla `perfiles`. Solo esas cuentas
pueden entrar al panel; la seguridad la aplican también las reglas RLS de la base
de datos.

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
