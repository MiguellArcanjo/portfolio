"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Experience = {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
};

export default function AdminExperiencePage() {
  const [list, setList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Excluir esta experiência?")) return;
    const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((e) => e.id !== id));
    else alert("Erro ao excluir");
  }

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Experiência
        </h1>
        <Link
          href="/admin/experience/new"
          className="rounded-lg bg-primary-600 text-white px-4 py-2 font-semibold hover:bg-primary-500"
        >
          Nova experiência
        </Link>
      </div>
      <div className="space-y-4">
        {list.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700"
          >
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {e.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {e.company} · {e.startDate}
                {e.current ? " (atual)" : e.endDate ? ` – ${e.endDate}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/experience/${e.id}/edit`}
                className="rounded-lg border border-gray-300 dark:border-dark-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(e.id)}
                className="rounded-lg border border-red-500/50 text-red-500 px-4 py-2 text-sm font-medium hover:bg-red-500/10"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma experiência.{" "}
          <Link href="/admin/experience/new" className="text-primary-500 hover:underline">
            Adicionar a primeira
          </Link>
        </p>
      )}
    </div>
  );
}
