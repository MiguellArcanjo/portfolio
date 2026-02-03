import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-gray-500 dark:text-gray-400 hover:text-primary-500"
        >
          ← Projetos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Novo projeto
        </h1>
      </div>
      <ProjectForm />
    </div>
  );
}
