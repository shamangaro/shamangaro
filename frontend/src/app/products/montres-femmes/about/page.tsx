import Link from "next/link";
import { Heart, Sparkles, Gem, Users, Watch } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { businessInfo } from "@/config/legal";
import {
  getWatchesArLegalPage,
  WATCHES_AR_HOME,
} from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";
import { WATCHES_PRODUCT, formatWatchPrice } from "@/components/montres-femmes/config";

const page = getWatchesArLegalPage("/products/montres-femmes/about")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/about"
);

export default function WatchesAboutPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Sparkles} title="SHAMANGARO Montres Femmes">
        <p>
          هاد الصفحة خاصة غير بـ{" "}
          <strong className="text-[#134A35]">Montres Femmes</strong> —
          ساعات نسائية كتعرضها {businessInfo.name} فالمغرب. ماشي صفحة
          منتجات أخرى.
        </p>
        <p>
          الثمن: {formatWatchPrice(WATCHES_PRODUCT.unitPrice)} للساعة، توصيل
          مجاني، الدفع عند الاستلام.
        </p>
      </LegalCard>

      <LegalCard icon={Watch} title="كيفاش تطلبي">
        <p>
          كختاري الموديل فصفحة Montres Femmes، وكتدخلي الاسم، الهاتف
          والمدينة. كنتاصلو بك باش نأكدو الطلب قبل الشحن.
        </p>
      </LegalCard>

      <LegalCard icon={Gem} title="الصور والجودة">
        <p>
          صور الكتالوغ وصور الحياة اليومية (على المعصم، التفاصيل،
          العلبة) كتوضح الساعة. لون خفيف يقدر يختلف حسب الشاشة.
        </p>
      </LegalCard>

      <LegalCard icon={Users} title="شراء بسيط">
        <p>
          ما كاينش دفع أونلاين. كتخّلصي ملي توصلك. تبديل اللون ممكن
          من بعد الاستلام، غير عيطي لينا.
        </p>
        <p>
          سؤال؟{" "}
          <Link
            href="/products/montres-femmes/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            تواصلي معانا
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Heart} title="الطلب">
        <p>
          <Link
            href={WATCHES_AR_HOME}
            className="inline-flex rounded-full bg-[#134A35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0A2F23]"
          >
            رجعي لـ Montres Femmes
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
