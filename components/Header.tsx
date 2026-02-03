"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { HiMoon, HiSun, HiMenu, HiX } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "certificates", label: t.nav.certificates },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-950/90 backdrop-blur-md border-b border-gray-200 dark:border-primary-500/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 max-w-[100vw]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent cursor-pointer shrink-0"
          onClick={() => scrollToSection("home")}
        >
          Portfolio
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Language & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setLanguage("pt")}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
                language === "pt"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
                language === "en"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-primary-500/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
