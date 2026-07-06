export type Locale = "ar" | "fr";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  defaultLocale: Locale;
  locales: Locale[];
}
