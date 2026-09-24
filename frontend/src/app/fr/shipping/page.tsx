import Link from "next/link";
import { MapPin, Clock, Wallet, PhoneCall, Package } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { businessInfo } from "@/config/legal";
import { getWatchesFrLegalPage } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";

const page = getWatchesFrLegalPage("/fr/shipping")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/shipping");

export default function FrenchWatchesShippingPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={MapPin} title="Livraison gratuite au Maroc">
        <p>
          Les commandes Montres Femmes sont livrées dans toutes les villes du
          Maroc : Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès et les
          autres villes proposées au checkout.
        </p>
        <p>
          Aucun frais de livraison n’est ajouté au prix de la montre affiché
          sur la page.
        </p>
      </LegalCard>

      <LegalCard icon={Clock} title="Délai">
        <p>
          Délai annoncé : <strong className="text-[#134A35]">1 à 3 jours ouvrés</strong>{" "}
          (hors dimanches et jours fériés).
        </p>
        <p>
          Nous vous appelons pour confirmer la commande avant de la remettre
          au transporteur.
        </p>
      </LegalCard>

      <LegalCard icon={Wallet} title="Paiement à la livraison">
        <p>
          Vous payez à la réception (espèces ou carte selon le livreur). Aucun
          paiement en ligne n’est demandé pour commander une montre.
        </p>
      </LegalCard>

      <LegalCard icon={PhoneCall} title="Appel du livreur">
        <p>
          Le transporteur peut vous appeler avant d’arriver. Indiquez un
          numéro joignable. Les non-réponses répétées peuvent retarder la
          livraison. {businessInfo.name} n’est pas responsable de ce retard.
        </p>
      </LegalCard>

      <LegalCard icon={Package} title="À la réception">
        <p>
          Vérifiez le colis si possible. En cas de dégât visible, refusez ou
          photographiez immédiatement, puis contactez-nous sous 48 heures via{" "}
          <Link
            href="/fr/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Contact
          </Link>
          . Détails :{" "}
          <Link
            href="/fr/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            retours et échanges
          </Link>
          .
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
