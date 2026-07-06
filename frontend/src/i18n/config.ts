export const defaultLocale = "ar" as const;
export const locales = ["ar", "fr"] as const;

export type Locale = (typeof locales)[number];
