"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiExternalLink, HiAcademicCap, HiCalendar, HiIdentification } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";
import certificatesData from "@/data/certificates.json";

export default function Certificates() {
  const { t, language } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificatesData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <section
      id="certificates"
      className="py-20 bg-white dark:bg-dark-900/50 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t.certificates.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t.certificates.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                setSelectedCertificate(certificate);
                setIsModalOpen(true);
              }}
              className="bg-white dark:bg-dark-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-primary-500/20 hover:border-primary-500/50 transition-all cursor-pointer group shadow-lg dark:shadow-none"
            >
              {/* Certificate Image/Icon */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100/50 to-gray-100 dark:from-primary-900/50 dark:to-dark-800 flex items-center justify-center overflow-hidden">
                {certificate.image ? (
                  <Image
                    src={certificate.image}
                    alt={language === "pt" ? certificate.title : certificate.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-6xl text-primary-500/30 group-hover:scale-110 transition-transform">
                    <HiAcademicCap />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {language === "pt" ? certificate.title : certificate.titleEn}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <HiAcademicCap className="text-primary-500" />
                    <span>{language === "pt" ? certificate.issuer : certificate.issuerEn}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <HiCalendar className="text-primary-500" />
                    <span>{language === "pt" ? certificate.date : certificate.dateEn}</span>
                  </div>

                  {certificate.ects && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                      <span>{certificate.ects} {t.certificates.ects}</span>
                    </div>
                  )}
                </div>

                {certificate.credentialUrl && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(certificate.credentialUrl!, "_blank");
                    }}
                    className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                  >
                    <HiExternalLink />
                    {t.certificates.viewCertificate}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <motion.div
                  className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-primary-500/20 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-primary-500/20 p-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === "pt" ? selectedCertificate.title : selectedCertificate.titleEn}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <div className="p-6 md:p-8">
                    {selectedCertificate.image && (
                      <div className="relative mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-primary-500/20 aspect-video w-full">
                        <Image
                          src={selectedCertificate.image}
                          alt={language === "pt" ? selectedCertificate.title : selectedCertificate.titleEn}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4 border border-gray-200 dark:border-primary-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <HiAcademicCap className="text-primary-500" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {t.certificates.issuedBy}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {language === "pt" ? selectedCertificate.issuer : selectedCertificate.issuerEn}
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4 border border-gray-200 dark:border-primary-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <HiCalendar className="text-primary-500" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {t.certificates.issuedOn}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {language === "pt" ? selectedCertificate.date : selectedCertificate.dateEn}
                          </p>
                        </div>
                      </div>

                      {selectedCertificate.credentialId && (
                        <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4 border border-gray-200 dark:border-primary-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <HiIdentification className="text-primary-500" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {t.certificates.credentialId}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white font-mono text-sm">
                            {selectedCertificate.credentialId}
                          </p>
                        </div>
                      )}

                      {selectedCertificate.ects && (
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200 dark:border-primary-500/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                              {t.certificates.ects}
                            </span>
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {selectedCertificate.ects}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedCertificate.description && (
                        <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4 border border-gray-200 dark:border-primary-500/20">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {language === "pt" ? selectedCertificate.description : selectedCertificate.descriptionEn}
                          </p>
                        </div>
                      )}

                      {selectedCertificate.credentialUrl && (
                        <motion.a
                          href={selectedCertificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                        >
                          <HiExternalLink />
                          {t.certificates.viewCertificate}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
