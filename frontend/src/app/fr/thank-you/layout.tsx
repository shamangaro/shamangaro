import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci pour votre commande",
  robots: { index: false, follow: false },
};

export default function FrenchThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
