import Link from "next/link";
import {
  MapPin,
  Clock,
  Wallet,
  PhoneCall,
  Package,
} from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { businessInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";

const page = getLegalPage("/shipping")!;

export const metadata = buildLegalMetadata("/shipping");

export default function ShippingPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={MapPin} title="التوصيل لجميع المغرب">
        <p>
          نوصل {businessInfo.product} إلى جميع مدن المملكة المغربية
          — الدار البيضاء، الرباط، مراكش، طنجة، أكادير، فاس، و
          باقي المدن.
        </p>
        <p>
          التوصيل <strong className="text-navy">مجاني</strong> — لا
          توجد رسوم إضافية على الشحن.
        </p>
      </LegalCard>

      <LegalCard icon={Clock} title="مدة التوصيل: 2 إلى 5 أيام عمل">
        <p>
          مدة التوصيل من{" "}
          <strong className="text-navy">2 إلى 5 أيام عمل</strong>{" "}
          حسب مدينتك. المدن الكبرى عادةً 2–3 أيام، و قد تصل
          المدة إلى 5 أيام في بعض المناطق.
        </p>
        <p>
          الأيام المذكورة أيام عمل (لا تشمل أيام الأحد و العطل
          الرسمية إن وقعت ضمن المدة).
        </p>
        <p>
          نتواصل معك عبر واتساب لتأكيد الطلب قبل إرساله إلى شركة
          التوصيل.
        </p>
      </LegalCard>

      <LegalCard icon={Wallet} title="الدفع عند الاستلام">
        <p>
          طريقة الدفع المعتمدة هي{" "}
          <strong className="text-navy">الدفع عند الاستلام</strong>.
          لا نطلب أي دفع مسبق — تدفع فقط عند استلام المنتج.
        </p>
      </LegalCard>

      <LegalCard icon={PhoneCall} title="الرد على مكالمة التوصيل">
        <p>
          شركة التوصيل ستتصل بك قبل الوصول. تأكد أن رقم الهاتف
          المدخل في الطلب صحيح و متاح.
        </p>
        <p>
          في حالة عدم الرد المتكرر، قد يتأخر التوصيل و{" "}
          {businessInfo.name} لا تتحمل مسؤولية التأخير الناتج عن
          ذلك.
        </p>
      </LegalCard>

      <LegalCard icon={Package} title="عند استلام الطرد">
        <p>
          افحص الطرد أمام الموزّع. إذا لاحظت تلفاً واضحاً في
          التغليف، يمكنك رفض الاستلام أو توثيق الحالة فوراً.
        </p>
        <p>
          في حالة منتج تالف أو معيب، تواصل معنا خلال 48 ساعة عبر{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>{" "}
          مع صور للمنتج و التغليف، كما هو موضح في{" "}
          <Link
            href="/returns"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الاسترجاع
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
