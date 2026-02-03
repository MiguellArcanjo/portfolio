"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ExperienceFormData = {
  title: string;
  titleEn: string;
  company: string;
  companyEn: string;
  location: string;
  locationEn: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  descriptionEn: string[];
};

const defaultData: ExperienceFormData = {
  title: "",
  titleEn: "",
  company: "",
  companyEn: "",
  location: "",
  locationEn: "",
  startDate: "",
  endDate: "",
  current: false,
  description: [],
  descriptionEn: [],
};

function parseExperience(data: Record<string, unknown>): ExperienceFormData {
  return {
    title: String(data.title ?? ""),
    titleEn: String(data.titleEn ?? ""),
    company: String(data.company ?? ""),
    companyEn: String(data.companyEn ?? ""),
    location: String(data.location ?? ""),
    locationEn: String(data.locationEn ?? ""),
    startDate: String(data.startDate ?? ""),
    endDate: String(data.endDate ?? ""),
    current: Boolean(data.current),
    description: Array.isArray(data.description) ? data.description.map(String) : [],
    descriptionEn: Array.isArray(data.descriptionEn) ? data.descriptionEn.map(String) : [],
  };
}

export default function ExperienceForm({
  initialData,
  experienceId,
}: {
  initialData?: Record<string, unknown>;
  experienceId?: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<ExperienceFormData>(
    initialData ? parseExperience(initialData) : defaultData
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...data,
        endDate: data.current ? null : data.endDate || null,
        description: data.description.filter(Boolean),
        descriptionEn: data.descriptionEn.filter(Boolean),
      };
      const url = experienceId
        ? `/api/admin/experience/${experienceId}`
        : "/api/admin/experience";
      const method = experienceId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/experience");
      router.refresh();
    } catch (err) {
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cargo (PT) *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cargo (EN)
          </label>
          <input
            type="text"
            value={data.titleEn}
            onChange={(e) => setData((d) => ({ ...d, titleEn: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Empresa (PT) *
          </label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Empresa (EN)
          </label>
          <input
            type="text"
            value={data.companyEn}
            onChange={(e) => setData((d) => ({ ...d, companyEn: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Local (PT)
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))}
            placeholder="João Pessoa, PB"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Local (EN)
          </label>
          <input
            type="text"
            value={data.locationEn}
            onChange={(e) => setData((d) => ({ ...d, locationEn: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Início *
          </label>
          <input
            type="text"
            value={data.startDate}
            onChange={(e) => setData((d) => ({ ...d, startDate: e.target.value }))}
            placeholder="Maio 2025"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fim (deixe vazio se atual)
          </label>
          <input
            type="text"
            value={data.endDate}
            onChange={(e) => setData((d) => ({ ...d, endDate: e.target.value }))}
            placeholder="Jun 2024"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            disabled={data.current}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current"
          checked={data.current}
          onChange={(e) => setData((d) => ({ ...d, current: e.target.checked }))}
          className="rounded border-gray-300 dark:border-dark-600"
        />
        <label htmlFor="current" className="text-sm text-gray-700 dark:text-gray-300">
          Emprego atual
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição (PT) — um item por linha *
        </label>
        <textarea
          value={data.description.join("\n")}
          onChange={(e) =>
            setData((d) => ({ ...d, description: e.target.value.split("\n").filter(Boolean) }))
          }
          rows={6}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição (EN) — um item por linha
        </label>
        <textarea
          value={data.descriptionEn.join("\n")}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              descriptionEn: e.target.value.split("\n").filter(Boolean),
            }))
          }
          rows={6}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary-600 text-white px-6 py-2 font-semibold hover:bg-primary-500 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <a
          href="/admin/experience"
          className="rounded-lg border border-gray-300 dark:border-dark-600 px-6 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
