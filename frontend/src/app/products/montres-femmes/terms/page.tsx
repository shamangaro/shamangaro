import Link from "next/link";
import { Handshake, Tag, ImageIcon, ShieldAlert, Scale, FileCheck } from "lucide-react";
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

const page = getWatchesArLegalPage("/products/montres-femmes/terms")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/terms"
);

export default function WatchesTermsPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Handshake} title="القبول">
        <p>
          ملي كتأكدي طلب ساعة من{" "}
          <Link
            href={WATCHES_AR_HOME}
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Montres Femmes
          </Link>
          ، كتقبلي هاد الشروط و{" "}
          <Link
            href="/products/montres-femmes/privacy"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Tag} title="الثمن">
        <p>
          ثمن الساعة{" "}
          <strong className="text-[#134A35]">
            {formatWatchPrice(WATCHES_PRODUCT.unitPrice)}
          </strong>
          . المجموع = {WATCHES_PRODUCT.unitPrice} × الكمية. التوصيل مجاني
          فالمغرب.
        </p>
        <p>
          الثمن اللي كنأكّدوه معاك بالتيليفون قبل الشحن هو الثمن
          المعمول به فالطلب.
        </p>
      </LegalCard>

      <LegalCard icon={ImageIcon} title="الصور">
        <p>
          صور الساعات توضيحية. لون خفيف يقدر يختلف حسب الشاشة. الموديل
          اللي كيوصل هو اللي مختاريه فالفورم.
        </p>
      </LegalCard>

      <LegalCard icon={ShieldAlert} title="الرفض أو الإلغاء">
        <p>
          نقدرو نرفضو طلب ناقص، خاطئ، مشتبه، أو إلا ما قدرناش نعيطو
          ليك باش نأكّدوه.
        </p>
      </LegalCard>

      <LegalCard icon={FileCheck} title="التأكيد">
        <p>
          الطلب كيولي نهائي من بعد التأكيد بالتيليفون أو واتساب.
          تأكدي من الاسم، الهاتف والمدينة قبل ما تصيفي الفورم.
        </p>
        <p>الدفع عند الاستلام — ما كاينش دفع أونلاين.</p>
      </LegalCard>

      <LegalCard icon={Scale} title="القانون المعمول به">
        <p>
          هاد الشروط كتنطبق على طلبات Montres Femmes ديال{" "}
          {businessInfo.name} فالمغرب.
        </p>
        <p>
          شوفي حتى{" "}
          <Link
            href="/products/montres-femmes/shipping"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الشحن
          </Link>
          ،{" "}
          <Link
            href="/products/montres-femmes/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الاسترجاع
          </Link>{" "}
          و{" "}
          <Link
            href="/products/montres-femmes/warranty"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الضمان
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
