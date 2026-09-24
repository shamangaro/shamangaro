import Link from "next/link";
import { Handshake, Tag, ImageIcon, ShieldAlert, Scale, FileCheck } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesFrLegalPage, WATCHES_FR_HOME } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";
import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import { formatWatchPriceFr } from "@/components/montres-femmes-fr/copy";

const page = getWatchesFrLegalPage("/fr/terms")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/terms");

export default function FrenchWatchesTermsPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Handshake} title="Acceptation">
        <p>
          En confirmant une commande de montre sur{" "}
          <Link
            href={WATCHES_FR_HOME}
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Montres Femmes
          </Link>
          , vous acceptez ces conditions et la{" "}
          <Link
            href="/fr/privacy"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Tag} title="Prix">
        <p>
          Le prix d’une montre est{" "}
          <strong className="text-[#134A35]">
            {formatWatchPriceFr(WATCHES_PRODUCT.unitPrice)}
          </strong>
          . Le total = {WATCHES_PRODUCT.unitPrice} × la quantité. La livraison
          est gratuite au Maroc.
        </p>
        <p>
          Le prix confirmé avec vous par téléphone avant l’expédition est le
          prix applicable à votre commande.
        </p>
      </LegalCard>

      <LegalCard icon={ImageIcon} title="Photos">
        <p>
          Les photos des montres sont illustratives. Un écart léger de couleur
          peut exister selon l’écran. Le modèle livré est celui choisi dans le
          formulaire.
        </p>
      </LegalCard>

      <LegalCard icon={ShieldAlert} title="Refus ou annulation">
        <p>
          Nous pouvons refuser une commande incomplète, erronée, frauduleuse,
          ou si nous n’arrivons pas à vous joindre pour la confirmer.
        </p>
      </LegalCard>

      <LegalCard icon={FileCheck} title="Confirmation">
        <p>
          La commande devient définitive après confirmation par téléphone ou
          WhatsApp. Vérifiez le nom, le téléphone et la ville avant d’envoyer
          le formulaire.
        </p>
        <p>Paiement à la livraison — pas de paiement en ligne.</p>
      </LegalCard>

      <LegalCard icon={Scale} title="Droit applicable">
        <p>
          Ces conditions s’appliquent aux commandes Montres Femmes de{" "}
          {businessInfo.name} au Maroc.
        </p>
        <p>
          Voir aussi la{" "}
          <Link
            href="/fr/shipping"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            livraison
          </Link>
          , les{" "}
          <Link
            href="/fr/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            retours
          </Link>{" "}
          et la{" "}
          <Link
            href="/fr/warranty"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            garantie
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
