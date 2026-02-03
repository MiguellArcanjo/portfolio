"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CertificateFormData = {
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  date: string;
  dateEn: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  description: string;
  descriptionEn: string;
  ects: string | null;
};

const defaultData: CertificateFormData = {
  title: "",
  titleEn: "",
  issuer: "",
  issuerEn: "",
  date: "",
  dateEn: "",
  credentialId: "",
  credentialUrl: "",
  image: "",
  description: "",
  descriptionEn: "",
  ects: null,
};

function parseCertificate(data: Record<string, unknown>): CertificateFormData {
  return {
    title: String(data.title ?? ""),
    titleEn: String(data.titleEn ?? ""),
    issuer: String(data.issuer ?? ""),
    issuerEn: String(data.issuerEn ?? ""),
    date: String(data.date ?? ""),
    dateEn: String(data.dateEn ?? ""),
    credentialId: String(data.credentialId ?? ""),
    credentialUrl: String(data.credentialUrl ?? ""),
    image: String(data.image ?? ""),
    description: String(data.description ?? ""),
    descriptionEn: String(data.descriptionEn ?? ""),
    ects: data.ects != null ? String(data.ects) : null,
  };
}

export default function CertificateForm({
  initialData,
  certificateId,
}: {
  initialData?: Record<string, unknown>;
  certificateId?: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<CertificateFormData>(
    initialData ? parseCertificate(initialData) : defaultData
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
      const path = await uploadFile(file, "certificates");
      setData((d) => ({ ...d, image: path }));
    } catch (err) {
      alert("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...data,
        ects: data.ects === "" || data.ects == null ? null : data.ects,
      };
      const url = certificateId
        ? `/api/admin/certificates/${certificateId}`
        : "/api/admin/certificates";
      const method = certificateId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/certificates");
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
          Título (PT) *
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
          Título (EN)
        </label>
        <input
          type="text"
          value={data.titleEn}
          onChange={(e) => setData((d) => ({ ...d, titleEn: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Emissor (PT) *
          </label>
          <input
            type="text"
            value={data.issuer}
            onChange={(e) => setData((d) => ({ ...d, issuer: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Emissor (EN)
          </label>
          <input
            type="text"
            value={data.issuerEn}
            onChange={(e) => setData((d) => ({ ...d, issuerEn: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data (PT) *
          </label>
          <input
            type="text"
            value={data.date}
            onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))}
            placeholder="Abril 2022"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
            required
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
            placeholder="April 2022"
            className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ID da credencial
        </label>
        <input
          type="text"
          value={data.credentialId}
          onChange={(e) => setData((d) => ({ ...d, credentialId: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL do certificado
        </label>
        <input
          type="url"
          value={data.credentialUrl}
          onChange={(e) => setData((d) => ({ ...d, credentialUrl: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Imagem
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
          Descrição (PT)
        </label>
        <textarea
          value={data.description}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white"
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
          ECTS (opcional)
        </label>
        <input
          type="text"
          value={data.ects ?? ""}
          onChange={(e) =>
            setData((d) => ({ ...d, ects: e.target.value || null }))
          }
          placeholder="Ex: 6"
          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-gray-900 dark:text-white max-w-[8rem]"
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
          href="/admin/certificates"
          className="rounded-lg border border-gray-300 dark:border-dark-600 px-6 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
