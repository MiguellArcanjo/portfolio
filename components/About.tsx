"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 bg-gray-50 dark:bg-dark-900/50 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {t.about.description}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t.about.description2}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
