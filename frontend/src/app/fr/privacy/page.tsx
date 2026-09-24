import Link from "next/link";
import { Lock, Eye, Database, Ban, UserCheck, Scale } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesFrLegalPage } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";

const page = getWatchesFrLegalPage("/fr/privacy")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/privacy");

export default function FrenchWatchesPrivacyPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={UserCheck} title="Données collectées">
        <p>
          Lorsque vous commandez une montre sur la page Montres Femmes, nous
          collectons le nom, le téléphone et la ville, ainsi que le modèle et
          la quantité choisis.
        </p>
        <p>
          Ces informations servent uniquement à confirmer la commande, vous
          appeler, livrer la montre et assurer le service après-vente.
        </p>
      </LegalCard>

      <LegalCard icon={Lock} title="Téléphone et adresse">
        <p>
          Votre numéro et votre ville restent confidentiels. Ils ne sont
          transmis qu’au transporteur chargé de livrer votre montre.
        </p>
        <p>
          Nous ne vendons pas vos données à des régies publicitaires.
        </p>
      </LegalCard>

      <LegalCard icon={Ban} title="Pas de revente de données">
        <p>
          {businessInfo.name} Montres Femmes ne revend pas les données
          clientes. Elles restent utilisées dans le cadre de votre commande de
          montre.
        </p>
      </LegalCard>

      <LegalCard icon={Database} title="Conservation">
        <p>
          L’accès aux données est limité aux personnes qui traitent les
          commandes de montres. La conservation suit la législation marocaine
          sur les données personnelles.
        </p>
        <p>
          Pour une demande de suppression, écrivez-nous via{" "}
          <Link
            href="/fr/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Contact
          </Link>
          .
        </p>
      </LegalCard>

      <LegalCard icon={Eye} title="Cookies">
        <p>
          Le site peut utiliser des cookies techniques et des outils de mesure
          (par exemple Meta Pixel) pour le suivi des commandes Montres Femmes.
          Aucune donnée bancaire n’est collectée : le paiement se fait à la
          livraison.
        </p>
      </LegalCard>

      <LegalCard icon={Scale} title="Vos droits">
        <p>
          Vous pouvez demander l’accès, la correction ou la suppression de vos
          données, tant que cela n’empêche pas l’exécution d’une commande en
          cours.
        </p>
        <p>
          Voir aussi les{" "}
          <Link
            href="/fr/terms"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            conditions générales
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
