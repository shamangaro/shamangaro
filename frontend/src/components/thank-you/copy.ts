export const THANK_YOU_COPY = {
  darija: {
    title: "شكراً على طلبك!",
    subtitle: "تم تسجيل طلبك بنجاح، وسنتصل بك قريباً لتأكيده.",
    orderNumber: "رقم الطلب",
    name: "الاسم",
    phone: "الهاتف",
    offer: "العرض",
    total: "المجموع",
    currency: "د.م",
    paymentMethod: "طريقة الدفع",
    cashOnDelivery: "الدفع عند الاستلام",
    fallback: "تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد التفاصيل.",
    backHome: "العودة إلى الصفحة الرئيسية",
    documentTitle: "شكراً على طلبك",
  },
  fr: {
    title: "Merci pour votre commande !",
    subtitle:
      "Votre commande a bien été enregistrée. Nous vous appellerons bientôt pour la confirmer.",
    orderNumber: "N° de commande",
    name: "Nom",
    phone: "Téléphone",
    offer: "Offre",
    total: "Total",
    currency: "DH",
    paymentMethod: "Mode de paiement",
    cashOnDelivery: "Paiement à la livraison",
    fallback:
      "Votre commande a bien été reçue. Nous vous contacterons bientôt pour confirmer les détails.",
    backHome: "Retour à la page d'accueil",
    documentTitle: "Merci pour votre commande",
  },
} as const;

export type ThankYouLocale = keyof typeof THANK_YOU_COPY;
export type ThankYouCopy = (typeof THANK_YOU_COPY)[ThankYouLocale];
