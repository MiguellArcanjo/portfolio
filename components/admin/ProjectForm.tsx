"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormData = {
  title: string;
  description: string;
  descriptionEn: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  longDescription: string;
  longDescriptionEn: string;
  date: string;
  dateEn: string;
  screenshots: string[];
  challenges: string[];
  challengesEn: string[];
  solutions: string[];
  solutionsEn: string[];
};

const defaultData: ProjectFormData = {
  title: "",
  description: "",
  descriptionEn: "",
  image: "",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
  longDescription: "",
  longDescriptionEn: "",
  date: "",
  dateEn: "",
  screenshots: [],
  challenges: [],
  challengesEn: [],
  solutions: [],
  solutionsEn: [],
};

function parseProject(data: Record<string, unknown>): ProjectFormData {
  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    descriptionEn: String(data.descriptionEn ?? ""),
    image: String(data.image ?? ""),
    technologies: Array.isArray(data.technologies) ? data.technologies.map(String) : [],
    githubUrl: String(data.githubUrl ?? ""),
    liveUrl: String(data.liveUrl ?? ""),
    featured: Boolean(data.featured),
    longDescription: String(data.longDescription ?? ""),
    longDescriptionEn: String(data.longDescriptionEn ?? ""),
    date: String(data.date ?? ""),
    dateEn: String(data.dateEn ?? ""),
    screenshots: Array.isArray(data.screenshots) ? data.screenshots.map(String) : [],
    challenges: Array.isArray(data.challenges) ? data.challenges.map(String) : [],
    challengesEn: Array.isArray(data.challengesEn) ? data.challengesEn.map(String) : [],
    solutions: Array.isArray(data.solutions) ? data.solutions.map(String) : [],
    solutionsEn: Array.isArray(data.solutionsEn) ? data.solutionsEn.map(String) : [],
  };
}

export default function ProjectForm({
  initialData,
  projectId,
}: {
  initialData?: Record<string, unknown>;
  projectId?: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<ProjectFormData>(
    initialData ? parseProject(initialData) : defaultData
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function uploadFile(file: File, folder: "projects" | "certificates") {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Erro no upload");
    const json = await res.json();
    return json.path as string;
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = await uploadFile(file, "projects");
      setData((d) => ({ ...d, image: path }));
    } catch (err) {
      alert("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  }

  async function handleScreenshotsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const paths: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const path = await uploadFile(files[i], "projects");
        paths.push(path);
      }
      setData((d) => ({ ...d, screenshots: [...d.screenshots, ...paths] }));
    } catch (err) {
      alert("Erro ao enviar imagens");
    } finally {
      setUploading(false);
    }
  }

  function removeScreenshot(index: number) {
    setData((d) => ({ ...d, screenshots: d.screenshots.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...data,
        technologies: data.technologies.filter(Boolean),
        challenges: data.challenges.filter(Boolean),
        challengesEn: data.challengesEn.filter(Boolean),
        solutions: data.solutions.filter(Boolean),
        solutionsEn: data.solutionsEn.filter(Boolean),
      };
      const url = projectId ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
      const method = projectId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Título *
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
          Descrição (PT) *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição (EN)
        </label>
        <textarea
          value={data.descriptionEn}
          onChange={(e) => setData((d) => ({ ...d, descriptionEn: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Imagem principal
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
        {data.image && (
          <div className="mt-2 flex items-center gap-2">
            <img src={data.image} alt="" className="h-20 w-auto rounded object-cover" />
            <span className="text-sm text-gray-500">{data.image}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tecnologias (separadas por vírgula)
        </label>
        <input
          type="text"
          value={data.technologies.join(", ")}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            }))
          }
          placeholder="Python, Pandas, Streamlit"
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={data.githubUrl}
            onChange={(e) => setData((d) => ({ ...d, githubUrl: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Live URL
          </label>
          <input
            type="url"
            value={data.liveUrl}
            onChange={(e) => setData((d) => ({ ...d, liveUrl: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={data.featured}
          onChange={(e) => setData((d) => ({ ...d, featured: e.target.checked }))}
          className="rounded border-gray-300 dark:border-dark-600"
        />
        <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
          Projeto em destaque
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data (PT)
          </label>
          <input
            type="text"
            value={data.date}
            onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))}
            placeholder="Fevereiro 2025"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data (EN)
          </label>
          <input
            type="text"
            value={data.dateEn}
            onChange={(e) => setData((d) => ({ ...d, dateEn: e.target.value }))}
            placeholder="February 2025"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição longa (PT)
        </label>
        <textarea
          value={data.longDescription}
          onChange={(e) => setData((d) => ({ ...d, longDescription: e.target.value }))}
          rows={4}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição longa (EN)
        </label>
        <textarea
          value={data.longDescriptionEn}
          onChange={(e) => setData((d) => ({ ...d, longDescriptionEn: e.target.value }))}
          rows={4}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Screenshots (várias imagens)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleScreenshotsChange}
          disabled={uploading}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {data.screenshots.map((path, i) => (
            <div key={i} className="relative">
              <img src={path} alt="" className="h-16 w-auto rounded object-cover" />
              <button
                type="button"
                onClick={() => removeScreenshot(i)}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Desafios (PT) — um por linha
        </label>
        <textarea
          value={data.challenges.join("\n")}
          onChange={(e) =>
            setData((d) => ({ ...d, challenges: e.target.value.split("\n").filter(Boolean) }))
          }
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Desafios (EN) — um por linha
        </label>
        <textarea
          value={data.challengesEn.join("\n")}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              challengesEn: e.target.value.split("\n").filter(Boolean),
            }))
          }
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Soluções (PT) — um por linha
        </label>
        <textarea
          value={data.solutions.join("\n")}
          onChange={(e) =>
            setData((d) => ({ ...d, solutions: e.target.value.split("\n").filter(Boolean) }))
          }
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Soluções (EN) — um por linha
        </label>
        <textarea
          value={data.solutionsEn.join("\n")}
          onChange={(e) =>
            setData((d) => ({
              ...d,
              solutionsEn: e.target.value.split("\n").filter(Boolean),
            }))
          }
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-lg bg-primary-600 text-white px-6 py-2 font-semibold hover:bg-primary-500 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <a
          href="/admin/projects"
          className="rounded-lg border border-gray-300 dark:border-dark-600 px-6 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
