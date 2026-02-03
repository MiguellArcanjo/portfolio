import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-20 pb-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-gray-300 mb-8">Projeto não encontrado</p>
          <Link href="/#projects">
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors">
              Voltar para Projetos
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
