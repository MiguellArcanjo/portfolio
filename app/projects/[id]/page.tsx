import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetail from "@/components/ProjectDetail";
import projectsData from "@/data/projects.json";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData.find((p) => p.id === parseInt(params.id));

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProjectDetail project={project} />
      <Footer />
    </main>
  );
}
