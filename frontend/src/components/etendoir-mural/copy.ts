export type EtendoirLang = "ar" | "fr";

type Copy = {
  metaTitle: string;
  languageLabel: string;
  showroom: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  ratingScore: string;
  ratingLabel: string;
  lead: string;
  specs: { value: string; label: string }[];
  priceUnit: string;
  deliveryBand: string;
  deliveryDetail: string;
  delivery: string;
  orderCta: string;
  galleryLabel: string;
  galleryPrev: string;
  galleryNext: string;
  alts: Record<"open" | "in-use" | "hang" | "folded" | "angle" | "line" | "size", string>;
  compareTitle: string;
  compareLead: string;
  compareBefore: string;
  compareAfter: string;
  compareHint: string;
  compareLabel: string;
  benefitsTitle: string;
  benefits: { title: string; body: string }[];
  howTitle: string;
  steps: { image: "open" | "hang" | "folded"; title: string; body: string }[];
  spacesTitle: string;
  places: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  orderTitle: string;
  offerTitle: string;
  offers: Record<1 | 2 | 3, string>;
  save: string;
  orderLead: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  city: string;
  cityPlaceholder: string;
  addressNote: string;
  submit: string;
  submitting: string;
  errors: {
    name: string;
    phone: string;
    city: string;
    generic: string;
    unavailable: string;
    retry: string;
  };
  footerNote: string;
  footerPolicies: string;
  copyright: string;
  links: { href: string; label: string }[];
};

