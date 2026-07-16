import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "سلة التسوق | SHAMANGARO",
  description: "راجع منتجات Neo Transat في سلة التسوق وأكمل طلبك بسهولة.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <CartPageContent />
      <Footer />
    </>
  );
}
