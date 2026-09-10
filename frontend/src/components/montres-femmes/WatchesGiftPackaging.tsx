import Image from "next/image";
import { Container } from "@/components/shared/Container";

export function WatchesGiftPackaging() {
  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F7F3EE] py-10 sm:py-14">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src="/images/montres-femmes/gallery-packaging.svg"
              alt="تغليف هدايا زوين"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-[#1A684A]/15 px-3 py-1 text-xs font-medium text-[#1A684A]">
              جاهزة باش تهادّي
            </span>
            <h2 className="text-2xl font-bold text-[#0F2A1F] sm:text-3xl">
              تغليف هدايا زوين
            </h2>
            <p className="leading-relaxed text-[#4A5C52]">
              كل ساعة كتوصل فعلبة أنيقة — مزيانة للهدية لأمك، أختك، صاحبتك، ولا
              لراسك. بلا ما تزيدي والو على التغليف.
            </p>
            <ul className="space-y-2 text-sm text-[#666]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#134A35]" />
                علبة راقية بألوان دافية
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1A684A]" />
                جاهزة باش تهدّيها مباشرة
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#134A35]" />
                مناسبة لأي مناسبة
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
