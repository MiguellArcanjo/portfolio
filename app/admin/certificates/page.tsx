"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
};

export default function AdminCertificatesPage() {
  const [list, setList] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/certificates")
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Excluir este certificado?")) return;
    const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((c) => c.id !== id));
    else alert("Erro ao excluir");
  }

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Certificados
        </h1>
        <Link
          href="/admin/certificates/new"
          className="rounded-lg bg-primary-600 text-white px-4 py-2 font-semibold hover:bg-primary-500"
        >
          Novo certificado
        </Link>
      </div>
      <div className="space-y-4">
        {list.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700"
          >
            {c.image && (
              <img
                src={c.image}
                alt=""
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                {c.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {c.issuer} · {c.date}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/certificates/${c.id}/edit`}
                className="rounded-lg border border-gray-300 dark:border-dark-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
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
          Nenhum certificado.{" "}
          <Link href="/admin/certificates/new" className="text-primary-500 hover:underline">
            Adicionar o primeiro
          </Link>
        </p>
      )}
    </div>
  );
}
