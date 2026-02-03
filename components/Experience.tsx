"use client";

import { motion } from "framer-motion";
import { HiBriefcase } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";
import experienceData from "@/data/experience.json";

export default function Experience() {
  const { t, language } = useLanguage();

  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-dark-950 relative overflow-x-hidden w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-[100vw] box-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto w-full min-w-0">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-6 sm:pl-8 pb-8 last:pb-0 border-l-2 border-primary-500/30 last:border-l-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-600 rounded-full border-2 border-white dark:border-dark-950 shrink-0" />
              
              <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-primary-500/20 hover:border-primary-500/50 transition-all shadow-md dark:shadow-none min-w-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 min-w-0">
                  <div className="p-3 bg-primary-600/20 rounded-lg shrink-0 w-fit">
                    <HiBriefcase className="text-primary-400" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {language === "pt" ? exp.title : exp.titleEn}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                      {language === "pt" ? exp.company : exp.companyEn}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {language === "pt" ? exp.location : exp.locationEn}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.current ? t.experience.current : exp.endDate}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 ml-0 sm:ml-12 list-none min-w-0">
                  {(language === "pt" ? exp.description : exp.descriptionEn).map((item, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start gap-2 min-w-0 break-words">
                      <span className="text-primary-400 mt-1 shrink-0">•</span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
