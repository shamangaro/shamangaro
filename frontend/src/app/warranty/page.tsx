import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Wrench,
  XCircle,
  HelpCircle,
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

const page = getLegalPage("/warranty")!;

export const metadata = buildLegalMetadata("/warranty");

export default function WarrantyPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={ShieldCheck} title="الضمان حسب المنتج">
        <p>{productPageConditionsNotice}</p>
        <p>
          لا نعد بمدة ضمان موحّدة لكل المنتجات. اللي ظاهر على صفحة
          المنتج وقت الطلب هو المعتمد.
        </p>
      </LegalCard>

      <LegalCard icon={Calendar} title="مثال: Neo Transat">
        <p>
          بالنسبة لـ{" "}
          <strong className="text-navy">Neo Transat</strong>، الضمان
          الحالي المعلن هو{" "}
          <strong className="text-navy">سنة واحدة (12 شهراً)</strong>{" "}
          ضد عيوب الصنع — مشكل في الخشب، القماش، أو الهيكل ناتج عن
          التصنيع — يبدأ من تاريخ الاستلام، ما دام ذلك معلناً على
          صفحة المنتج.
        </p>
        <p>ما يغطيه هذا الضمان عند تطبيقه:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>عيوب في الخياطة أو القماش</li>
          <li>مشاكل في الهيكل الخشبي (كسر أو تشقق من عند المصنع)</li>
          <li>عيوب في التصنيع غير ناتجة عن الاستخدام العادي</li>
        </ul>
      </LegalCard>

      <LegalCard icon={XCircle} title="ما لا يغطيه الضمان عادةً">
        <p>ما لم تذكر صفحة المنتج غير ذلك، الضمان لا يشمل:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>سوء الاستخدام أو الإجهاد غير المبرر على المنتج</li>
          <li>الأضرار العرضية (سقوط، حرق، قطع، إلخ)</li>
          <li>التآكل الطبيعي الناتج عن الاستخدام المنتظم</li>
          <li>الأضرار الناتجة عن ظروف قاهرة</li>
        </ul>
      </LegalCard>

      <LegalCard icon={Wrench} title="كيفية استعمال الضمان">
        <p>
          إذا لاحظت عيباً مشمولاً حسب صفحة منتجك، تواصل معنا عبر{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            اتصل بنا
          </Link>{" "}
          مع صور و وصف واضح للمشكل.
        </p>
        <p>
          بعد التحقق، قد نعرض استبدالاً أو إصلاحاً حسب الحالة، توفر
          القطع، و شروط المنتج.
        </p>
      </LegalCard>

      <LegalCard icon={HelpCircle} title="أسئلة على الضمان">
        <p>
          للمنتجات التالفة عند الاستلام، راجع{" "}
          <Link
            href="/returns"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الاسترجاع
          </Link>
          . و للشروط العامة، راجع{" "}
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
