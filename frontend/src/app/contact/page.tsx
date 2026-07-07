import Link from "next/link";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { ContactForm } from "@/components/legal/ContactForm";
import { businessInfo, contactInfo, getLegalPage } from "@/config/legal";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { whatsappLink } from "@/lib/whatsapp";

const page = getLegalPage("/contact")!;

export const metadata = buildLegalMetadata("/contact");

export default function ContactPage() {
  return (
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-2xl border border-border/60 bg-white p-5 text-center shadow-sm transition-all hover:border-navy/20 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
            <MessageCircle size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-navy">واتساب</p>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {contactInfo.whatsappDisplay}
          </p>
        </a>

        <a
          href={`mailto:${contactInfo.email}`}
          className="flex flex-col items-center rounded-2xl border border-border/60 bg-white p-5 text-center shadow-sm transition-all hover:border-navy/20 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
            <Mail size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-navy">البريد الإلكتروني</p>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {contactInfo.email}
          </p>
        </a>

        <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-white p-5 text-center shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
            <Clock size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-navy">وقت الرد</p>
          <p className="mt-1 text-sm text-muted-foreground">
            خلال {contactInfo.responseTime}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {contactInfo.businessHours}
          </p>
        </div>
      </div>

      <LegalCard icon={MessageCircle} title="نموذج التواصل">
        <p>
          املأ النموذج أدناه و سيتم توجيه رسالتك مباشرة إلى واتساب
          فريق {businessInfo.name}. نرد في أقرب وقت ممكن خلال أيام
          العمل.
        </p>
        <div className="mt-4">
          <ContactForm />
        </div>
      </LegalCard>

      <LegalCard icon={Mail} title="للطلبات و الاستفسارات">
        <p>
          لطلب {businessInfo.product} مباشرة، ارجع إلى{" "}
          <Link
            href="/#order"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            صفحة الطلب
          </Link>
          . للأسئلة المتعلقة بمعالجة بياناتك، راجع{" "}
          <Link
            href="/privacy"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated />
    </LegalPageShell>
  );
}
