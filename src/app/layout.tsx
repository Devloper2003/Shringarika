import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/shringarika/ThemeProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHRINGARIKA | House of Shringarika — Luxury Bridal & Couture",
  description: "Draped in Dreams. Crafted for You. Luxury bridal wear, bespoke couture & ready-to-wear collections by House of Shringarika — where every woman becomes the story. Based in Jaipur, Rajasthan.",
  keywords: [
    "Shringarika", "luxury bridal wear", "bridal lehenga", "designer saree", "bespoke couture",
    "Jaipur fashion", "Rajasthan bridal", "custom bridal outfit", "Indian bridal designer",
    "wedding lehenga", "festive wear", "western fusion", "ready to wear", "bridal consultation",
    "House of Shringarika", "luxury fashion India", "couture atelier Jaipur"
  ],
  authors: [{ name: "House of Shringarika" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SHRINGARIKA | Luxury Bridal & Couture",
    description: "Draped in Dreams. Crafted for You. Luxury bridal wear, bespoke couture & ready-to-wear collections.",
    url: "https://shringarika.com",
    siteName: "House of Shringarika",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHRINGARIKA | Luxury Bridal & Couture",
    description: "Draped in Dreams. Crafted for You. Luxury bridal wear, bespoke couture & ready-to-wear collections.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${playfair.variable} ${dmSans.variable} antialiased bg-ivory text-noir font-sans cursor-gold`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
