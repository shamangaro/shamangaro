import Link from "next/link";
import { Container } from "@/components/shared/Container";

export function WatchesFooter() {
  return (
    <footer className="border-t border-[#E8DFD4] bg-[#2A1A1F] py-8 text-white/80">
      <Container className="text-center text-sm">
        <p className="font-medium text-white">SHAMANGARO · Montres Femmes Élégantes</p>
        <p className="mt-2 text-xs text-white/60">
          245 DH · توصيل مجاني · الدفع عند الاستلام · التبديل متاح
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-xs text-[#B8924A] hover:underline"
        >
          العودة إلى Neo Transat
        </Link>
      </Container>
    </footer>
  );
}
