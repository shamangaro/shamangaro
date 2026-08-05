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
              alt="تغليف هدايا أنيق"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-[#B8924A]/15 px-3 py-1 text-xs font-medium text-[#B8924A]">
              جاهزة للإهداء
            </span>
            <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
              تغليف هدايا أنيق
            </h2>
            <p className="leading-relaxed text-[#5C4A52]">
              كل ساعة كتوصل في علبة أنيقة — مثالية للهدية لأمك، أختك، صديقتك، أو
              لنفسك. بدون أي تكلفة إضافية على التغليف.
            </p>
            <ul className="space-y-2 text-sm text-[#666]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B2D42]" />
                علبة فاخرة بألوان دافئة
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B2D42]" />
                جاهزة للإهداء مباشرة
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B2D42]" />
                مناسبة لكل المناسبات
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
