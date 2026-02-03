"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import skillsData from "@/data/skills.json";
import { 
  SiPhp, 
  SiPython, 
  SiJavascript, 
  SiTypescript, 
  SiPostgresql,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiLaravel,
  SiFastapi,
  SiGit,
  SiDocker,
  SiLinux,
  SiMysql,
  SiTensorflow,
  SiPandas
} from "react-icons/si";
import { FaCode, FaDatabase, FaTools, FaGraduationCap } from "react-icons/fa";

export default function Skills() {
  const { t, language } = useLanguage();

  const skillCategories = [
    { key: "languages", label: t.skills.languages, icon: FaCode },
    { key: "frameworks", label: t.skills.frameworks, icon: FaCode },
    { key: "tools", label: t.skills.tools, icon: FaTools },
    { key: "learning", label: t.skills.learning, icon: FaGraduationCap },
  ];

  // Mapeamento de ícones para cada skill
  const skillIcons: { [key: string]: any } = {
    PHP: SiPhp,
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    SQL: FaDatabase,
    "Next.js": SiNextdotjs,
    React: SiReact,
    "Node.js": SiNodedotjs,
    Laravel: SiLaravel,
    FastAPI: SiFastapi,
    Git: SiGit,
    Docker: SiDocker,
    Linux: SiLinux,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    "Machine Learning": SiTensorflow,
    "Data Science": SiPandas,
    TensorFlow: SiTensorflow,
    Pandas: SiPandas,
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case "advanced":
        return {
          gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
          border: "border-green-500/30",
          text: "text-green-400",
          badge: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
          glow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
          iconBg: "bg-green-500/20",
        };
      case "intermediate":
        return {
          gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
          border: "border-blue-500/30",
          text: "text-blue-400",
          badge: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white",
          glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
          iconBg: "bg-blue-500/20",
        };
      case "beginner":
        return {
          gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          badge: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
          glow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]",
          iconBg: "bg-yellow-500/20",
        };
      default:
        return {
          gradient: "from-gray-500/20 via-gray-500/10 to-transparent",
          border: "border-gray-600/30",
          text: "text-gray-400",
          badge: "bg-gray-600/20 text-gray-400",
          glow: "",
          iconBg: "bg-gray-600/20",
        };
    }
  };

  const getLevelLabel = (level: string, lang: string) => {
    if (lang === "pt") {
      switch (level) {
        case "advanced":
          return "Avançado";
        case "intermediate":
          return "Intermediário";
        case "beginner":
          return "Iniciante";
        default:
          return level;
      }
    } else {
      switch (level) {
        case "advanced":
          return "Advanced";
        case "intermediate":
          return "Intermediate";
        case "beginner":
          return "Beginner";
        default:
          return level;
      }
    }
  };

  return (
    <section
      id="skills"
      className="py-20 bg-white dark:bg-dark-950 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t.skills.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === "pt" 
              ? "Tecnologias e ferramentas que utilizo para criar soluções inovadoras"
              : "Technologies and tools I use to create innovative solutions"}
          </p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            const categorySkills = skillsData[category.key as keyof typeof skillsData] as Array<{ name: string; level: string }>;
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                className="space-y-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-xl border border-primary-500/30">
                    <CategoryIcon className="text-primary-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {category.label}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mt-2" />
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map((skill, index) => {
                    const levelStyle = getLevelStyle(skill.level);
                    const SkillIcon = skillIcons[skill.name] || FaCode;
                    
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: (categoryIndex * 0.05) + (index * 0.02),
                          type: "spring",
                          stiffness: 200
                        }}
                        className={`group relative bg-gradient-to-br ${levelStyle.gradient} rounded-2xl p-6 border ${levelStyle.border} backdrop-blur-sm transition-all duration-150 cursor-default ${levelStyle.glow} hover:border-opacity-60 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden bg-white/80 dark:bg-transparent shadow-md dark:shadow-none`}
                      >
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className={`inline-flex p-3 rounded-xl ${levelStyle.iconBg} mb-4 group-hover:scale-110 transition-transform duration-150`}>
                            <SkillIcon className={`text-2xl ${levelStyle.text}`} />
                          </div>

                          {/* Skill Name */}
                          <h4 className={`text-lg font-bold mb-2 ${levelStyle.text} group-hover:text-white transition-colors duration-150`}>
                            {skill.name}
                          </h4>

                          {/* Level Badge */}
                          <div className="flex items-center justify-between mt-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelStyle.badge} shadow-lg`}>
                              {getLevelLabel(skill.level, language)}
                            </span>
                          </div>

                          {/* Progress indicator */}
                          <div className="mt-4 h-1 bg-dark-700/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 0.5, 
                                delay: (categoryIndex * 0.05) + (index * 0.02) + 0.1,
                                ease: "easeOut"
                              }}
                              className={`h-full bg-gradient-to-r ${
                                skill.level === "advanced" 
                                  ? "from-green-500 to-emerald-600" 
                                  : skill.level === "intermediate"
                                  ? "from-blue-500 to-cyan-600"
                                  : "from-yellow-500 to-orange-600"
                              }`}
                              style={{
                                width: skill.level === "advanced" ? "90%" : skill.level === "intermediate" ? "70%" : "50%"
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
