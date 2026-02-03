import Link from "next/link";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/experience"
          className="text-gray-500 dark:text-gray-400 hover:text-primary-500"
        >
          ← Experiência
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nova experiência
        </h1>
      </div>
      <ExperienceForm />
    </div>
  );
}
