export const brandStatement =
  "علامة مغربية Premium للحياة الخارجية. نصمم منتجات تجمع بين الراحة، الجودة والأناقة.";

/** Central free-delivery copy — keep consistent across LP */
export const freeDelivery = {
  headline: "توصيل مجاني",
  subline: "لجميع مدن المغرب",
  detail: "2-5 أيام عمل · بدون مصاريف إضافية",
  full: "توصيل مجاني لجميع مدن المغرب",
} as const;

export const footerTrustBadges = [
  { icon: "check", label: "الدفع عند الاستلام" },
  { icon: "truck", label: freeDelivery.full },
  { icon: "shield", label: "ضمان سنة" },
  { icon: "star", label: "جودة Premium" },
] as const;

export const footerQuickLinkGroups = [
  {
    title: "الموقع",
    links: [
      { href: "/about", label: "من نحن" },
      { href: "/contact", label: "اتصل بنا" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/terms", label: "الشروط والأحكام" },
    ],
  },
  {
    title: "السياسات",
    links: [
      { href: "/shipping", label: "سياسة الشحن" },
      { href: "/returns", label: "سياسة الاسترجاع والاستبدال" },
      { href: "/warranty", label: "سياسة الضمان" },
    ],
  },
] as const;

export const footerQuickLinks = footerQuickLinkGroups.flatMap((group) =>
  group.links.map((link) => link)
);

function socialUrl(envValue: string | undefined, fallback: string): string {
  return envValue?.trim() || fallback;
}

export const socialLinks = [
  {
    name: "Instagram" as const,
    href: socialUrl(
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      "https://instagram.com/shamangaro"
    ),
    label: "Instagram",
  },
  {
    name: "Facebook" as const,
    href: socialUrl(
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      "https://www.facebook.com/people/Shamangaro/61574339571013/"
    ),
    label: "Facebook",
  },
  {
    name: "TikTok" as const,
    href: socialUrl(
      process.env.NEXT_PUBLIC_SOCIAL_TIKTOK,
      "https://tiktok.com/@shamangaro"
    ),
    label: "TikTok",
  },
];
