import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import AmbientAudio from "../components/AmbientAudio";
import FloatingParticles from "../components/FloatingParticles";

export const metadata: Metadata = {
  title: "The Thesis Museum • Exhibition of Honor",
  description:
    "Arsip digital dan pameran kehormatan momen sidang skripsi untuk Amanda, Naila, Febianna, Hilman, dan Faisal. Menjaga kenangan, emosi, dan persahabatan seumur hidup.",
  keywords: [
    "The Thesis Museum",
    "Thesis Museum",
    "Sidang Skripsi",
    "Graduation Archive",
    "Exhibition of Honor",
    "Amanda",
    "Naila",
    "Febianna",
    "Hilman",
    "Faisal",
  ],
  authors: [{ name: "The Thesis Museum Team" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "The Thesis Museum • Exhibition of Honor",
    description:
      "Arsip digital sinematik momen perjuangan dan kenangan manis sidang skripsi lima sahabat.",
    siteName: "The Thesis Museum",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Thesis Museum • Exhibition of Honor",
    description:
      "Arsip digital sinematik momen perjuangan dan kenangan manis sidang skripsi lima sahabat.",
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#090909] text-white antialiased selection:bg-[#D4AF37] selection:text-black">
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <FloatingParticles />
          {children}
          <AmbientAudio />
        </LenisProvider>
      </body>
    </html>
  );
}
