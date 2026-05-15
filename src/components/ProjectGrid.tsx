import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean;
  color: string;
  category: string;
}

interface ProjectGridProps {
  initialProjects: Project[];
}

const categories = ["All", "AI & RAG", "Enterprise", "Tools", "Personal"];

const ProjectGrid: React.FC<ProjectGridProps> = ({ initialProjects }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    let filtered = initialProjects;
    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    // Maintain "featured first" sort
    return [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [activeCategory, initialProjects]);

  return (
    <div className="mx-auto mt-12 px-6 lg:px-8 max-w-7xl">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border-2 ${
              activeCategory === category
                ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-105"
                : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-2xl"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {/* Color accent bar at top */}
              <div
                className={`h-2 ${
                  project.color === "red"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : project.color === "blue"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : project.color === "amber"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600"
                        : "bg-gradient-to-r from-green-500 to-green-600"
                }`}
              />

              {/* Project Content */}
              <div className="flex flex-col p-8 flex-1">
                <div className="flex-1">
                  {/* Category Badge - Glassmorphism */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-sm ${
                        project.color === "red"
                          ? "text-red-700 dark:text-red-300"
                          : project.color === "blue"
                            ? "text-blue-700 dark:text-blue-300"
                            : project.color === "amber"
                              ? "text-amber-800 dark:text-amber-300"
                              : "text-green-700 dark:text-green-300"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-7 text-gray-900 dark:text-white">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors duration-300 ${
                        project.color === "red"
                          ? "hover:text-red-600 dark:hover:text-red-400"
                          : project.color === "blue"
                            ? "hover:text-blue-600 dark:hover:text-blue-400"
                            : project.color === "amber"
                              ? "hover:text-amber-600 dark:hover:text-amber-400"
                              : "hover:text-green-600 dark:hover:text-green-400"
                      }`}
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => {
                    const colorClasses = [
                      "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-blue-700/10 dark:ring-blue-400/30",
                      "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-green-700/10 dark:ring-green-400/30",
                      "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 ring-amber-700/10 dark:ring-amber-400/30",
                      "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-red-700/10 dark:ring-red-400/30",
                    ];
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-transform hover:scale-110 cursor-default ${colorClass}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 pointer-events-none" />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectGrid;
