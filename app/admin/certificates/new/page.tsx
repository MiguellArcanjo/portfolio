import Link from "next/link";
import CertificateForm from "@/components/admin/CertificateForm";

export default function NewCertificatePage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/certificates"
          className="text-gray-500 dark:text-gray-400 hover:text-primary-500"
        >
          ← Certificados
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Novo certificado
        </h1>
      </div>
      <CertificateForm />
    </div>
  );
}
