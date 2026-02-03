"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiExternalLink, HiCode, HiX, HiCalendar, HiTag } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";
import { useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  descriptionEn: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  longDescription?: string;
  longDescriptionEn?: string;
  screenshots?: string[];
  challenges?: string[];
  challengesEn?: string[];
  solutions?: string[];
  solutionsEn?: string[];
  date?: string;
  dateEn?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  const description = language === "pt" ? project.longDescription || project.description : project.longDescriptionEn || project.descriptionEn;
  const challenges = language === "pt" ? project.challenges : project.challengesEn;
  const solutions = language === "pt" ? project.solutions : project.solutionsEn;
  const date = language === "pt" ? project.date : project.dateEn;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal - só o conteúdo interno rola (uma barra de rolagem) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-hidden flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-primary-500/20 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="flex-shrink-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-primary-500/20 p-4 flex justify-end z-10">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <HiX size={24} />
                  </motion.button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
                  {/* Project Header */}
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Project Image */}
                    <div className="md:w-1/2">
                      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-primary-500/20 bg-gradient-to-br from-primary-100/50 to-gray-100 dark:from-primary-900/50 dark:to-dark-800">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-8xl text-primary-500/30">🚀</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="md:w-1/2 space-y-6">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                          {project.title}
                        </h1>
                        {date && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                            <HiCalendar />
                            <span>{date}</span>
                          </div>
                        )}
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          {description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <HiTag className="text-primary-400" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t.projects.technologies}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary-900/30 text-primary-300 rounded-lg text-sm border border-primary-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                          >
                            <HiExternalLink />
                            {t.projects.viewProject}
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors border border-gray-300 dark:border-gray-600"
                          >
                            <HiCode />
                            {t.projects.viewCode}
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Long Description */}
                  {(project.longDescription || project.longDescriptionEn) && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-primary-400">
                        {t.projects.aboutProject}
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Screenshots */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-primary-400">
                        {t.projects.screenshots}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.screenshots.map((screenshot, index) => (
                          <div
                            key={index}
                            className="relative h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-primary-500/20 bg-gray-100 dark:bg-dark-800"
                          >
                            <Image
                              src={screenshot}
                              alt={`${project.title} screenshot ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenges & Solutions */}
                  {(challenges || solutions) && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {challenges && challenges.length > 0 && (
                        <div className="bg-dark-800/50 rounded-lg p-6 border border-primary-500/20">
                          <h3 className="text-xl font-bold mb-4 text-primary-400">
                            {t.projects.challenges}
                          </h3>
                          <ul className="space-y-2">
                            {challenges.map((challenge, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                <span className="text-primary-400 mt-1">•</span>
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {solutions && solutions.length > 0 && (
                        <div className="bg-dark-800/50 rounded-lg p-6 border border-primary-500/20">
                          <h3 className="text-xl font-bold mb-4 text-primary-400">
                            {t.projects.solutions}
                          </h3>
                          <ul className="space-y-2">
                            {solutions.map((solution, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                <span className="text-primary-400 mt-1">•</span>
                                <span>{solution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
