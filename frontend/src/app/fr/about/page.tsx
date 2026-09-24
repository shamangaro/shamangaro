import Link from "next/link";
import { Heart, Sparkles, Gem, Users, Watch } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { businessInfo } from "@/config/legal";
import {
  getWatchesFrLegalPage,
  WATCHES_FR_HOME,
} from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";
import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import { formatWatchPriceFr } from "@/components/montres-femmes-fr/copy";

const page = getWatchesFrLegalPage("/fr/about")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/about");

export default function FrenchWatchesAboutPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={Sparkles} title="SHAMANGARO Montres Femmes">
        <p>
          Cette page concerne uniquement{" "}
          <strong className="text-[#134A35]">Montres Femmes</strong>, une
          collection de montres féminines proposée par {businessInfo.name} au
          Maroc.
        </p>
        <p>
          Prix affiché : {formatWatchPriceFr(WATCHES_PRODUCT.unitPrice)} la
          montre, livraison gratuite, paiement à la livraison.
        </p>
      </LegalCard>

      <LegalCard icon={Watch} title="Le produit">
        <p>
          Vous choisissez le modèle sur la page Montres Femmes, puis vous
          laissez votre nom, téléphone et ville. Notre équipe vous appelle pour
          confirmer la commande avant l’expédition.
        </p>
      </LegalCard>

      <LegalCard icon={Gem} title="Qualité et photos">
        <p>
          Les photos du catalogue et les photos en situation réelle (poignet,
          détail, boîte) illustrent la montre. Un léger écart de teinte peut
          exister selon l’écran.
        </p>
      </LegalCard>

      <LegalCard icon={Users} title="Achat simple">
        <p>
          Pas de paiement en ligne. Vous payez à la réception. L’échange de
          couleur est possible après réception, en nous contactant.
        </p>
        <p>
          Une question ?{" "}
          <Link
            href="/fr/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Contactez-nous
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Heart} title="Commander">
        <p>
          <Link
            href={WATCHES_FR_HOME}
            className="inline-flex rounded-full bg-[#134A35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0A2F23]"
          >
            Voir Montres Femmes
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
