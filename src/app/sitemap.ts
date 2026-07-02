import type { MetadataRoute } from "next";
import { projects, site } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.productionUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    ...projects.map((project) => ({
      url: new URL(project.route, site.productionUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}

