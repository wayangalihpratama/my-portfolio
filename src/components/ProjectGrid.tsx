import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  achievements?: string[];
  tags: string[];
  link: string;
  featured: boolean;
  color: string;
  category: string;
  status?: string;
}

interface ProjectGridProps {
  initialProjects: Project[];
}

const categories = ["All", "Akvo Projects", "Personal Projects"];

const ProjectGrid: React.FC<ProjectGridProps> = ({ initialProjects }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState<"all" | "completed" | "in-development">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    let filtered = initialProjects;

    // Filter by Category
    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by Completion Status
    if (activeStatus !== "all") {
      filtered = filtered.filter(p => (p.status || "completed") === activeStatus);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Maintain "featured first" sort
    return [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [activeCategory, activeStatus, searchQuery, initialProjects]);

  return (
    <div className="mx-auto mt-12 px-6 lg:px-8 max-w-7xl">
      {/* Search & Status / Category Filter Header */}
      <div className="flex flex-col items-center gap-6 mb-12">
        {/* Search Bar & Result Counter */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or technologies (e.g. RAG, Python, Docker)..."
            className="w-full pl-10 pr-12 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Completion Status Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 text-xs font-semibold">
          <button
            onClick={() => setActiveStatus("all")}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeStatus === "all"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All Repos ({initialProjects.length})
          </button>
          <button
            onClick={() => setActiveStatus("completed")}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeStatus === "completed"
                ? "bg-emerald-600 text-white shadow-sm font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ✓ Completed / Production
          </button>
          <button
            onClick={() => setActiveStatus("in-development")}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeStatus === "in-development"
                ? "bg-amber-600 text-white shadow-sm font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            🧪 In-Development
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                  : "bg-transparent border-gray-300 dark:border-gray-700/80 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Counter Subtitle */}
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Showing <span className="font-bold text-gray-900 dark:text-white">{filteredProjects.length}</span> of {initialProjects.length} projects
        </div>
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
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/80 transition-all hover:ring-2 hover:ring-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Top Badges (Featured & Status) */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                {project.featured && (
                  <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-md">
                    ⭐ Featured
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${
                    (project.status || "completed") === "completed"
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                      : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 ring-1 ring-amber-500/30"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${ (project.status || "completed") === "completed" ? "bg-emerald-500" : "bg-amber-500 animate-pulse" }`}></span>
                  {(project.status || "completed") === "completed" ? "Completed" : "Active"}
                </span>
              </div>

              {/* Color accent bar at top */}
              <div
                className={`h-2 ${
                  project.color === "red"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : project.color === "blue"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : project.color === "amber"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                }`}
              />

              {/* Project Content */}
              <div className="flex flex-col p-8 flex-1">
                <div className="flex-1">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-sm ${
                        project.color === "red"
                          ? "text-red-700 dark:text-red-300"
                          : project.color === "blue"
                            ? "text-blue-700 dark:text-blue-300"
                            : project.color === "amber"
                              ? "text-amber-800 dark:text-amber-300"
                              : "text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-7 text-gray-900 dark:text-white flex items-center justify-between pr-24">
                    <span>{project.name}</span>
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => {
                    const colorClasses = [
                      "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-blue-700/10 dark:ring-blue-400/30",
                      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-emerald-700/10 dark:ring-emerald-400/30",
                      "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 ring-amber-700/10 dark:ring-amber-400/30",
                      "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-red-700/10 dark:ring-red-400/30",
                    ];
                    const colorClass = colorClasses[index % colorClasses.length];
                    return (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${colorClass}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 dark:text-gray-400">No projects found matching your status or search query.</p>
          <button
            onClick={() => { setActiveCategory("All"); setActiveStatus("all"); setSearchQuery(""); }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Deep-Dive Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 z-10 my-8"
            >
              {/* Header Accent Bar */}
              <div
                className={`h-3 ${
                  selectedProject.color === "red"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : selectedProject.color === "blue"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : selectedProject.color === "amber"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                }`}
              />

              <div className="p-6 sm:p-8">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {selectedProject.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${ (selectedProject.status || "completed") === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" }`}>
                    {(selectedProject.status || "completed") === "completed" ? "✓ Completed Production Project" : "🧪 Active Development Project"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                  {selectedProject.name}
                </h2>

                <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Key Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Architectural Highlights</h4>
                    <ul className="space-y-2">
                      {selectedProject.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                          <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {selectedProject.link && selectedProject.link !== "#" && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-md"
                    >
                      <span>View Repository</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;


