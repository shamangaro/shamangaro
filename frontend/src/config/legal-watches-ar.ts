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

export const WATCHES_AR_HOME = "/products/montres-femmes";

export interface WatchesArLegalPage {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

export const watchesArLegalPages: WatchesArLegalPage[] = [
  {
    slug: "/products/montres-femmes/about",
    title: "من نحن",
    subtitle: "SHAMANGARO · Montres Femmes",
    description:
      "SHAMANGARO Montres Femmes — ساعات نسائية أنيقة فالمغرب، 260 درهم، توصيل مجاني، الدفع عند الاستلام.",
    icon: Info,
  },
  {
    slug: "/products/montres-femmes/contact",
    title: "اتصل بنا",
    subtitle: "فريق Montres Femmes معاك",
    description:
      "تواصلي مع SHAMANGARO Montres Femmes عبر واتساب أو الإيميل لأي طلب ساعة، تبديل لون، أو سؤال على التوصيل.",
    icon: Phone,
  },
  {
    slug: "/products/montres-femmes/privacy",
    title: "سياسة الخصوصية",
    subtitle: "بياناتك لطلبات الساعات فقط",
    description:
      "سياسة الخصوصية ديال SHAMANGARO Montres Femmes — الاسم، الهاتف والمدينة كيتستعملو غير باش نأكدو ونوصلو طلب الساعة.",
    icon: Shield,
  },
  {
    slug: "/products/montres-femmes/terms",
    title: "الشروط والأحكام",
    subtitle: "طلبات الساعات فالمغرب",
    description:
      "شروط البيع ديال SHAMANGARO Montres Femmes — 260 درهم، الدفع عند الاستلام، تأكيد بالتيليفون قبل الشحن.",
    icon: FileText,
  },
  {
    slug: "/products/montres-femmes/shipping",
    title: "سياسة الشحن",
    subtitle: "توصيل مجاني لجميع مدن المغرب",
    description:
      "توصيل مجاني للساعات داخل المغرب، 1 حتى 3 أيام عمل، الدفع عند الاستلام.",
    icon: Truck,
  },
  {
    slug: "/products/montres-femmes/returns",
    title: "سياسة الاسترجاع والاستبدال",
    subtitle: "تبديل اللون وعيوب الاستلام",
    description:
      "الاسترجاع والتبديل ديال SHAMANGARO Montres Femmes — تبديل اللون ممكن، والعيب كيتبلغ فـ 48 ساعة من الاستلام.",
    icon: RefreshCw,
  },
  {
    slug: "/products/montres-femmes/warranty",
    title: "سياسة الضمان",
    subtitle: "التغطية عند استلام الساعة",
    description:
      "ضمان SHAMANGARO Montres Femmes — عيب التصنيع أو الكسر فالوصول كيتبلغ فـ 48 ساعة. ما كاينش ضمان ميكانيكي طويل معلن.",
    icon: BadgeCheck,
  },
];

export function getWatchesArLegalPage(slug: string) {
  return watchesArLegalPages.find((p) => p.slug === slug);
}

export const watchesArFooterGroups = [
  {
    title: "الموقع",
    links: [
      { href: "/products/montres-femmes/about", label: "من نحن" },
      { href: "/products/montres-femmes/contact", label: "اتصل بنا" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: "/products/montres-femmes/privacy", label: "سياسة الخصوصية" },
      { href: "/products/montres-femmes/terms", label: "الشروط والأحكام" },
    ],
  },
  {
    title: "السياسات",
    links: [
      { href: "/products/montres-femmes/shipping", label: "سياسة الشحن" },
      {
        href: "/products/montres-femmes/returns",
        label: "سياسة الاسترجاع والاستبدال",
      },
      { href: "/products/montres-femmes/warranty", label: "سياسة الضمان" },
    ],
  },
] as const;
