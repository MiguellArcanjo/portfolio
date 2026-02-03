"use client";

import { motion } from "framer-motion";
import { HiExternalLink, HiCode, HiArrowLeft, HiCalendar, HiTag } from "react-icons/hi";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

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

export default function ProjectDetail({ project }: { project: Project }) {
  const { t, language } = useLanguage();

  const description = language === "pt" ? project.longDescription || project.description : project.longDescriptionEn || project.descriptionEn;
  const challenges = language === "pt" ? project.challenges : project.challengesEn;
  const solutions = language === "pt" ? project.solutions : project.solutionsEn;
  const date = language === "pt" ? project.date : project.dateEn;

  return (
    <section className="pt-20 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/#projects">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <HiArrowLeft />
              {t.projects.backToProjects}
            </motion.button>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Project Image */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border border-primary-500/20 bg-gradient-to-br from-primary-900/50 to-dark-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                {date && (
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <HiCalendar />
                    <span>{date}</span>
                  </div>
                )}
                <p className="text-lg text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <HiTag className="text-primary-400" />
                  <h3 className="text-lg font-semibold text-white">
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
                    {isPt ? "Ver Projeto" : "View Project"}
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg font-semibold transition-colors border border-gray-600"
                  >
                    <HiCode />
                    {isPt ? "Ver Código" : "View Code"}
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Long Description */}
        {(project.longDescription || project.longDescriptionEn) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary-400">
              {t.projects.aboutProject}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary-400">
              {isPt ? "Screenshots" : "Screenshots"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-lg overflow-hidden border border-primary-500/20 bg-dark-800"
                >
                  <img
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenges & Solutions */}
        {(challenges || solutions) && (
          <div className="grid md:grid-cols-2 gap-8">
            {challenges && challenges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-dark-800/50 rounded-lg p-6 border border-primary-500/20"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary-400">
                  {t.projects.challenges}
                </h3>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {solutions && solutions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-dark-800/50 rounded-lg p-6 border border-primary-500/20"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary-400">
                  {t.projects.solutions}
                </h3>
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
