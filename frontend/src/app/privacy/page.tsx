import Link from "next/link";
import {
  Lock,
  Eye,
  Database,
  Ban,
  UserCheck,
  Scale,
} from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { businessInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";

const page = getLegalPage("/privacy")!;

export const metadata = buildLegalMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={UserCheck} title="المعلومات التي نجمعها">
        <p>
          عند طلب {businessInfo.product} عبر موقع {businessInfo.name}،
          نجمع فقط المعلومات الضرورية لإتمام الطلب: الاسم الكامل، رقم
          الهاتف، و العنوان الكامل للتوصيل.
        </p>
        <p>
          نستعمل هذه المعلومات حصرياً لتأكيد الطلب، التواصل معك، و
          توصيل المنتج — لا نستعملها لأغراض أخرى.
        </p>
      </LegalCard>

      <LegalCard icon={Lock} title="سرية الهاتف و العنوان">
        <p>
          رقم هاتفك و عنوانك معلومات سرّية. لا نشاركهما مع أي طرف
          ثالث إلا شركة التوصيل المكلفة بإيصال طلبك.
        </p>
        <p>
          لا نبيع و لا نؤجر و لا نشارك بياناتك مع جهات إعلانية أو
          تجارية.
        </p>
      </LegalCard>

      <LegalCard icon={Ban} title="لا بيع للبيانات">
        <p>
          {businessInfo.name} لا تبيع بيانات الزبناء. معلوماتك تبقى
          لدينا و تُستعمل فقط في إطار علاقتنا التجارية معك.
        </p>
      </LegalCard>

      <LegalCard icon={Database} title="حماية و تخزين البيانات">
        <p>
          نحتفظ بمعلوماتك بشكل آمن و نحدد الوصول إليها على الأشخاص
          الذين يحتاجونها لمعالجة طلبك.
        </p>
        <p>
          نلتزم بمقتضيات التشريع المغربي المتعلق بحماية المعطيات ذات
          الطابع الشخصي.
        </p>
        <p>
          لطلب حذف معلوماتك، راسلنا عبر{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            صفحة اتصل بنا
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Eye} title="ملفات تعريف الارتباط (Cookies)">
        <p>
          الموقع قد يستعمل cookies تقنية بسيطة لتحسين الأداء و تجربة
          التصفح. لا نجمع معلومات حساسة عبر cookies.
        </p>
      </LegalCard>

      <LegalCard icon={Scale} title="حقوقك">
        <p>
          يمكنك في أي وقت طلب الاطلاع على معلوماتك أو تصحيحها أو
          حذفها، ما دام ذلك لا يمنع تنفيذ طلب قيد المعالجة.
        </p>
        <p>
          للمزيد حول شروط الاستخدام، راجع{" "}
          <Link
            href="/terms"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            الشروط و الأحكام
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
