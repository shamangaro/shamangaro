export const brandStatement =
  "علامة مغربية Premium للحياة الخارجية. نصمم منتجات تجمع بين الراحة، الجودة والأناقة.";

export const footerTrustBadges = [
  { icon: "check", label: "الدفع عند الاستلام" },
  { icon: "truck", label: "توصيل لجميع مدن المغرب" },
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
      "https://facebook.com/shamangaro"
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
