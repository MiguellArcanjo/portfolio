import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Use o painel <strong>localmente</strong> (<code className="bg-gray-200 dark:bg-dark-700 px-1 rounded">npm run dev</code>) para editar projetos, habilidades, experiência e certificados.
        As alterações são salvas nos arquivos JSON e em <code className="bg-gray-200 dark:bg-dark-700 px-1 rounded">public/</code>.
        Depois faça commit e deploy.
      </p>
      <p className="text-sm text-amber-600 dark:text-amber-400 mb-8">
        ⚠ Em produção (ex.: Vercel) o sistema de arquivos é somente leitura — o painel só grava quando rodado localmente.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/projects"
          className="block p-6 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 transition-colors"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Projetos</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Adicionar, editar ou remover projetos. Upload de imagens para public/projects/
          </p>
        </Link>
        <Link
          href="/admin/skills"
          className="block p-6 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 transition-colors"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Habilidades</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Editar skills destacadas e listas por categoria (linguagens, frameworks, etc.)
          </p>
        </Link>
        <Link
          href="/admin/experience"
          className="block p-6 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 transition-colors"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Experiência</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Adicionar, editar ou remover experiências profissionais
          </p>
        </Link>
        <Link
          href="/admin/certificates"
          className="block p-6 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 transition-colors"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Certificados</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Adicionar, editar ou remover certificados. Upload de imagens para public/certificates/
          </p>
        </Link>
      </div>
    </div>
  );
}
