"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  featured: boolean;
};

export default function AdminProjectsPage() {
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Excluir este projeto?")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((p) => p.id !== id));
    else alert("Erro ao excluir");
  }

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projetos
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-primary-600 text-white px-4 py-2 font-semibold hover:bg-primary-500"
        >
          Novo projeto
        </Link>
      </div>
      <div className="space-y-4">
        {list.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700"
          >
            {p.image && (
              <img
                src={p.image}
                alt=""
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                {p.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {p.description}
              </p>
              {p.featured && (
                <span className="inline-block mt-1 text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded">
                  Destaque
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="rounded-lg border border-gray-300 dark:border-dark-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
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
          Nenhum projeto.{" "}
          <Link href="/admin/projects/new" className="text-primary-500 hover:underline">
            Criar o primeiro
          </Link>
        </p>
      )}
    </div>
  );
}
