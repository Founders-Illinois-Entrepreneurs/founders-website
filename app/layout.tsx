import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EasterEgg from "@/components/EasterEgg";
import { site } from "@/content/site";

const bebas = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Founders | Illinois Entrepreneurs",
    template: "%s | Founders",
  },
  description:
    "Founders is the student entrepreneurship organization at the University of Illinois Urbana-Champaign. Every major, every year, every stage of building.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico?v=2", sizes: "any" },
      { url: "/images/favicon/favicon-32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/images/favicon/favicon-16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    apple: "/images/favicon/apple-touch-icon.png?v=2",
  },
  // Link preview card (iMessage, Slack, LinkedIn, Discord...). Image: public/images/og.jpg, 1200x630.
  openGraph: {
    title: "Founders | Illinois Entrepreneurs",
    description: "The student entrepreneurship organization at the University of Illinois Urbana-Champaign.",
    url: `https://${site.domain}`,
    siteName: "Founders",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Founders: Illinois Entrepreneurs logo" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders | Illinois Entrepreneurs",
    description: "The student entrepreneurship organization at the University of Illinois Urbana-Champaign.",
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <EasterEgg />
      </body>
    </html>
  );
}
