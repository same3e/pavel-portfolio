import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCase } from "@/components/ProjectCase";
import { getAlternateLanguages, getProjectById, projectIds, site, type ProjectId } from "@/content/portfolio";

const locale = "ru";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isProjectId(slug: string): slug is ProjectId {
  return projectIds.includes(slug as ProjectId);
}

export function generateStaticParams() {
  return projectIds.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isProjectId(slug)) {
    return {};
  }

  const project = getProjectById(slug, locale);

  if (!project) {
    return {};
  }

  return {
    title: {
      absolute: project.seoTitle
    },
    description: project.seoDescription,
    alternates: {
      canonical: project.route,
      languages: getAlternateLanguages(project.route)
    },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: new URL(project.route, site.productionUrl),
      type: "article",
      locale: "ru_RU",
      alternateLocale: ["en_US"],
      images: [{ url: project.ogImage ?? "/ru/opengraph-image", width: 1200, height: 630, alt: project.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
      images: [project.ogImage ?? "/ru/opengraph-image"]
    }
  };
}

export default async function RussianProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  if (!isProjectId(slug)) {
    notFound();
  }

  const project = getProjectById(slug, locale);

  if (!project) {
    notFound();
  }

  return <ProjectCase project={project} locale={locale} />;
}
