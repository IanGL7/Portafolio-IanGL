import type { Metadata, Viewport } from "next";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portafolio-ian-gl.vercel.app"),
  title: "Ian González | Desarrollo web",
  description:
    "Portafolio de Ian González: desarrollo web, interfaces con React y Next.js, habilidades y proyectos con código disponible en GitHub.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ian González | Desarrollo web",
    description: "Interfaces, aplicaciones y proyectos de desarrollo web.",
    url: "/",
    siteName: "IanGL",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ian González | Desarrollo web",
    description: "Explora mis habilidades y proyectos web.",
  },
};
export const viewport: Viewport = {
  themeColor: "#050b09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
