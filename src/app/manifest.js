export default function manifest() {
  return {
    name: "ByteMarket - Componentes y PCs",
    short_name: "ByteMarket",
    description:
      "Tienda en línea de hardware y asistente inteligente de compatibilidad para armar PCs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#047857",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
