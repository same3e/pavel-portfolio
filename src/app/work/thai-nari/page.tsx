import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { projectById, site } from "@/content/portfolio";

const project = projectById["thai-nari"];

export const metadata: Metadata = {
  title: {
    absolute: project.seoTitle
  },
  description: project.seoDescription,
  alternates: {
    canonical: project.route
  },
  openGraph: {
    title: project.seoTitle,
    description: project.seoDescription,
    url: new URL(project.route, site.productionUrl),
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: project.seoTitle,
    description: project.seoDescription
  }
};

export default function ThaiNariPage() {
  return <ProjectCase project={project} />;
}
