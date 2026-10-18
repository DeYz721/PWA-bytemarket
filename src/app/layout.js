import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ByteMarket - Componentes y PCs",
  description:
    "Tienda en línea de hardware y asistente inteligente de compatibilidad para armar PCs.",
};

export const viewport = {
  themeColor: "#047857",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {/* ── Navbar ── */}
        <header className="sticky top-0 z-50 bg-emerald-700 text-white shadow-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold tracking-tight">
              🖥️ ByteMarket
            </Link>

            <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
              <li>
                <Link href="/catalogo" className="hover:text-emerald-200 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/configurador" className="hover:text-emerald-200 transition-colors">
                  Configurador
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="hover:text-emerald-200 transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-emerald-200 transition-colors">
                  Guías
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <Link
                href="/carrito"
                className="relative hover:text-emerald-200 transition-colors"
                aria-label="Carrito"
              >
                🛒
                <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                  0
                </span>
              </Link>
              <Link
                href="/perfil"
                className="hover:text-emerald-200 transition-colors"
                aria-label="Perfil"
              >
                👤
              </Link>
              <Link
                href="/admin"
                className="hidden md:inline-block rounded bg-emerald-900 px-3 py-1 text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                Admin
              </Link>
            </div>
          </nav>

          {/* ── Menú móvil simplificado ── */}
          <div className="flex md:hidden justify-around border-t border-emerald-600 py-2 text-xs font-medium">
            <Link href="/catalogo" className="hover:text-emerald-200">Catálogo</Link>
            <Link href="/configurador" className="hover:text-emerald-200">Configurador</Link>
            <Link href="/ofertas" className="hover:text-emerald-200">Ofertas</Link>
            <Link href="/guias" className="hover:text-emerald-200">Guías</Link>
            <Link href="/admin" className="hover:text-emerald-200">Admin</Link>
          </div>
        </header>

        {/* ── Contenido principal ── */}
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer className="bg-gray-900 text-gray-400 text-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">ByteMarket</h3>
              <p>Tu tienda de componentes y PCs con asistente de compatibilidad.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Enlaces</h3>
              <ul className="space-y-1">
                <li><Link href="/catalogo" className="hover:text-white">Catálogo</Link></li>
                <li><Link href="/configurador" className="hover:text-white">Configurador</Link></li>
                <li><Link href="/ofertas" className="hover:text-white">Ofertas</Link></li>
                <li><Link href="/guias" className="hover:text-white">Guías</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Mi cuenta</h3>
              <ul className="space-y-1">
                <li><Link href="/perfil" className="hover:text-white">Perfil</Link></li>
                <li><Link href="/carrito" className="hover:text-white">Carrito</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center py-4 text-xs">
            © 2026 ByteMarket. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
