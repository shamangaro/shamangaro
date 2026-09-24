import Link from "next/link";
import { MapPin, Clock, Wallet, PhoneCall, Package } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesArLegalPage } from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";

const page = getWatchesArLegalPage("/products/montres-femmes/shipping")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/shipping"
);

export default function WatchesShippingPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={MapPin} title="توصيل مجاني فالمغرب">
        <p>
          طلبات Montres Femmes كتوصل لجميع مدن المغرب: الدار البيضاء،
          الرباط، مراكش، طنجة، أكادير، فاس والمدن الأخرى اللي فالطلب.
        </p>
        <p>ما كاينش مصاريف توصيل زيادة على ثمن الساعة فالصفحة.</p>
      </LegalCard>

      <LegalCard icon={Clock} title="المدة">
        <p>
          المدة المعلنة:{" "}
          <strong className="text-[#134A35]">من 1 حتى 3 أيام عمل</strong>{" "}
          (ما عدا الأحد والعطل).
        </p>
        <p>كنعيطو ليك باش نأكدو الطلب قبل ما نسلّموه لشركة التوصيل.</p>
      </LegalCard>

      <LegalCard icon={Wallet} title="الدفع عند الاستلام">
        <p>
          كتخّلصي ملي توصلك الساعة (كاش أو كارت حسب الموصّل). ما كاينش
          دفع أونلاين باش تطلبي الساعة.
        </p>
      </LegalCard>

      <LegalCard icon={PhoneCall} title="مكالمة الموصّل">
        <p>
          الموصّل يقدر يعيط ليك قبل ما يوصل. دخّلي رقم كيردّ. إلا ما
          ردّيتيش بزاف، التوصيل يقدر يتأخر. {businessInfo.name} ما
          مسؤولةش على هاد التأخير.
        </p>
      </LegalCard>

      <LegalCard icon={Package} title="عند الاستلام">
        <p>
          شوفي الطرد إلا قدرت. إلا بان كسر، رفضيه أو صوّريه دغيا، ومن
          بعد تواصلي معانا فـ 48 ساعة عبر{" "}
          <Link
            href="/products/montres-femmes/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>
          . التفاصيل:{" "}
          <Link
            href="/products/montres-femmes/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الاسترجاع والاستبدال
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
