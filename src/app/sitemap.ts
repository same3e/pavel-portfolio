import type { MetadataRoute } from "next";
import { getProjectPath, locales, projectIds, site } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...locales.map((locale) => ({
      url: new URL(locale === "en" ? "/" : "/ru", site.productionUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1
    })),
    ...locales.flatMap((locale) => projectIds.map((projectId) => ({
      url: new URL(getProjectPath(projectId, locale), site.productionUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })))
  ];
}
