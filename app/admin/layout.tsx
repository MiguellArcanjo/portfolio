import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-950">
      <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900">
        <div className="flex h-14 items-center border-b border-gray-200 dark:border-dark-700 px-4">
          <Link href="/admin" className="font-bold text-primary-500">
            Painel Admin
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
            className="block rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="block rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500"
          >
            Projetos
          </Link>
          <Link
            href="/admin/skills"
            className="block rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500"
          >
            Habilidades
          </Link>
          <Link
            href="/admin/experience"
            className="block rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500"
          >
            Experiência
          </Link>
          <Link
            href="/admin/certificates"
            className="block rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500"
          >
            Certificados
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 text-sm"
          >
            Ver site →
          </a>
        </nav>
      </aside>
      <main className="pl-56 pt-4 pb-8 px-6">
        {children}
      </main>
    </div>
  );
}
