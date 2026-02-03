"use client";

import { motion } from "framer-motion";
import { HiHeart } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-white dark:bg-dark-950 border-t border-gray-200 dark:border-primary-500/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400"
        >
          <p className="flex items-center justify-center gap-2">
            {t.footer.rights} © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