export const ETENDOIR_COPY: Record<EtendoirLang, Copy> = {
  ar: {
    metaTitle: "مجفف ملابس جداري — 349 درهم | SHAMANGARO",
    languageLabel: "اللغة",
    showroom: "قاعة البيع",
    eyebrow: "علاقة حائط",
    title: "مجفف ملابس",
    titleAccent: "جداري",
    ratingScore: "4.9",
    ratingLabel: "+500 تقييم",
    lead: "علّاقة حائطية كتوفّر ليك المساحة: حلّها باش تعلّق حوايجك، وطيّها منين تسالي باش تبقى قريبة للحيط.",
    specs: [
      { value: "3", label: "طرونصو" },
      { value: "6", label: "مناشير فكل طرونصو" },
      { value: "18", label: "علاقة" },
    ],
    priceUnit: "درهم",
    deliveryBand: "توصيل مجاني لجميع مدن المغرب",
    deliveryDetail: "2 إلى 5 أيام عمل · الدفع عند الاستلام",
    delivery: "توصيل مجاني لجميع مدن المغرب · الدفع عند الاستلام · 2 إلى 5 أيام عمل",
    orderCta: "أطلب — 349 درهم",
    galleryLabel: "صور العلاقة",
    galleryPrev: "الصورة السابقة",
    galleryNext: "الصورة التالية",
    alts: {
      open: "العلاقة محلولة على الحيط، والطرونصو منحنيين والمناشير باينين تحتهم",
      "in-use": "العلاقة مركبة على حيط داخلي وفيها ملابس معلقة",
      hang: "العلاقة مفتوحة وفيها ملابس معلقة على المناشير",
      folded: "العلاقة مطوية على الحيط وفيها ملابس معلقة",
      angle: "العلاقة مطوية بزاوية على الحيط، وفيها ملابس معلقة على المناشير",
      line: "العلاقة ممدودة على البلكونة، والملابس معلقة على المناشير",
      size: "مقاسات العلاقة: الطول الكامل 120 سم، ثلاثة طرونصو من 30 سم، وقضيب 24 سم",
    },
    compareTitle: "الفرق باين",
    compareLead: "حرك المؤشر وقارن الحبل مع العلاقة.",
    compareBefore: "فحبلة",
    compareAfter: "فالعلاقة",
    compareHint: "حرك للمقارنة",
    compareLabel: "مقارنة تعليق الملابس فحبلة ومع العلاقة",
    benefitsTitle: "علاش هاد العلاقة",
    benefits: [
      {
        title: "كتوفر البلاصة",
        body: "ملي تطوى، الطرونصو كيرجعو مجموعين قدام الحيط وما يبقاوش مفتوحين فالوسط.",
      },
      {
        title: "كتطوى للحيط",
        body: "المفاصل كيدورو، والعلاقة كتقدر تبقى مستقيمة ولا منحنية وهي ثابتة على الحيط.",
      },
      {
        title: "كتنظم الملابس",
        body: "كل طرونصو فيه 6 مناشير. التعلايق كتتعلق فيهم والملابس كتبقى مرفوعة.",
      },
    ],
    howTitle: "كيفاش كتتخدم",
    steps: [
      {
        image: "open",
        title: "حلّها",
        body: "حلّها كيف بغيت: الطرونصو كيتفتحو مستقيمين، ولا بزاوية.",
      },
      {
        image: "hang",
        title: "علّق",
        body: "علّق الحوايج فالتعلايق، وحط كل تعليقة فالمناشير تحت الطرونصو.",
      },
      {
        image: "folded",
        title: "طويها",
        body: "منين تسالي، طويها للحيط. ما كاتاخدش بلاصة، ومزيانة للبلايص الصغيرة.",
      },
    ],
    spacesTitle: "فين كتتركب",
    places: ["البلكونة", "الحمام", "بيت الغسيل", "بيت النعاس"],
    faqTitle: "أسئلة",
    faqs: [
      {
        q: "كيفاش كتتركب؟",
        a: "كتثبت على الحيط باللوحة اللي باينة فالصور. تفاصيل التركيب كنتأكدو منها معاك فالمكالمة قبل الإرسال.",
      },
      {
        q: "شحال كيوصل؟",
        a: "التوصيل مجاني لجميع مدن المغرب. المدة المعلنة هي 2 إلى 5 أيام عمل، وكنتصلو بيك باش نأكدو الطلب قبل ما يتسيفط. الأحد والعطل ما كيدخلوش فالحساب إلا إذا بان غير ذلك.",
      },
      {
        q: "فاش نخلص؟",
        a: "الدفع عند الاستلام. ما كاينش خلاص مسبق فالموقع.",
      },
      {
        q: "واش نقدر نرجعو؟",
        a: "إلا وصل فيه عيب ولا كسر، تواصل معانا خلال 48 ساعة من الاستلام وصيفط صور وفيديو. إلا بغيتي ترجّعو حيت بدلتي رأيك، خاصو يكون ما مستعملش، ومصاريف رجوع الشحن عليك. إلا كان العيب من عندنا، مصاريف الرجوع علينا. التفاصيل فسياسة الاسترجاع.",
      },
    ],
    orderTitle: "أكّد الطلب",
    offerTitle: "اختار العدد",
    offers: {
      1: "مجفف واحد",
      2: "جوج مجففات",
      3: "3 مجففات",
    },
    save: "كتوفّر",
    orderLead: "349 درهم · توصيل مجاني · الدفع عند الاستلام",
    name: "الاسم الكامل",
    namePlaceholder: "الاسم والنسب",
    phone: "رقم الهاتف",
    phonePlaceholder: "06XXXXXXXX",
    city: "المدينة",
    cityPlaceholder: "اختار المدينة",
    addressNote: "العنوان الكامل غادي نتأكدو منو معاك فالمكالمة.",
    submit: "أكّد الطلب — 349 درهم",
    submitting: "كنسجلو الطلب...",
    errors: {
      name: "دخل الاسم الكامل",
      phone: "دخل رقم هاتف مغربي كيبدأ بـ 06 أو 07",
      city: "اختار المدينة",
      generic: "ما قدرناش نسجلو الطلب. عاود المحاولة.",
      unavailable:
        "خدمة الطلبات واقفة دابا. زر التأكيد مقفل، وما كاين حتى طلب تسجّل. عاود المحاولة من بعد ما ترجع الخدمة.",
      retry: "عاود التحقق",
    },
    footerNote: "SHAMANGARO",
    footerPolicies: "سياسات الصفحة",
    copyright: "© 2026 SHAMANGARO — جميع الحقوق محفوظة",
    links: [
      { href: "/products/etendoir-mural/shipping", label: "الشحن" },
      { href: "/products/etendoir-mural/returns", label: "الاسترجاع" },
      { href: "/products/etendoir-mural/warranty", label: "الضمان" },
      { href: "/products/etendoir-mural/privacy", label: "الخصوصية" },
      { href: "/products/etendoir-mural/terms", label: "الشروط" },
    ],
  },
  fr: {
    metaTitle: "Étendoir mural pliant — 349 DH | SHAMANGARO",
    languageLabel: "Langue",
    showroom: "Salle de vente",
    eyebrow: "Étendoir mural",
    title: "Étendoir mural",
    titleAccent: "pliant",
    ratingScore: "4.9",
    ratingLabel: "+500 avis",
    lead: "Un espace mieux organisé : dépliez le support pour suspendre vos vêtements, puis repliez-le contre le mur après utilisation.",
    specs: [
      { value: "3", label: "tronçons" },
      { value: "6", label: "crochets par tronçon" },
      { value: "18", label: "cintres" },
    ],
    priceUnit: "DH",
    deliveryBand: "Livraison gratuite dans tout le Maroc",
    deliveryDetail: "2 à 5 jours ouvrables · Paiement à la livraison",
    delivery:
      "Livraison gratuite dans toutes les villes du Maroc · Paiement à la livraison · 2 à 5 jours ouvrables",
    orderCta: "Commander — 349 DH",
    galleryLabel: "Photos du produit",
    galleryPrev: "Photo précédente",
    galleryNext: "Photo suivante",
    alts: {
      open: "Étendoir ouvert sur le mur, tronçons en angle, crochets visibles en dessous",
      "in-use": "Étendoir fixé sur un mur intérieur, avec des vêtements suspendus",
      hang: "Étendoir ouvert, avec des vêtements suspendus aux crochets",
      folded: "Étendoir replié contre le mur, avec des vêtements suspendus",
      angle: "Étendoir replié en angle sur le mur, avec des vêtements suspendus aux crochets",
      line: "Étendoir déployé au balcon, avec des vêtements suspendus aux crochets",
      size: "Cotes de l’étendoir : longueur totale 120 cm, trois tronçons de 30 cm et une tige de 24 cm",
    },
    compareTitle: "La différence se voit",
    compareLead: "Faites glisser le curseur et comparez la corde avec l’étendoir.",
    compareBefore: "Sur une corde",
    compareAfter: "Avec l’étendoir",
    compareHint: "Glissez pour comparer",
    compareLabel: "Comparer le linge sur une corde et sur l’étendoir",
    benefitsTitle: "À quoi il sert",
    benefits: [
      {
        title: "Il libère de la place",
        body: "Une fois replié, les tronçons se regroupent contre le mur et ne restent pas ouverts au milieu de la pièce.",
      },
      {
        title: "Il se replie au mur",
        body: "Les charnières tournent. L’étendoir peut rester droit ou en angle, tout en restant fixé au mur.",
      },
      {
        title: "Il range les vêtements",
        body: "Chaque tronçon a 6 crochets. Les cintres s’y accrochent et les vêtements restent en l’air.",
      },
    ],
    howTitle: "Comment il s’utilise",
    steps: [
      {
        image: "open",
        title: "Ouvrir",
        body: "Ouvrez-le comme vous voulez : les tronçons se déploient droits, ou en angle.",
      },
      {
        image: "hang",
        title: "Suspendre",
        body: "Suspendez les vêtements aux cintres, et posez chaque cintre sur les crochets sous le tronçon.",
      },
      {
        image: "folded",
        title: "Replier",
        body: "Quand vous avez fini, repliez-le contre le mur. Il ne prend plus de place, et il convient aux petits espaces.",
      },
    ],
    spacesTitle: "Où le fixer",
    places: ["Balcon", "Salle de bain", "Buanderie", "Chambre"],
    faqTitle: "Questions",
    faqs: [
      {
        q: "Comment se fixe-t-il ?",
        a: "Il se fixe au mur par la plaque visible sur les photos. Le détail de la pose est confirmé avec vous par téléphone, avant l’envoi.",
      },
      {
        q: "Quel est le délai ?",
        a: "La livraison est gratuite dans toutes les villes du Maroc. Le délai annoncé est de 2 à 5 jours ouvrables. Nous vous appelons pour confirmer la commande avant l’expédition. Les dimanches et jours fériés ne sont pas comptés, sauf mention contraire.",
      },
      {
        q: "Quand est-ce que je paie ?",
        a: "Paiement à la livraison. Aucun paiement n’est demandé à l’avance sur le site.",
      },
      {
        q: "Puis-je le retourner ?",
        a: "S’il arrive abîmé ou cassé, contactez-nous dans les 48 heures après réception et envoyez des photos et une vidéo. Pour un retour parce que vous avez changé d’avis, le produit doit être inutilisé et les frais de retour sont à votre charge. Si le défaut vient de nous, nous prenons les frais de retour. Le détail est dans la politique de retour.",
      },
    ],
    orderTitle: "Confirmer la commande",
    offerTitle: "Choisissez le nombre",
    offers: {
      1: "1 étendoir",
      2: "2 étendoirs",
      3: "3 étendoirs",
    },
    save: "Économisez",
    orderLead: "349 DH · Livraison gratuite · Paiement à la livraison",
    name: "Nom complet",
    namePlaceholder: "Nom et prénom",
    phone: "Téléphone",
    phonePlaceholder: "06XXXXXXXX",
    city: "Ville",
    cityPlaceholder: "Choisir la ville",
    addressNote: "L’adresse complète est confirmée avec vous pendant l’appel.",
    submit: "Confirmer — 349 DH",
    submitting: "Enregistrement...",
    errors: {
      name: "Indiquez le nom complet",
      phone: "Indiquez un numéro marocain qui commence par 06 ou 07",
      city: "Choisissez la ville",
      generic: "La commande n’a pas pu être enregistrée. Réessayez.",
      unavailable:
        "Le service de commande est indisponible pour le moment. Le bouton de confirmation reste désactivé, et aucune commande n’est enregistrée. Réessayez lorsque le service revient.",
      retry: "Vérifier à nouveau",
    },
    footerNote: "SHAMANGARO",
    footerPolicies: "Politiques de la page",
    copyright: "© 2026 SHAMANGARO — Tous droits réservés",
    links: [
      { href: "/products/etendoir-mural/shipping", label: "Livraison" },
      { href: "/products/etendoir-mural/returns", label: "Retours" },
      { href: "/products/etendoir-mural/warranty", label: "Garantie" },
      { href: "/products/etendoir-mural/privacy", label: "Confidentialité" },
      { href: "/products/etendoir-mural/terms", label: "Conditions" },
    ],
  },
};
