"use client";

import Link from "next/link";
import Skills from "@/components/Skills";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

export default function SkillsPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden w-full pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/#skills"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors"
          >
            <span aria-hidden>←</span>
            {t.nav.home}
          </Link>
        </div>
        <Skills />
      </main>
      <Footer />
    </>
  );
}
