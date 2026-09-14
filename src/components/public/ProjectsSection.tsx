import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { FolderGit2, ExternalLink, Github, Sparkles, X, CheckCircle, Lightbulb, TrendingUp, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, selectedProject, setSelectedProject, setViewMode } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Mobile', '3D & Graphics', 'Web & Full-Stack'];

  const publishedProjects = data.projects.filter(p => p.published);
  const filteredProjects = filter === 'All'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-3 shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Projects & Technical Systems
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Real production systems, full-stack architectures, and mobile applications developed by Bilal Hassan Mussa with quantified technical outcomes.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with generous whitespace and uncrowded cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            onClick={() => setSelectedProject(proj)}
            className="group relative flex flex-col justify-between rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-sky-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            {/* Top Media / Thumbnail */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img
                src={proj.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={proj.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Status and Category badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-sky-700 font-semibold shadow-sm">
                  {proj.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md shadow-sm ${
                  proj.status === 'Completed'
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-700'
                    : 'bg-amber-50 border border-amber-300 text-amber-700'
                }`}>
                  {proj.status}
                </span>
              </div>

              {/* Dates */}
              <div className="absolute bottom-3 left-4 text-xs font-mono text-white font-bold drop-shadow-md">
                {proj.dates}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-semibold text-sky-700 font-mono">
                  {proj.tagline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                  {proj.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 font-medium">
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-xs font-semibold text-sky-600 group-hover:text-sky-700 flex items-center gap-1.5 transition-colors">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('3d');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setSelectedProject(proj);
                    }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-sky-700 border border-slate-200 text-xs shadow-sm cursor-pointer"
                    title="Focus in 3D Architecture Canvas"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm cursor-pointer"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm cursor-pointer"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Inspection Modal (Light Developer Spec Theme) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 text-slate-800">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-semibold">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {selectedProject.dates} • {selectedProject.status}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-medium text-sky-700 font-mono mt-0.5">
                  {selectedProject.tagline}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Gallery */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-52">
                    <img
                      src={img}
                      alt={`${selectedProject.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Solution Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-800 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed">
                  {selectedProject.problem || 'Complex structural challenges across data latency, integration, and stakeholder governance.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  {selectedProject.solution || 'Modular architecture implementing resilient APIs, decoupled components, and real-time synchronization.'}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  <span>Architectural Highlights & Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-sky-600 font-mono font-bold shrink-0">{idx + 1}.</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics & Performance */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Quantified Metrics</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.metrics.map(metric => (
                    <span key={metric} className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
                      ✓ {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned & Future Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {selectedProject.lessonsLearned && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
                  <div className="text-xs font-mono text-amber-800 flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-xs text-amber-950/80 leading-relaxed">{selectedProject.lessonsLearned}</p>
                </div>
              )}

              {selectedProject.futurePlans && (
                <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/70 space-y-1">
                  <div className="text-xs font-mono text-sky-800 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Roadmap & Future Extensions</span>
                  </div>
                  <p className="text-xs text-sky-950/80 leading-relaxed">{selectedProject.futurePlans}</p>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="pt-1">
              <div className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Technologies & Libraries</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 cursor-pointer"
              >
                Close Inspector
              </button>

              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-200 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
