import Link from "next/link";
import { ShieldCheck, Calendar, Wrench, XCircle, HelpCircle } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { getWatchesArLegalPage } from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";

const page = getWatchesArLegalPage("/products/montres-femmes/warranty")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/warranty"
);

export default function WatchesWarrantyPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={ShieldCheck} title="ضمان Montres Femmes">
        <p>
          هاد الصفحة خاصة غير بالساعات اللي تطلبو من Montres Femmes. ما
          كتنطبقش على منتجات SHAMANGARO أخرى.
        </p>
        <p>
          ما كنوعدوش بمدة ضمان ميكانيكي طويلة. عند الاستلام، عيب التصنيع
          أو الكسر بسبب النقل خاص يتبلّغ فـ 48 ساعة.
        </p>
      </LegalCard>

      <LegalCard icon={Calendar} title="شنو مغطّى عند الوصول">
        <ul className="list-inside list-disc space-y-1">
          <li>ساعة مكسورة أو ما كتخدمش ملي تفتحيها</li>
          <li>عيب تصنيع باين عند الاستلام</li>
          <li>طرد باين فيه الضرر، وتصوّر دغيا</li>
        </ul>
      </LegalCard>

      <LegalCard icon={XCircle} title="شنو ما مغطّيش">
        <ul className="list-inside list-disc space-y-1">
          <li>سقطة، ضربة، الماء أو الاستعمال الغالط من بعد الاستلام</li>
          <li>التآكل العادي ديال السوار أو التشطيب</li>
          <li>الخدوش بسبب اللبس اليومي</li>
        </ul>
      </LegalCard>

      <LegalCard icon={Wrench} title="كيفاش تديري">
        <p>
          تواصلي مع{" "}
          <Link
            href="/products/montres-femmes/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            فريق Montres Femmes
          </Link>{" "}
          مع الصور. من بعد التحقق، كنقترحو تبديل أو تعويض حسب الحالة.
        </p>
      </LegalCard>

      <LegalCard icon={HelpCircle} title="روابط مفيدة">
        <p>
          <Link
            href="/products/montres-femmes/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الاسترجاع والاستبدال
          </Link>
          {" · "}
          <Link
            href="/products/montres-femmes/terms"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            الشروط والأحكام
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
