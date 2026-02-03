"use client";

import { useEffect, useState } from "react";

type SkillItem = { name: string; level: string };
type SkillsData = {
  featured: string[];
  languages: SkillItem[];
  frameworks: SkillItem[];
  tools: SkillItem[];
  learning: SkillItem[];
};

export default function AdminSkillsPage() {
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/skills")
      .then((r) => r.json())
      .then((data: SkillsData) => {
        setJson(JSON.stringify(data, null, 2));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const parsed = JSON.parse(json) as SkillsData;
      if (!Array.isArray(parsed.featured)) throw new Error("featured deve ser um array");
      if (!Array.isArray(parsed.languages)) throw new Error("languages deve ser um array");
      if (!Array.isArray(parsed.frameworks)) throw new Error("frameworks deve ser um array");
      if (!Array.isArray(parsed.tools)) throw new Error("tools deve ser um array");
      if (!Array.isArray(parsed.learning)) throw new Error("learning deve ser um array");
      setSaving(true);
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Salvo!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "JSON inválido");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Habilidades
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Edite o JSON abaixo. <code>featured</code> = até 3 nomes para a home. Cada categoria é um array de {"{ name, level }"} com level: advanced, intermediate ou beginner.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 text-sm">
            {error}
          </div>
        )}
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={28}
          className="w-full max-w-2xl font-mono text-sm rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-3 text-gray-900 dark:text-white"
          spellCheck={false}
        />
        <div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary-600 text-white px-6 py-2 font-semibold hover:bg-primary-500 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
