import Link from "next/link";
import {
  AlertTriangle,
  PackageX,
  RefreshCw,
  Truck,
  MessageCircle,
} from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { businessInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";

const page = getLegalPage("/returns")!;

export const metadata = buildLegalMetadata("/returns");

export default function ReturnsPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={AlertTriangle} title="منتج تالف أو معيب">
        <p>
          إذا وصلك {businessInfo.product} و كان فيه عيب في الصنع،
          كسر، أو تلف واضح، تواصل معنا خلال{" "}
          <strong className="text-navy">48 ساعة</strong> من تاريخ
          الاستلام.
        </p>
        <p>
          أرسل لنا صوراً و فيديو للمنتج و التغليف عبر واتساب لنتحقق
          من الحالة قبل اتخاذ أي قرار.
        </p>
      </LegalCard>

      <LegalCard icon={PackageX} title="حالة المنتج عند الإرجاع">
        <p>
          لقبول الاسترجاع أو الاستبدال، يجب أن يكون المنتج{" "}
          <strong className="text-navy">غير مستعمل</strong> و في
          حالته الأصلية مع التغليف إن أمكن.
        </p>
        <p>
          لا نقبل المنتجات المستعملة أو التالفة بسبب سوء
          الاستخدام من طرف الزبون.
        </p>
      </LegalCard>

      <LegalCard icon={RefreshCw} title="استبدال أو استرجاع">
        <p>بعد التحقق من المشكل، قد نعرض عليك:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>استبدال المنتج بآخر جديد</li>
          <li>أو استرجاع المبلغ — حسب الحالة و طبيعة العيب</li>
        </ul>
        <p>
          القرار النهائي يتخذ من طرف فريق {businessInfo.name} بعد
          مراجعة الأدلة المرسلة (صور، فيديو، وصف).
        </p>
      </LegalCard>

      <LegalCard icon={Truck} title="تكلفة الإرجاع">
        <p>
          إذا كان المنتج معيباً أو تالفاً من عندنا،{" "}
          <strong className="text-navy">لا تتحمل أي تكلفة</strong>{" "}
          لإرجاعه — {businessInfo.name} تغطي مصاريف الإرجاع.
        </p>
        <p>
          إذا كان المنتج سليماً و رغبت في إرجاعه لسبب شخصي (تغيير
          الرأي)، تكلفة شحن الإرجاع على عاتق الزبون.
        </p>
      </LegalCard>

      <LegalCard icon={MessageCircle} title="كيفية التواصل">
        <p>
          للاسترجاع أو الاستبدال، تواصل معنا عبر{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>{" "}
          أو واتساب مباشرة. سنعاونك خطوة ب خطوة.
        </p>
        <p>
          للعيوب التي تظهر بعد الاستلام، راجع أيضاً{" "}
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
