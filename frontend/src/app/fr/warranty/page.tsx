import Link from "next/link";
import { ShieldCheck, Calendar, Wrench, XCircle, HelpCircle } from "lucide-react";
import { LegalCard } from "@/components/legal/LegalCard";
import { LegalLastUpdated } from "@/components/legal/LegalLastUpdated";
import { WatchesFrLegalShell } from "@/components/legal/WatchesFrLegalShell";
import { getWatchesFrLegalPage } from "@/config/legal-watches-fr";
import { buildWatchesFrLegalMetadata } from "@/lib/watches-fr-legal-metadata";

const page = getWatchesFrLegalPage("/fr/warranty")!;

export const metadata = buildWatchesFrLegalMetadata("/fr/warranty");

export default function FrenchWatchesWarrantyPage() {
  return (
    <WatchesFrLegalShell
      title={page.title}
      subtitle={page.subtitle}
      icon={page.icon}
    >
      <LegalCard icon={ShieldCheck} title="Garantie Montres Femmes">
        <p>
          Cette page concerne uniquement les montres commandées sur Montres
          Femmes. Elle ne s’applique pas aux autres produits SHAMANGARO.
        </p>
        <p>
          Nous ne promettons pas une durée de garantie mécanique longue. À la
          réception, un défaut de fabrication ou une casse liée au transport
          doit être signalé sous 48 heures.
        </p>
      </LegalCard>

      <LegalCard icon={Calendar} title="Ce qui est couvert à la livraison">
        <ul className="list-inside list-disc space-y-1">
          <li>Montre cassée ou non fonctionnelle à l’ouverture</li>
          <li>Défaut visible de fabrication constaté à la réception</li>
          <li>Colis visiblement endommagé, documenté tout de suite</li>
        </ul>
      </LegalCard>

      <LegalCard icon={XCircle} title="Ce qui n’est pas couvert">
        <ul className="list-inside list-disc space-y-1">
          <li>Chute, choc, eau ou mauvaise utilisation après réception</li>
          <li>Usure normale du bracelet ou des finitions</li>
          <li>Rayures liées au port quotidien</li>
        </ul>
      </LegalCard>

      <LegalCard icon={Wrench} title="Comment procéder">
        <p>
          Contactez{" "}
          <Link
            href="/fr/contact"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            l’équipe Montres Femmes
          </Link>{" "}
          avec photos. Après vérification, nous proposons un échange ou un
          remplacement selon le cas.
        </p>
      </LegalCard>

      <LegalCard icon={HelpCircle} title="Liens utiles">
        <p>
          <Link
            href="/fr/returns"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Retours et échanges
          </Link>
          {" · "}
          <Link
            href="/fr/terms"
            className="font-semibold text-[#134A35] underline-offset-2 hover:underline"
          >
            Conditions générales
          </Link>
        </p>
      </LegalCard>

      <LegalLastUpdated lang="fr" />
    </WatchesFrLegalShell>
  );
}
