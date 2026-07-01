import { ProjectCase } from "@/components/ProjectCase";
import { projectById } from "@/content/portfolio";

export default function PavelPortfolioPage() {
  return <ProjectCase project={projectById["pavel-portfolio"]} />;
}
