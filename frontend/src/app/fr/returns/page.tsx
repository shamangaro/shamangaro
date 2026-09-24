import Link from "next/link";
import {
  AlertTriangle,
  PackageX,
  RefreshCw,
  Truck,
  MessageCircle,
} from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesFrLegalPage } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";

const page = getWatchesFrLegalPage("/fr/returns")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/returns");

export default function FrenchWatchesReturnsPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={AlertTriangle} title="Montre endommagée ou défectueuse">
        <p>
          Si la montre arrive cassée, défectueuse ou visiblement abîmée,
          contactez-nous dans les{" "}
          <strong className="text-[#134A35]">48 heures</strong> après
          réception, avec photos de la montre et de l’emballage.
        </p>
      </LegalCard>

      <LegalCard icon={RefreshCw} title="Échange de couleur">
        <p>
          L’échange de couleur / modèle est possible après réception : appelez-nous
          ou écrivez-nous. Nous organisons l’échange selon disponibilité.
        </p>
      </LegalCard>

      <LegalCard icon={PackageX} title="Changement d’avis">
        <p>
          Pour un retour sans défaut, la montre doit être non portée, dans son
          état d’origine, avec l’emballage si possible.
        </p>
        <p>
          Les dommages dus à une mauvaise utilisation ne sont pas acceptés.
        </p>
      </LegalCard>

      <LegalCard icon={Truck} title="Frais de retour">
        <p>
          Défaut ou casse de notre fait :{" "}
          <strong className="text-[#134A35]">
            {businessInfo.name} prend en charge
          </strong>{" "}
          le retour.
        </p>
        <p>
          Retour pour convenance personnelle : les frais de renvoi sont à votre
          charge, sauf accord contraire.
        </p>
      </LegalCard>

      <LegalCard icon={MessageCircle} title="Comment nous joindre">
        <p>
          <Link
            href="/fr/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Contact
          </Link>{" "}
          ou WhatsApp. Pour un défaut constaté plus tard, voir aussi la{" "}
          <Link
            href="/fr/warranty"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            politique de garantie
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
