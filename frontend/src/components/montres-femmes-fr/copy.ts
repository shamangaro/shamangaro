import { MOROCCAN_CITIES, WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import type { WatchVariantId } from "@/components/montres-femmes/config";

export function formatWatchPriceFr(amount: number): string {
  return `${amount} DH`;
}

export const FR_CROSSED_PRICE = "350 DH";

export const FR_VARIANT_LABELS: Record<WatchVariantId, string> = {
  "two-tone-white": "Blanc",
  "two-tone-brown": "Marron",
  "gold-brown": "Doré",
  "navy-leather": "Bleu",
  "burgundy-oval": "Violet",
  "cream-leather": "Crème",
};

export const FR_CITY_LABELS: Record<string, string> = {
  "الدار البيضاء": "Casablanca",
  الرباط: "Rabat",
  مراكش: "Marrakech",
  فاس: "Fès",
  طنجة: "Tanger",
  أكادير: "Agadir",
  مكناس: "Meknès",
  وجدة: "Oujda",
  القنيطرة: "Kénitra",
  تطوان: "Tétouan",
  تمارة: "Témara",
  سلا: "Salé",
  الجديدة: "El Jadida",
  "بني ملال": "Béni Mellal",
  خريبكة: "Khouribga",
  المحمدية: "Mohammedia",
  الناظور: "Nador",
  سطات: "Settat",
  آسفي: "Safi",
  العيون: "Laâyoune",
};

export const FR_CITY_OPTIONS = MOROCCAN_CITIES.map((value) => ({
  value,
  label: FR_CITY_LABELS[value] ?? value,
}));

export const FR_NAV = [
  { href: "#watches-lp-top", label: "Accueil" },
  { href: "#watches-hero-photo", label: "Commande" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const FR_COPY = {
  logoSubtitle: "Montres Femmes",
  cartAria: "Panier",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  mainNav: "Navigation principale",
  tickerAria: "Offres et avantages Montres Femmes",
  announcements: [
    "Livraison gratuite dans toutes les villes du Maroc",
    "Paiement à la livraison",
    "Échange possible",
    "Emballage cadeau",
  ],
  eyebrow: "SHAMANGARO · Montres Femmes",
  h1Lead: "Élégance discrète",
  h1Rest: " au poignet",
  heroSub: "Choisissez la couleur que vous aimez et terminez votre commande maintenant.",
  specialOffer: "Offre spéciale",
  deliveryHeadline: "Livraison gratuite",
  deliverySubline: "dans toutes les villes du Maroc",
  deliveryDetail: "1–3 jours ouvrés · sans frais supplémentaires",
  deliveryFull: "Livraison gratuite dans toutes les villes du Maroc",
  orderTitle: "Choisissez votre montre et commandez",
  orderSub:
    "Regardez les photos clairement, choisissez le modèle, puis remplissez vos informations.",
  browseHint: "Choisissez la montre parmi les photos ci-dessous.",
  selectWatch: "Choisir cette montre",
  addedWatch: "Ajoutée",
  addedToast: "La montre a été ajoutée au panier",
  cartTitle: "Panier",
  remove: "Retirer",
  unitPriceLabel: "Prix",
  continueOrder: "Continuer la commande",
  modelsSelected: (count: number) =>
    count === 1 ? "1 modèle choisi" : `${count} modèles choisis`,
  totalQuantity: (count: number) =>
    count === 1 ? "Total : 1 montre" : `Total : ${count} montres`,
  totalPriceLabel: "Total",
  perWatchDelivery: (price: string) => `${price} / montre · livraison gratuite`,
  prevWatches: "Montres précédentes",
  nextWatches: "Montres suivantes",
  decreaseQty: "Diminuer la quantité",
  increaseQty: "Augmenter la quantité",
  stepCheckout: "Informations de commande",
  nameLabel: "Nom complet",
  namePlaceholder: "Nom et prénom",
  phoneLabel: "Téléphone",
  cityLabel: "Ville",
  cityPlaceholder: "Choisissez la ville",
  cityHint: "Nous confirmerons l’adresse complète avec vous par téléphone",
  summaryTitle: "Récapitulatif",
  summaryEmpty: "Terminez le choix des montres pour voir le récapitulatif",
  total: "Total",
  confirmOrder: (price: string) => `Confirmer la commande — ${price}`,
  submitting: "Envoi de la commande...",
  submitError: "Impossible d’enregistrer la commande. Réessayez.",
  termsPrefix: "En appuyant sur « Confirmer la commande », vous acceptez les ",
  terms: "conditions générales",
  termsAnd: " et la ",
  privacy: "politique de confidentialité",
  termsSuffix: ".",
  reassurance: [
    "Livraison gratuite",
    "Vous payez à la réception",
    "Nous vous appelons pour confirmer la commande",
    "Échange possible",
  ],
  stickyCta: (price: string) => `Choisissez la montre — ${price}`,
  scrollTopAria: "Retour en haut de la page",
  trust: [
    { title: "Paiement à la livraison", subline: "Sans paiement en ligne" },
    {
      title: "Livraison gratuite",
      subline: "1–3 jours · toutes les villes",
      sublineClassName: "font-semibold text-emerald-300",
    },
    { title: "Échange possible", subline: "Changez de couleur facilement" },
    { title: "Service garanti", subline: "Confirmation avant l’expédition" },
  ],
  benefitsTitle: "Pourquoi choisir cette montre ?",
  benefits: [
    {
      title: "Style féminin raffiné",
      description:
        "Des lignes douces et une touche élégante — du quotidien jusqu’aux soirées.",
    },
    {
      title: "Légère et confortable",
      description: "Légère au poignet, bracelet doux — confort toute la journée.",
    },
    {
      title: "Cadeau prêt",
      description: "Un bel emballage, prêt à offrir — sans rien ajouter.",
    },
  ],
  stepsTitle: "Comment commander ?",
  steps: [
    {
      num: "1",
      title: "Choisissez les montres",
      description: "Parcourez les photos et ajoutez celles que vous aimez.",
    },
    {
      num: "2",
      title: "Entrez vos informations",
      description: "Nom, téléphone et ville — sans paiement en ligne.",
    },
    {
      num: "3",
      title: "Nous vous appelons",
      description: "Notre équipe vous contacte en quelques heures.",
    },
    {
      num: "4",
      title: "Réception et paiement",
      description: "Livraison en 1–3 jours — paiement à la porte.",
    },
  ],
  reviewsTitle: "Avis des clientes",
  reviews: [
    {
      name: "Sara M.",
      city: "Casablanca",
      text: "La montre est très élégante et la boîte était prête pour un cadeau. La livraison est arrivée en deux jours.",
    },
    {
      name: "Amina L.",
      city: "Rabat",
      text: "Légère au poignet et elle va avec tout. J’ai payé à la réception, aucun souci.",
    },
    {
      name: "Fatima B.",
      city: "Marrakech",
      text: "Cadeau pour ma sœur, elle a beaucoup aimé. Bonne qualité et prix raisonnable.",
    },
  ],
  faqTitle: "Questions fréquentes",
  faq: [
    {
      q: "Quel est le prix ?",
      a: `250 DH la montre. Le total = 250 × la quantité. Livraison gratuite.`,
    },
    {
      q: "Comment payer ?",
      a: "Paiement à la livraison — espèces ou carte à la réception. Pas de paiement en ligne.",
    },
    {
      q: "L’échange est-il possible ?",
      a: "Oui, l’échange est possible. Appelez-nous après réception si vous voulez changer de couleur.",
    },
    {
      q: "Combien de temps prend la livraison ?",
      a: "1 à 3 jours ouvrés pour toutes les villes du Maroc.",
    },
    {
      q: "Puis-je augmenter la quantité ?",
      a: "Oui, choisissez la quantité souhaitée — le total se met à jour tout seul.",
    },
  ],
  footerNavAria: "Liens légaux et politiques",
  footerGroups: [
    {
      title: "Le site",
      links: [
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { href: "/privacy", label: "Politique de confidentialité" },
        { href: "/terms", label: "Conditions générales" },
      ],
    },
    {
      title: "Politiques",
      links: [
        { href: "/shipping", label: "Politique de livraison" },
        { href: "/returns", label: "Politique de retour et d’échange" },
        { href: "/warranty", label: "Politique de garantie" },
      ],
    },
  ],
  copyright: (year: number) => `© ${year} SHAMANGARO. Tous droits réservés.`,
  backHome: "Retour en haut de la page",
  validation: {
    selection: "Choisissez au moins une montre avant de continuer",
    name: "Entrez le nom complet",
    phone: "Entrez un numéro marocain valide commençant par 06 ou 07",
    city: "Choisissez la ville",
  },
} as const;

export const FR_UNIT_PRICE = WATCHES_PRODUCT.unitPrice;
