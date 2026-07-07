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
          {businessInfo.name} ولدت من حب المغرب و الحياة الخارجية.
          نسعى لبناء علامة مغربية premium تجمع بين الأناقة، الراحة،
          و الجودة — منتجات ترافقك على الشاطئ، التراس، الكامبينغ،
          و أي مكان تريد فيه الاسترخاء.
        </p>
        <p>
          {businessInfo.product} هي أول منتجاتنا — كرسي استرخاء
          خفيف، أنيق، و عملي يُفتح في 30 ثانية و يُطوى بسهولة.
        </p>
      </LegalCard>

      <LegalCard icon={Mountain} title="راحة أينما ذهبت">
        <p>
          فلسفتنا بسيطة: الراحة لا يجب أن تكون مكلفة أو معقدة.{" "}
          {businessInfo.product} مصمم ليمنحك تجربة استرخاء ممتازة —
          على الشاطئ، في الحديقة، على التراس، أو أثناء التخييم.
        </p>
      </LegalCard>

      <LegalCard icon={Gem} title="مواد عالية الجودة">
        <p>
          نختار مواد premium: خشب طبيعي متين، قماش مقاوم للماء و
          الشمس، و تصميم يدوم معك سنوات. كل تفصيلة مدروسة بعناية.
        </p>
      </LegalCard>

      <LegalCard icon={Heart} title="تصميم أنيق و بسيط">
        <p>
          {businessInfo.name} تؤمن بالبساطة و الأناقة. تصاميمنا
          minimal و modern — تتناسب مع أي أسلوب و أي مكان.
        </p>
      </LegalCard>

      <LegalCard icon={Users} title="رضا الزبون أولاً">
        <p>
          الزبون في قلب {businessInfo.name}. الدفع عند الاستلام،
          توصيل مجاني، ضمان سنة، و فريق دعم يرد بسرعة — كل ذلك
          لمنحك تجربة شراء واثقة.
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
          نفتخر بكوننا علامة مغربية premium. {businessInfo.name}{" "}
          Lifestyle — جودة، راحة، و أناقة للمغاربة و لكل من يقدّر
          الحياة الخارجية.
        </p>
        <p>
          <Link
            href="/#order"
            className="inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-light"
          >
            اطلب {businessInfo.product} الآن
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
