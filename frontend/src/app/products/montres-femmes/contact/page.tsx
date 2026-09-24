import Link from "next/link";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesArLegalShell } from "@/components/legal/WatchesArLegalShell";
import { contactInfo } from "@/config/legal";
import {
  getWatchesArLegalPage,
  WATCHES_AR_HOME,
} from "@/config/legal-watches-ar";
import { buildWatchesArLegalMetadata } from "@/lib/watches-ar-legal-metadata";
import { whatsappLink } from "@/lib/whatsapp";

const page = getWatchesArLegalPage("/products/montres-femmes/contact")!;

export const metadata = buildWatchesArLegalMetadata(
  "/products/montres-femmes/contact"
);

export default function WatchesContactPage() {
  return (
    <WatchesArLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <a
          href={whatsappLink("سلام، عندي سؤال على طلب Montres Femmes.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-2xl border border-[#A8C9B4] bg-white p-5 text-center shadow-sm transition hover:border-[#134A35]/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#134A35]">
            <MessageCircle size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">واتساب</p>
          <p className="mt-1 text-sm text-[#4A5C52]" dir="ltr">
            {contactInfo.whatsappDisplay}
          </p>
        </a>

        <a
          href={`mailto:${contactInfo.email}?subject=Montres%20Femmes`}
          className="flex flex-col items-center rounded-2xl border border-[#A8C9B4] bg-white p-5 text-center shadow-sm transition hover:border-[#134A35]/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#134A35]">
            <Mail size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">الإيميل</p>
          <p className="mt-1 text-sm text-[#4A5C52]" dir="ltr">
            {contactInfo.email}
          </p>
        </a>

        <div className="flex flex-col items-center rounded-2xl border border-[#A8C9B4] bg-white p-5 text-center shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#134A35]">
            <Clock size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">وقت الرد</p>
          <p className="mt-1 text-sm text-[#4A5C52]">خلال 24 ساعة</p>
          <p className="mt-1 text-xs text-[#4A5C52]">من الإثنين للسبت</p>
        </div>
      </div>

      <LegalCard icon={MessageCircle} title="طلبات الساعات">
        <p>
          باش تطلبي ساعة، عمّري الفورم فـ{" "}
          <Link
            href={WATCHES_AR_HOME}
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            صفحة Montres Femmes
          </Link>
          : الاسم، الهاتف والمدينة. غادي نعيطو ليك قبل الشحن.
        </p>
        <p>
          البيانات:{" "}
          <Link
            href="/products/montres-femmes/privacy"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="ar-watches" />
    </WatchesArLegalShell>
  );
}
