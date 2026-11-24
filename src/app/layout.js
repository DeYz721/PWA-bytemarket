
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { LogIn } from "lucide-react";
import { MenuUsuario } from "@/components/MenuUsuario";
import { CartProvider } from "@/components/carrito/CartProvider";
import { CartBadge } from "@/components/carrito/CartBadge";
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
  themeColor: "#2ba25b81",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <CartProvider>

        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-emerald-700 text-white shadow-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

            {/* Logo y nombre */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_b.png"
                alt="Logo ByteMarket"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="text-xl font-bold tracking-tight">
                ByteMarket
              </span>
            </Link>

            {/* Navegación de escritorio */}
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

            {/* Íconos de usuario */}
            <div className="flex items-center gap-5">

              <CartBadge />

              <Suspense fallback={<LogIn size={19} strokeWidth={1.8} className="opacity-50" />}>
                <MenuUsuario />
              </Suspense>

            </div>
          </nav>

          {/* Menú móvil */}
          <div className="flex md:hidden justify-around border-t border-emerald-600 py-3 text-xs font-medium">
            <Link href="/catalogo" className="hover:text-emerald-200">Catálogo</Link>
            <Link href="/configurador" className="hover:text-emerald-200">Configurador</Link>
            <Link href="/ofertas" className="hover:text-emerald-200">Ofertas</Link>
            <Link href="/guias" className="hover:text-emerald-200">Guías</Link>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
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
            © 2026 ByteMarket.
          </div>
        </footer>
        </CartProvider>

      </body>
    </html>
  );
}
