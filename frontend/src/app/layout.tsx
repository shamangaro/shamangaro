import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "@/styles/globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shamangaro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SHAMANGARO | Neo Transat — كرسي الإسترخاء Premium فالمغرب",
    template: "%s | SHAMANGARO",
  },
  description:
    "Neo Transat من SHAMANGARO — كرسي الإسترخاء الخفيف والأنيق. مثالي للبحر، المسبح، الكامبينغ والتراس. إبتداءً من 229 MAD. توصيل لجميع المدن المغربية — الدفع عند الإستلام.",
  keywords: [
    "SHAMANGARO",
    "Neo Transat",
    "transat Maroc",
    "كرسي بحر المغرب",
    "كرسي إسترخاء",
    "transat premium Maroc",
    "chaise longue Maroc",
    "camping Maroc",
    "mobilier outdoor Maroc",
    "transat plage",
    "كرسي شاطئ",
  ],
  authors: [{ name: "SHAMANGARO" }],
  openGraph: {
    type: "website",
    locale: "ar_MA",
    alternateLocale: "fr_MA",
    siteName: "SHAMANGARO",
    title: "SHAMANGARO | Neo Transat — إبتداءً من 229 MAD",
    description:
      "كرسي الإسترخاء Premium — خفيف، أنيق، و متين. توصيل لجميع المدن المغربية. الدفع عند الإستلام.",
    images: [{ url: "/images/neo-transat-open.png", width: 600, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAMANGARO | Neo Transat — إبتداءً من 229 MAD",
    description:
      "كرسي الإسترخاء Premium — خفيف، أنيق، و متين. توصيل لجميع المدن المغربية.",
    images: ["/images/neo-transat-open.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/images/logo-icon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/images/logo-icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      {
        url: "/images/logo-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${tajawal.variable} font-sans antialiased selection:bg-gold/20 selection:text-navy`}
      >
        {children}
      </body>
    </html>
  );
}
