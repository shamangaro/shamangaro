import type { EtendoirLang } from "./copy";

export const ETENDOIR_POLICIES = [
  "shipping",
  "returns",
  "warranty",
  "privacy",
  "terms",
] as const;

export type EtendoirPolicySlug = (typeof ETENDOIR_POLICIES)[number];

export type PolicyBlock = {
  title: string;
  paragraphs: string[];
  list?: string[];
  link?: { href: string; label: string };
};

export type EtendoirPolicy = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  blocks: PolicyBlock[];
};

type PolicySet = {
  back: string;
  updated: string;
  navLabel: string;
  pages: Record<EtendoirPolicySlug, EtendoirPolicy>;
};

const productAr =
  "مجفف ملابس جداري: علاقة سوداء كتثبت على الحيط. فيها 3 طرونصو، وكل طرونصو فيه 6 مناشير. كتخرج من الحيط باش تعلق الملابس، ومن بعد كتطوى قدام الحيط.";

const productFr =
  "Étendoir mural pliant : un étendoir noir fixé au mur. Il a 3 tronçons, et chaque tronçon a 6 crochets. Il s’ouvre depuis le mur pour suspendre les vêtements, puis se replie contre le mur.";

export const ETENDOIR_POLICY_COPY: Record<EtendoirLang, PolicySet> = {
  ar: {
    back: "رجوع للعلاقة",
    updated: "آخر تحديث: نونبر 2026 — SHAMANGARO · مجفف ملابس جداري",
    navLabel: "سياسات العلاقة",
    pages: {
      shipping: {
        label: "الشحن",
        title: "سياسة الشحن",
        subtitle: "توصيل مجاني لمجفف ملابس جداري",
        description:
          "توصيل مجاني لمجفف ملابس جداري في جميع مدن المغرب. 349 درهم، الدفع عند الاستلام، 2 إلى 5 أيام عمل.",
        blocks: [
          {
            title: "المنتج",
            paragraphs: [
              productAr,
              "الثمن 349 درهم للعلاقة الوحدة. جوج علاقات 599 درهم، و3 علاقات 799 درهم. التوصيل يبقى مجاني على العروض الثلاثة.",
            ],
          },
          {
            title: "فين كيوصل",
            paragraphs: [
              "كنوصلو لجميع مدن المغرب اللي كاينة فالطلب: الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير، وباقي المدن.",
            ],
          },
          {
            title: "شحال كيوصل",
            paragraphs: [
              "المدة المعلنة هي 2 إلى 5 أيام عمل. الأحد والعطل ما كيدخلوش فالحساب.",
              "كنتصلو بيك قبل ما يتسيفط الطلب باش نأكدو المدينة والعنوان.",
            ],
          },
          {
            title: "الدفع",
            paragraphs: [
              "الدفع عند الاستلام. ما كاينش خلاص مسبق فالموقع.",
            ],
          },
          {
            title: "مكالمة التوصيل",
            paragraphs: [
              "الموصّل يقدر يتصل بيك قبل ما يوصل. الرقم اللي دخلتي خاصو يكون صحيح.",
              "إلا ما رديتيش بزاف، التوصيل يقدر يتأخر. SHAMANGARO ما كتحملش التأخير اللي جا من عدم الرد.",
            ],
          },
          {
            title: "عند الاستلام",
            paragraphs: [
              "شوف الطرد إلا قدرتي. إلا بان كسر ولا عيب، صوّرو وصور الفيديو، وتواصل معانا خلال 48 ساعة. التفاصيل فسياسة الاسترجاع.",
            ],
          },
        ],
      },
      returns: {
        label: "الاسترجاع",
        title: "سياسة الاسترجاع",
        subtitle: "عيب ولا كسر، ولا بدلتي رأيك",
        description:
          "استرجاع مجفف ملابس جداري: عيب أو كسر خلال 48 ساعة. تغيير الرأي إلا كانت ما مستعملاتش، ومصاريف الرجوع على الزبون.",
        blocks: [
          {
            title: "عيب أو كسر",
            paragraphs: [
              "إلا وصلات العلاقة وفيها عيب ولا كسر، تواصل معانا خلال 48 ساعة من الاستلام.",
              "صيفط صور وفيديو للعلاقة وللتوضيب باش نتحققو.",
            ],
          },
          {
            title: "بدلتي رأيك",
            paragraphs: [
              "إلا بغيتي ترجّعها حيت بدلتي رأيك، خاصها تكون ما مستعملاتش وفي حالتها الأصلية مع التوضيب إلا بقا.",
              "ما كنقبلوش علاقة تهرسات من الاستعمال.",
            ],
          },
          {
            title: "شكون يخلّص الرجوع",
            paragraphs: [
              "إلا كان العيب من عندنا، مصاريف رجوع الشحن علينا.",
              "إلا كانت سليمة ورجّعتيها حيت بدلتي رأيك، مصاريف رجوع الشحن عليك.",
            ],
          },
          {
            title: "من بعد التحقق",
            paragraphs: [
              "من بعد ما نشوفو الصور والفيديو، نقدرو نعوّضو العلاقة بواحدة جديدة ولا نرجّعو الثمن، حسب الحالة.",
              "ما كاينش تبديل بلون آخر: العلاقة كاينة فالنسخة السوداء اللي باينة فالصور.",
            ],
          },
        ],
      },
      warranty: {
        label: "الضمان",
        title: "سياسة الضمان",
        subtitle: "ما معلناش ضمان طويل على هاد العلاقة",
        description:
          "مجفف ملابس جداري ما عندوش ضمان طويل معلن. العيب أو الكسر عند الوصول كيتبلغ خلال 48 ساعة.",
        blocks: [
          {
            title: "شنو معلن",
            paragraphs: [
              "ما كاينش ضمان سنة ولا ضمان ميكانيكي طويل معلن على مجفف ملابس جداري.",
              "اللي معلن هو بلاغ العيب أو الكسر خلال 48 ساعة من الاستلام، كما فسياسة الاسترجاع.",
            ],
          },
          {
            title: "شنو ما كيدخلش",
            paragraphs: ["إلا ما بان غير ذلك فالصفحة، ما كيدخلش:"],
            list: [
              "سوء الاستعمال ولا تعليق وزن ما مصمماتش ليه",
              "السقوط، الحرق، القطع، أو ضرر عرضي",
              "التآكل العادي من الاستعمال",
              "ضرر من تركيب مخالف للتوجيهات اللي كنأكدوها معاك فالمكالمة",
            ],
          },
          {
            title: "التركيب",
            paragraphs: [
              productAr,
              "كتثبت على الحيط باللوحة اللي باينة فالصور. تفاصيل التركيب كنتأكدو منها معاك فالمكالمة قبل الإرسال.",
            ],
          },
        ],
      },
      privacy: {
        label: "الخصوصية",
        title: "سياسة الخصوصية",
        subtitle: "معلومات الطلب ديال العلاقة",
        description:
          "سياسة الخصوصية لطلب مجفف ملابس جداري: الاسم، الهاتف والمدينة كيتستعملو باش نأكدو ونوصلو الطلب.",
        blocks: [
          {
            title: "شنو كنطلبو",
            paragraphs: [
              "باش تطلب مجفف ملابس جداري، كنطلبو الاسم الكامل، رقم الهاتف، والمدينة.",
              "العنوان الكامل كنأكدو منو معاك فالمكالمة قبل الإرسال. ما كيطلبوش فالصفحة.",
            ],
          },
          {
            title: "علاش",
            paragraphs: [
              "كنستعملو هاد المعلومات باش نأكدو الطلب، نتصلو بيك، ونوصلو العلاقة. ما كنستعملوهاش لشي حاجة خارجة على الطلب والدعم.",
            ],
          },
          {
            title: "ما كنبيعوش البيانات",
            paragraphs: [
              "الهاتف والعنوان كنشاركوهم غير مع شركة التوصيل اللي غادي توصل الطلب.",
              "SHAMANGARO ما كتبيعش وما كتكرّيش بيانات الزبناء.",
            ],
          },
          {
            title: "الحذف",
            paragraphs: [
              "كنحتفظو بالمعلومات اللي محتاجينها لمعالجة الطلب، وكنحدو الوصول ليها. كنلتزمو بالتشريع المغربي على المعطيات الشخصية.",
              "إلا بغيتي تحذف معلوماتك، تواصل معانا من صفحة اتصل بنا.",
            ],
            link: { href: "/contact", label: "اتصل بنا" },
          },
        ],
      },
      terms: {
        label: "الشروط",
        title: "الشروط والأحكام",
        subtitle: "طلب مجفف ملابس جداري",
        description:
          "شروط طلب مجفف ملابس جداري من SHAMANGARO: 349 درهم، توصيل مجاني، الدفع عند الاستلام، والتأكيد بالهاتف.",
        blocks: [
          {
            title: "الطلب",
            paragraphs: [
              "ملي كتأكّد الطلب فصفحة العلاقة، كتقبل هاد الشروط وسياسة الخصوصية ديال نفس المنتج.",
              productAr,
            ],
          },
          {
            title: "الثمن",
            paragraphs: [
              "الثمن 349 درهم للعلاقة الوحدة، 599 درهم لجوج، و799 درهم لثلاثة. التوصيل مجاني لجميع مدن المغرب، والدفع عند الاستلام.",
              "الثمن المعتمد لطلبك هو اللي تأكّد معاك فالنداء قبل الشحن.",
            ],
          },
          {
            title: "الصور",
            paragraphs: [
              "الصور كتبيّن العلاقة السوداء، الطي، والمناشير. اللون أو الإضاءة يقدرو يتبدلو شوية حسب الشاشة.",
              "اللي غادي يوصلك هو هاد العلاقة، بالمواصفات المعلنة فصفحتها: 3 طرونصو، و6 مناشير فكل طرونصو.",
            ],
          },
          {
            title: "التأكيد",
            paragraphs: [
              "الطلب كيتسيفط من بعد ما نتصلو بيك ونأكدو الاسم، الهاتف، والعنوان.",
              "نقدرو نرفضو طلب فيه معلومات ناقصة أو خاطئة، ولا طلب ما قدرناش نأكدو مع الزبون.",
            ],
          },
          {
            title: "القانون",
            paragraphs: [
              "هاد الشروط خاضعة للقوانين المعمول بها فالمغرب. التأخير اللي جا من ظرف قاهر خارج على إرادتنا ما كيتحمّلش علينا.",
              "الشحن، الاسترجاع، والضمان ديال هاد العلاقة كاينين فالصفحات ديالها، وما كيبدلوش شروط كرسي Neo Transat ولا الساعات.",
            ],
          },
        ],
      },
    },
  },
  fr: {
    back: "Retour à l’étendoir",
    updated: "Dernière mise à jour : novembre 2026 — SHAMANGARO · Étendoir mural pliant",
    navLabel: "Politiques de l’étendoir",
    pages: {
      shipping: {
        label: "Livraison",
        title: "Livraison",
        subtitle: "Livraison gratuite de l’étendoir mural",
        description:
          "Livraison gratuite de l’étendoir mural pliant dans toutes les villes du Maroc. 349 DH, paiement à la livraison, 2 à 5 jours ouvrables.",
        blocks: [
          {
            title: "Le produit",
            paragraphs: [
              productFr,
              "Le prix est de 349 DH pour un étendoir, 599 DH pour deux, et 799 DH pour trois. La livraison reste gratuite.",
            ],
          },
          {
            title: "Où nous livrons",
            paragraphs: [
              "Nous livrons dans toutes les villes du Maroc proposées à la commande : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et les autres villes de la liste.",
            ],
          },
          {
            title: "Délai",
            paragraphs: [
              "Le délai annoncé est de 2 à 5 jours ouvrables. Les dimanches et jours fériés ne sont pas comptés.",
              "Nous vous appelons avant l’expédition pour confirmer la ville et l’adresse.",
            ],
          },
          {
            title: "Paiement",
            paragraphs: [
              "Paiement à la livraison. Aucun paiement n’est demandé à l’avance sur le site.",
            ],
          },
          {
            title: "Appel du livreur",
            paragraphs: [
              "Le livreur peut vous appeler avant le passage. Le numéro indiqué doit être correct.",
              "Si vous ne répondez pas à plusieurs reprises, la livraison peut être retardée. SHAMANGARO n’est pas responsable de ce retard.",
            ],
          },
          {
            title: "À la réception",
            paragraphs: [
              "Vérifiez le colis si vous le pouvez. En cas de casse ou de défaut, envoyez des photos et une vidéo, et contactez-nous dans les 48 heures. Le détail est dans la politique de retour.",
            ],
          },
        ],
      },
      returns: {
        label: "Retours",
        title: "Retours",
        subtitle: "Défaut, casse, ou changement d’avis",
        description:
          "Retour de l’étendoir mural pliant : défaut ou casse sous 48 heures. Changement d’avis seulement si le produit n’a pas été utilisé, frais de retour à votre charge.",
        blocks: [
          {
            title: "Défaut ou casse",
            paragraphs: [
              "S’il arrive abîmé ou cassé, contactez-nous dans les 48 heures après réception.",
              "Envoyez des photos et une vidéo de l’étendoir et de l’emballage.",
            ],
          },
          {
            title: "Changement d’avis",
            paragraphs: [
              "Pour un retour parce que vous avez changé d’avis, l’étendoir doit être inutilisé, dans son état d’origine, avec l’emballage si vous l’avez encore.",
              "Un étendoir abîmé par l’usage n’est pas repris.",
            ],
          },
          {
            title: "Qui paie le retour",
            paragraphs: [
              "Si le défaut vient de nous, nous prenons les frais de retour.",
              "S’il est en bon état et que vous le renvoyez parce que vous avez changé d’avis, les frais de retour sont à votre charge.",
            ],
          },
          {
            title: "Après vérification",
            paragraphs: [
              "Après les photos et la vidéo, nous pouvons remplacer l’étendoir ou rembourser, selon le cas.",
              "Il n’y a pas d’échange de couleur : l’étendoir est la version noire montrée sur les photos.",
            ],
          },
        ],
      },
      warranty: {
        label: "Garantie",
        title: "Garantie",
        subtitle: "Pas de garantie longue annoncée pour cet étendoir",
        description:
          "Aucune garantie longue n’est annoncée pour l’étendoir mural pliant. Un défaut ou une casse à l’arrivée se signale sous 48 heures.",
        blocks: [
          {
            title: "Ce qui est annoncé",
            paragraphs: [
              "Aucune garantie d’un an, ni garantie mécanique longue, n’est annoncée pour l’étendoir mural pliant.",
              "Ce qui est annoncé, c’est le signalement d’un défaut ou d’une casse dans les 48 heures après réception, comme dans la politique de retour.",
            ],
          },
          {
            title: "Ce qui n’est pas couvert",
            paragraphs: ["Sauf mention contraire sur la page, ceci n’est pas couvert :"],
            list: [
              "un mauvais usage ou une charge pour laquelle il n’est pas fait",
              "une chute, une brûlure, une coupure ou un dommage accidentel",
              "l’usure normale",
              "un dommage dû à une pose contraire aux indications confirmées avec vous par téléphone",
            ],
          },
          {
            title: "La pose",
            paragraphs: [
              productFr,
              "Il se fixe au mur par la plaque visible sur les photos. Le détail de la pose est confirmé avec vous par téléphone, avant l’envoi.",
            ],
          },
        ],
      },
      privacy: {
        label: "Confidentialité",
        title: "Confidentialité",
        subtitle: "Les informations de commande de l’étendoir",
        description:
          "Confidentialité de la commande de l’étendoir mural pliant : nom, téléphone et ville servent à confirmer et livrer la commande.",
        blocks: [
          {
            title: "Ce que nous demandons",
            paragraphs: [
              "Pour commander l’étendoir mural pliant, nous demandons le nom complet, le téléphone et la ville.",
              "L’adresse complète est confirmée avec vous pendant l’appel, avant l’envoi. Elle n’est pas demandée sur la page.",
            ],
          },
          {
            title: "Pourquoi",
            paragraphs: [
              "Ces informations servent à confirmer la commande, vous appeler et livrer l’étendoir. Nous ne les utilisons pas en dehors de la commande et du support.",
            ],
          },
          {
            title: "Pas de vente de données",
            paragraphs: [
              "Le téléphone et l’adresse ne sont partagés qu’avec le transporteur qui livre la commande.",
              "SHAMANGARO ne vend pas et ne loue pas les données des clients.",
            ],
          },
          {
            title: "Suppression",
            paragraphs: [
              "Nous conservons les informations nécessaires au traitement de la commande et nous en limitons l’accès. Nous respectons la loi marocaine sur les données personnelles.",
              "Pour demander la suppression de vos informations, contactez-nous depuis la page Contact.",
            ],
            link: { href: "/contact", label: "Contact" },
          },
        ],
      },
      terms: {
        label: "Conditions",
        title: "Conditions",
        subtitle: "Commande de l’étendoir mural pliant",
        description:
          "Conditions de commande de l’étendoir mural pliant SHAMANGARO : 349 DH, livraison gratuite, paiement à la livraison, confirmation par téléphone.",
        blocks: [
          {
            title: "La commande",
            paragraphs: [
              "En confirmant la commande sur la page de l’étendoir, vous acceptez ces conditions et la politique de confidentialité de ce produit.",
              productFr,
            ],
          },
          {
            title: "Le prix",
            paragraphs: [
              "Le prix est de 349 DH pour un étendoir, 599 DH pour deux, et 799 DH pour trois. La livraison est gratuite dans toutes les villes du Maroc, et le paiement se fait à la livraison.",
              "Le prix retenu pour votre commande est celui confirmé avec vous par téléphone avant l’expédition.",
            ],
          },
          {
            title: "Les photos",
            paragraphs: [
              "Les photos montrent l’étendoir noir, le pliage et les crochets. La couleur ou la lumière peuvent varier légèrement selon l’écran.",
              "Vous recevez cet étendoir, avec les caractéristiques annoncées : 3 tronçons, et 6 crochets par tronçon.",
            ],
          },
          {
            title: "Confirmation",
            paragraphs: [
              "La commande est expédiée après notre appel de confirmation du nom, du téléphone et de l’adresse.",
              "Nous pouvons refuser une commande incomplète, incorrecte, ou qu’il est impossible de confirmer avec le client.",
            ],
          },
          {
            title: "Droit applicable",
            paragraphs: [
              "Ces conditions relèvent du droit applicable au Maroc. Un retard dû à un cas de force majeure indépendant de notre volonté n’engage pas notre responsabilité.",
              "La livraison, le retour et la garantie de cet étendoir sont sur ses propres pages. Elles ne modifient pas les conditions du Neo Transat ni celles des montres.",
            ],
          },
        ],
      },
    },
  },
};

export function isEtendoirPolicy(value: string): value is EtendoirPolicySlug {
  return (ETENDOIR_POLICIES as readonly string[]).includes(value);
}

export function etendoirPolicyPath(slug: EtendoirPolicySlug, lang: EtendoirLang) {
  return `/products/etendoir-mural/${slug}?lang=${lang}`;
}
