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
import {
  businessInfo,
  getLegalPage,
  productPageConditionsNotice,
} from "@/config/legal";
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
      <LegalCard icon={MapPin} title="التوصيل داخل المغرب">
        <p>
          نوصل طلبات {businessInfo.name} إلى مدن المملكة المغربية —
          الدار البيضاء، الرباط، مراكش، طنجة، أكادير، فاس، و باقي
          المدن المعروضة عند الطلب.
        </p>
        <p>{productPageConditionsNotice}</p>
        <p>
          إذا كانت صفحة المنتج تعلن توصيلاً مجانياً، لا تُضاف رسوم
          شحن زيادة على الثمن الظاهر هناك.
        </p>
      </LegalCard>

      <LegalCard icon={Clock} title="مدة التوصيل">
        <p>
          مدة التوصيل تختلف حسب المنتج و المدينة. المدة المعتمدة
          هي اللي ظاهرة على صفحة المنتج وقت الطلب — مثلاً بعض
          المنتجات تُعلن 1 إلى 3 أيام عمل، و أخرى 2 إلى 5 أيام عمل.
        </p>
        <p>
          الأيام المذكورة أيام عمل (لا تشمل أيام الأحد و العطل
          الرسمية إن وقعت ضمن المدة)، إلا إذا ذُكر غير ذلك على صفحة
          المنتج.
        </p>
        <p>
          نتواصل معك عبر الهاتف أو واتساب لتأكيد الطلب قبل إرساله
          إلى شركة التوصيل.
        </p>
      </LegalCard>

      <LegalCard icon={Wallet} title="الدفع عند الاستلام">
        <p>
          طريقة الدفع المعتمدة على الموقع هي{" "}
          <strong className="text-navy">الدفع عند الاستلام</strong>،
          إلا إذا ظهر على صفحة المنتج وقت الطلب طريقة أخرى. لا نطلب
          دفعاً مسبقاً عبر الموقع في مسار الطلب الحالي.
        </p>
      </LegalCard>

      <LegalCard icon={PhoneCall} title="الرد على مكالمة التوصيل">
        <p>
          شركة التوصيل قد تتصل بك قبل الوصول. تأكد أن رقم الهاتف
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
          افحص الطرد أمام الموزّع إن أمكن. إذا لاحظت تلفاً واضحاً في
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
