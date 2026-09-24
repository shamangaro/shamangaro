import Link from "next/link";
import {
  AlertTriangle,
  PackageX,
  RefreshCw,
  Truck,
  MessageCircle,
} from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesArLegalPage } from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";

const page = getWatchesArLegalPage("/products/montres-femmes/returns")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/returns"
);

export default function WatchesReturnsPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={AlertTriangle} title="ساعة مكسورة أو فيها عيب">
        <p>
          إلا وصلاتك الساعة مكسورة، معطّلة أو باين فيها العيب، تواصلي
          معانا فـ{" "}
          <strong className="text-[#134A35]">48 ساعة</strong> من
          الاستلام، مع صور للساعة وللعلبة.
        </p>
      </LegalCard>

      <LegalCard icon={RefreshCw} title="تبديل اللون">
        <p>
          تبديل اللون أو الموديل ممكن من بعد الاستلام: عيطي لينا أو
          كتبي لينا. غادي ننظّمو التبديل حسب التوفر.
        </p>
      </LegalCard>

      <LegalCard icon={PackageX} title="تغيير الرأي">
        <p>
          للاسترجاع بلا عيب، الساعة خاص تكون ما تلبساتش، فحالتها
          الأصلية، مع العلبة إلا قدرت.
        </p>
        <p>الأضرار بسبب الاستعمال الغالط ما كتقبلش.</p>
      </LegalCard>

      <LegalCard icon={Truck} title="مصاريف الإرجاع">
        <p>
          عيب أو كسر من جهتنا:{" "}
          <strong className="text-[#134A35]">
            {businessInfo.name} كاتتحمّل
          </strong>{" "}
          الإرجاع.
        </p>
        <p>
          إرجاع غير حيت بدّلتي الرأي: مصاريف الإرسال على حسابك، إلا إذا
          كان اتفاق آخر.
        </p>
      </LegalCard>

      <LegalCard icon={MessageCircle} title="كيفاش تواصلي">
        <p>
          <Link
            href="/products/montres-femmes/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>{" "}
          أو واتساب. إلا بان العيب من بعد، شوفي حتى{" "}
          <Link
            href="/products/montres-femmes/warranty"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            سياسة الضمان
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
