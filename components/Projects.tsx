"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiExternalLink, HiCode, HiArrowRight } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";
import projectsData from "@/data/projects.json";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const { t, language } = useLanguage();
  const featuredProjects = projectsData.filter((p) => p.featured);
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-dark-900/50 relative"
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
            {t.projects.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t.projects.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full max-w-md flex-[1_1_100%] md:flex-[1_1_calc(50%-1rem)] lg:flex-[1_1_calc(33.333%-1.33rem)] min-w-0 bg-white dark:bg-dark-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-primary-500/20 hover:border-primary-500/50 transition-all group shadow-lg dark:shadow-none"
            >
                <div 
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                className="relative h-48 bg-gradient-to-br from-primary-100/50 to-gray-100 dark:from-primary-900/50 dark:to-dark-800 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-6xl text-primary-500/30">🚀</div>
                )}
              </div>

              <div className="p-6">
                <h3 
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                  className="text-xl font-semibold mb-2 text-white hover:text-primary-400 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {language === "pt" ? project.description : project.descriptionEn}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-primary-900/30 text-primary-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-dark-700 text-gray-400 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-center">
                  <motion.button
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {t.projects.viewProject}
                    <HiArrowRight />
                  </motion.button>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HiCode />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HiExternalLink />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
