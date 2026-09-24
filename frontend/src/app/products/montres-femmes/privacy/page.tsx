import Link from "next/link";
import { Lock, Eye, Database, Ban, UserCheck, Scale } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesArLegalPage } from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";

const page = getWatchesArLegalPage("/products/montres-femmes/privacy")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/privacy"
);

export default function WatchesPrivacyPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={UserCheck} title="شنو كنجمعو">
        <p>
          ملي كتطلبي ساعة من صفحة Montres Femmes، كنجمعو الاسم، رقم
          الهاتف، المدينة، الموديل والكمية.
        </p>
        <p>
          هاد المعلومات غير باش نأكدو الطلب، نعيطو ليك، نوصلو الساعة،
          ونديرو خدمة ما بعد البيع.
        </p>
      </LegalCard>

      <LegalCard icon={Lock} title="الهاتف والعنوان">
        <p>
          الرقم والمدينة سريّين. كنمرّروهم غير لشركة التوصيل اللي
          غادي توصل الساعة.
        </p>
        <p>ما كنبيعوش بياناتك لشركات إشهار.</p>
      </LegalCard>

      <LegalCard icon={Ban} title="ما كاينش بيع للبيانات">
        <p>
          {businessInfo.name} Montres Femmes ما كتبيعش بيانات الزبناء.
          كتستعمل غير فإطار طلب الساعة ديالك.
        </p>
      </LegalCard>

      <LegalCard icon={Database} title="التخزين">
        <p>
          الوصول للبيانات محدود للناس اللي كيعالجو طلبات الساعات،
          حسب القانون المغربي لحماية المعطيات الشخصية.
        </p>
        <p>
          لطلب الحذف، راسلينا من{" "}
          <Link
            href="/products/montres-femmes/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Eye} title="الكوكيز">
        <p>
          الموقع يقدر يستعمل كوكيز تقنية و أدوات قياس (بحال Meta
          Pixel) لتتبع طلبات Montres Femmes. ما كنجمعوش بيانات بنكية:
          الدفع عند الاستلام.
        </p>
      </LegalCard>

      <LegalCard icon={Scale} title="حقوقك">
        <p>
          تقدر تطلبي الاطلاع، التصحيح أو الحذف، إلا إذا كان الطلب مازال
          كيتنفّذ.
        </p>
        <p>
          شوفي حتى{" "}
          <Link
            href="/products/montres-femmes/terms"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الشروط والأحكام
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
