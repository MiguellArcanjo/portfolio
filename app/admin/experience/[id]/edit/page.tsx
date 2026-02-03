"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default function EditExperiencePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/experience/${id}`)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-500">Carregando...</p>;
  if (!data) return <p className="text-gray-500">Experiência não encontrada.</p>;

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
          Editar: {String(data.title)}
        </h1>
      </div>
      <ExperienceForm initialData={data} experienceId={Number(id)} />
    </div>
  );
}
