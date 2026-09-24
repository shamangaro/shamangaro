import Link from "next/link";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { contactInfo } from "@/config/legal";
import { getWatchesFrLegalPage, WATCHES_FR_HOME } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";
import { whatsappLink } from "@/lib/whatsapp";

const page = getWatchesFrLegalPage("/fr/contact")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/contact");

export default function FrenchWatchesContactPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <a
          href={whatsappLink(
            "Bonjour, j’ai une question concernant une commande Montres Femmes."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-2xl border border-[#A8C9B4] bg-white p-5 text-center shadow-sm transition hover:border-[#134A35]/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#134A35]">
            <MessageCircle size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">WhatsApp</p>
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
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">E-mail</p>
          <p className="mt-1 text-sm text-[#4A5C52]" dir="ltr">
            {contactInfo.email}
          </p>
        </a>

        <div className="flex flex-col items-center rounded-2xl border border-[#A8C9B4] bg-white p-5 text-center shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#134A35]">
            <Clock size={22} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#0F2A1F]">Réponse</p>
          <p className="mt-1 text-sm text-[#4A5C52]">Sous 24 h</p>
          <p className="mt-1 text-xs text-[#4A5C52]">Du lundi au samedi</p>
        </div>
      </div>

      <LegalCard icon={MessageCircle} title="Commandes de montres">
        <p>
          Pour commander une montre, utilisez le formulaire sur{" "}
          <Link
            href={WATCHES_FR_HOME}
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            la page Montres Femmes
          </Link>
          : nom, téléphone et ville. Nous vous appelons pour confirmer avant
          l’envoi.
        </p>
        <p>
          Traitement des données :{" "}
          <Link
            href="/fr/privacy"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
