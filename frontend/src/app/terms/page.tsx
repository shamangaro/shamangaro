import Link from "next/link";
import {
  Handshake,
  Tag,
  ImageIcon,
  ShieldAlert,
  Scale,
  FileCheck,
} from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { businessInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";

const page = getLegalPage("/terms")!;

export const metadata = buildLegalMetadata("/terms");

export default function TermsPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Handshake} title="قبول الشروط">
        <p>
          بوضع طلب على موقع {businessInfo.name}، فإنك تقبل هذه الشروط
          و الأحكام و{" "}
          <Link
            href="/privacy"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          . إذا لم توافق، يرجى عدم إتمام الطلب.
        </p>
        <p>
          ننصحك بقراءة هذه الصفحة جيداً قبل تأكيد طلبك.
        </p>
      </LegalCard>

      <LegalCard icon={Tag} title="الأسعار">
        <p>
          الأسعار المعروضة بالدرهم المغربي (MAD). الثمن المعتمد هو
          اللي ظاهر على صفحة المنتج وقت الطلب، مع أي توصيل أو عرض
          مذكور هناك.
        </p>
        <p>
          قد تتغير الأسعار دون إشعار مسبق على الطلبات الجديدة. بعد
          وضع الطلب، السعر المؤكد معك عبر الهاتف أو واتساب قبل الشحن
          هو السعر المعتمد لطلبك.
        </p>
      </LegalCard>

      <LegalCard icon={ImageIcon} title="صور المنتج">
        <p>
          صور المنتجات على الموقع توضيحية. قد يظهر اختلاف طفيف في
          اللون أو الإضاءة حسب شاشتك.
        </p>
        <p>
          المنتج المسلّم هو المنتج المطلوب من {businessInfo.name}{" "}
          بالمواصفات المعلنة على صفحة المنتج وقت الطلب.
        </p>
      </LegalCard>

      <LegalCard icon={ShieldAlert} title="رفض أو إلغاء الطلب">
        <p>
          نحتفظ بحق رفض أو إلغاء أي طلب يحتوي على معلومات ناقصة أو
          خاطئة، أو يبدو احتيالياً، أو لا يمكن التواصل مع الزبون
          لتأكيده.
        </p>
      </LegalCard>

      <LegalCard icon={FileCheck} title="تأكيد الطلب">
        <p>
          الطلب يُعتبر نهائياً بعد التأكيد عبر الهاتف أو واتساب. يرجى
          التأكد من صحة الاسم، الهاتف، و العنوان أو المدينة قبل
          الإرسال.
        </p>
      </LegalCard>

      <LegalCard icon={Scale} title="المسؤولية و القانون المعمول به">
        <p>
          {businessInfo.name} تبذل جهدها لتقديم منتجات و خدمة ذات
          جودة. لا نتحمل مسؤولية التأخير الناتج عن ظروف قاهرة خارجة
          عن إرادتنا.
        </p>
        <p>
          تخضع هذه الشروط للقوانين المعمول بها في {businessInfo.country}.
          للشحن و الاسترجاع و الضمان، راجع{" "}
          <Link
            href="/shipping"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الشحن
          </Link>
          ،{" "}
          <Link
            href="/returns"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الاسترجاع
          </Link>
          ، و{" "}
          <Link
            href="/warranty"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الضمان
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
