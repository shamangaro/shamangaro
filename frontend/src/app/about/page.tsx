import Link from "next/link";
import {
  Heart,
  Sparkles,
  Mountain,
  Gem,
  Users,
  Star,
} from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { businessInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";

const page = getLegalPage("/about")!;

export const metadata = buildLegalMetadata("/about");

export default function AboutPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Sparkles} title="قصة SHAMANGARO">
        <p>
          {businessInfo.name} علامة مغربية. نسعى لبناء علامة premium
          تجمع بين الأناقة، الراحة، و الجودة — بمنتجات ترافقك في
          الحياة اليومية و في أوقات الراحة.
        </p>
        <p>
          حالياً نقدّم عائلات منتجات منها{" "}
          <strong className="text-navy">Neo Transat</strong> و{" "}
          <strong className="text-navy">Montres Femmes</strong>. قد
          تُضاف منتجات أخرى لاحقاً. تفاصيل كل منتج ظاهرة على صفحته.
        </p>
      </LegalCard>

      <LegalCard icon={Mountain} title="راحة و أناقة حسب المنتج">
        <p>
          فلسفتنا بسيطة: الراحة و الأناقة ما خصهمش يكونو معقّدين.
          كل منتج مصمم لاستعماله المعلن على صفحته — سواء للخارج،
          للبيت، أو للإطلالة اليومية.
        </p>
      </LegalCard>

      <LegalCard icon={Gem} title="جودة مختارة">
        <p>
          نختار مواد و تشطيبات مناسبة لكل منتج. المواصفات المعتمدة
          هي اللي ظاهرة على صفحة المنتج وقت الطلب.
        </p>
      </LegalCard>

      <LegalCard icon={Heart} title="تصميم أنيق و بسيط">
        <p>
          {businessInfo.name} تؤمن بالبساطة و الأناقة. تصاميمنا
          واضحة و عملية — كل خط منتج بأسلوبه.
        </p>
      </LegalCard>

      <LegalCard icon={Users} title="رضا الزبون أولاً">
        <p>
          الزبون في قلب {businessInfo.name}. الدفع عند الاستلام،
          توصيل داخل المغرب حسب صفحة المنتج، و فريق دعم يرد بسرعة —
          كل ذلك لمنحك تجربة شراء واثقة.
        </p>
        <p>
          عندك سؤال؟{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            تواصل معنا
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Star} title="علامة مغربية نفتخر بها">
        <p>
          نفتخر بكوننا علامة مغربية. {businessInfo.name} — جودة،
          راحة، و أناقة لمن يقدّر منتجات مختارة.
        </p>
        <p className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-light"
          >
            Neo Transat
          </Link>
          <Link
            href="/products/montres-femmes"
            className="inline-flex rounded-full border-2 border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy/5"
          >
            Montres Femmes
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
