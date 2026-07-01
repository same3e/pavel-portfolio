import { ProjectCase } from "@/components/ProjectCase";
import { projectById } from "@/content/portfolio";

export default function ThaiNariPage() {
  return <ProjectCase project={projectById["thai-nari"]} />;
}
