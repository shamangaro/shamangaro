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

export const contactInfo = {
  whatsapp: "212679653509",
  whatsappDisplay: "06 79 65 35 09",
  email: "contact@shamangaro.ma",
  responseTime: "24 ساعة",
  businessHours: "من الإثنين إلى السبت",
};

export const businessInfo = {
  name: "SHAMANGARO",
  product: "Neo Transat",
  country: "المغرب",
};

export interface LegalPageMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

/** ترتيب منطقي للفooter والتنقل */
export const legalPages: LegalPageMeta[] = [
  {
    slug: "/about",
    title: "من نحن",
    subtitle: "علامة مغربية للحياة الخارجية",
    description:
      "تعرف على SHAMANGARO — علامة مغربية متخصصة في منتجات الراحة والحياة الخارجية، بما فيها Neo Transat.",
    icon: Info,
  },
  {
    slug: "/contact",
    title: "اتصل بنا",
    subtitle: "فريق SHAMANGARO معاك",
    description:
      "تواصل مع SHAMANGARO عبر واتساب أو البريد الإلكتروني. نجيبك خلال 24 ساعة في أيام العمل.",
    icon: Phone,
  },
  {
    slug: "/shipping",
    title: "سياسة الشحن",
    subtitle: "توصيل مجاني لجميع مدن المغرب",
    description:
      "سياسة الشحن و التوصيل المجاني في المغرب — من 2 إلى 5 أيام عمل، مع الدفع عند الاستلام.",
    icon: Truck,
  },
  {
    slug: "/returns",
    title: "سياسة الاسترجاع والاستبدال",
    subtitle: "حقك محفوظ و راحتك أولاً",
    description:
      "سياسة الاسترجاع و الاستبدال لـ Neo Transat — منتج معيب أو تالف: تواصل معنا خلال 48 ساعة.",
    icon: RefreshCw,
  },
  {
    slug: "/warranty",
    title: "سياسة الضمان",
    subtitle: "ضمان سنة ضد عيوب الصنع",
    description:
      "ضمان سنة على Neo Transat ضد عيوب التصنيع — لا يشمل سوء الاستخدام أو الأضرار العرضية.",
    icon: BadgeCheck,
  },
  {
    slug: "/privacy",
    title: "سياسة الخصوصية",
    subtitle: "نحترم خصوصيتك و نحمي معلوماتك",
    description:
      "سياسة الخصوصية لـ SHAMANGARO — كيف نجمع و نستعمل و نحمي معلوماتك عند طلب Neo Transat.",
    icon: Shield,
  },
  {
    slug: "/terms",
    title: "الشروط والأحكام",
    subtitle: "قواعد الطلب و الاستخدام",
    description:
      "الشروط و الأحكام العامة لموقع SHAMANGARO و طلبات Neo Transat داخل المغرب.",
    icon: FileText,
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
