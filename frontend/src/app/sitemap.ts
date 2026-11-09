import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://shamangaro.com";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/cart", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/montres-femmes", priority: 0.95, changeFrequency: "weekly" },
  { path: "/products/etendoir-mural", priority: 0.95, changeFrequency: "weekly" },
  { path: "/products/etendoir-mural/shipping", priority: 0.5, changeFrequency: "monthly" },
  { path: "/products/etendoir-mural/returns", priority: 0.5, changeFrequency: "monthly" },
  { path: "/products/etendoir-mural/warranty", priority: 0.5, changeFrequency: "monthly" },
  { path: "/products/etendoir-mural/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/products/etendoir-mural/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/fr/products/montres-femmes", priority: 0.95, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.6, changeFrequency: "monthly" },
  { path: "/returns", priority: 0.6, changeFrequency: "monthly" },
  { path: "/warranty", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
  { path: "/fr/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fr/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fr/shipping", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr/returns", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr/warranty", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/fr/terms", priority: 0.5, changeFrequency: "yearly" },
  { path: "/products/montres-femmes/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/montres-femmes/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/montres-femmes/shipping", priority: 0.6, changeFrequency: "monthly" },
  { path: "/products/montres-femmes/returns", priority: 0.6, changeFrequency: "monthly" },
  { path: "/products/montres-femmes/warranty", priority: 0.6, changeFrequency: "monthly" },
  { path: "/products/montres-femmes/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/products/montres-femmes/terms", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
