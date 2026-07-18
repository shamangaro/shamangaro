import type { Metadata, Viewport } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "لوحة الإدارة",
  robots: { index: false, follow: false },
  manifest: "/admin/manifest.webmanifest",
  appleWebApp: {
    title: "SHAMANGARO CRM",
    statusBarStyle: "default",
  },
  icons: {
    apple: [
      {
        url: "/images/logo-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
