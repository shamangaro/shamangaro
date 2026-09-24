import type { LucideIcon } from "lucide-react";
import {
  Shield,
  FileText,
  Truck,
  RefreshCw,
  BadgeCheck,
  Phone,
  Info,
} from "lucide-react";

export const WATCHES_FR_HOME = "/fr/products/montres-femmes";

export interface WatchesFrLegalPage {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

export const watchesFrLegalPages: WatchesFrLegalPage[] = [
  {
    slug: "/fr/about",
    title: "À propos",
    subtitle: "SHAMANGARO · Montres Femmes",
    description:
      "SHAMANGARO Montres Femmes — montres féminines élégantes au Maroc, 260 DH, livraison gratuite, paiement à la livraison.",
    icon: Info,
  },
  {
    slug: "/fr/contact",
    title: "Contact",
    subtitle: "L’équipe Montres Femmes vous répond",
    description:
      "Contactez SHAMANGARO Montres Femmes par WhatsApp ou e-mail pour une commande de montre, un échange de couleur ou une question de livraison.",
    icon: Phone,
  },
  {
    slug: "/fr/privacy",
    title: "Politique de confidentialité",
    subtitle: "Vos données pour les commandes de montres",
    description:
      "Politique de confidentialité de SHAMANGARO Montres Femmes — nom, téléphone et ville utilisés uniquement pour confirmer et livrer votre commande de montre.",
    icon: Shield,
  },
  {
    slug: "/fr/terms",
    title: "Conditions générales",
    subtitle: "Commandes de montres au Maroc",
    description:
      "Conditions générales de vente de SHAMANGARO Montres Femmes — prix 260 DH, paiement à la livraison, confirmation par téléphone avant expédition.",
    icon: FileText,
  },
  {
    slug: "/fr/shipping",
    title: "Politique de livraison",
    subtitle: "Livraison gratuite au Maroc",
    description:
      "Livraison gratuite des montres SHAMANGARO dans toutes les villes du Maroc, 1 à 3 jours ouvrés, paiement à la livraison.",
    icon: Truck,
  },
  {
    slug: "/fr/returns",
    title: "Politique de retour et d’échange",
    subtitle: "Échange de couleur et défauts à la réception",
    description:
      "Retour et échange SHAMANGARO Montres Femmes — échange de couleur possible, défaut à signaler sous 48 heures après réception.",
    icon: RefreshCw,
  },
  {
    slug: "/fr/warranty",
    title: "Politique de garantie",
    subtitle: "Couverture à la réception de la montre",
    description:
      "Garantie SHAMANGARO Montres Femmes — défaut de fabrication ou casse à la livraison à signaler sous 48 heures. Pas de garantie étendue inventée.",
    icon: BadgeCheck,
  },
];

export function getWatchesFrLegalPage(slug: string) {
  return watchesFrLegalPages.find((p) => p.slug === slug);
}
