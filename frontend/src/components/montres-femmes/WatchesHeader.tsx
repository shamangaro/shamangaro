import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/Container";

export function WatchesHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD4] bg-[#FAF7F2]/95 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between sm:h-16">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#7B2D42]">
          <span aria-hidden>←</span>
          <span>SHAMANGARO</span>
        </Link>
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-icon.png"
            alt="SHAMANGARO"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="hidden text-sm font-medium text-[#7B2D42] sm:inline">
            Montres Femmes
          </span>
        </div>
        <a
          href="#watches-selection"
          className="rounded-full bg-[#7B2D42] px-4 py-2 text-xs font-medium text-white sm:text-sm"
        >
          طلبي دابا
        </a>
      </Container>
    </header>
  );
}
