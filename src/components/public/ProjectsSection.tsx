import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { FolderGit2, ExternalLink, Github, Compass, X, CheckCircle, Lightbulb, TrendingUp, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, selectedProject, setSelectedProject, setIs3DInteractiveOverlay } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Mobile', '3D & Graphics', 'Web & Full-Stack'];

  const publishedProjects = data.projects.filter(p => p.published);
  const filteredProjects = filter === 'All'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3 shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Software Engineering Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Production Systems & Repositories
          </h2>
          <p className="mt-2 text-slate-200 text-sm max-w-2xl leading-relaxed">
            Full-stack architectures, mobile apps, and 3D graphics applications with clear technical outcomes and architectural decisions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#090f1d] border border-slate-800 self-start md:self-auto overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
            className="group relative flex flex-col justify-between rounded-3xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1 cursor-pointer"
          >
            {/* Top Media / Thumbnail */}
            <div className="relative h-44 w-full bg-[#090f1d] overflow-hidden">
              <img
                src={proj.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={proj.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-transparent to-transparent" />

              {/* Status and Category badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#090f1d]/90 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold shadow-md">
                  {proj.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md shadow-md ${
                  proj.status === 'Completed'
                    ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/90 border border-amber-500/50 text-amber-300'
                }`}>
                  {proj.status}
                </span>
              </div>

              {/* Dates */}
              <div className="absolute bottom-2 left-4 text-[11px] font-mono text-slate-300 font-bold drop-shadow-md">
                {proj.dates}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-bold text-cyan-400 font-mono">
                  {proj.tagline}
                </p>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed pt-1 font-normal">
                  {proj.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-[#090f1d] border border-slate-800 text-[10px] font-mono text-slate-300 font-medium">
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-[#090f1d] border border-slate-800 text-[10px] font-mono text-slate-500">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIs3DInteractiveOverlay(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setSelectedProject(proj);
                    }}
                    className="p-1.5 rounded-lg bg-[#090f1d] hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs shadow-sm cursor-pointer"
                    title="Focus in 3D Cockpit"
                  >
                    <Compass className="w-3.5 h-3.5" />
                  </button>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-[#090f1d] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
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
                      className="p-1.5 rounded-lg bg-[#090f1d] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
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

      {/* Deep Inspection Modal (Software Engineering Theme) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b1222] border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedProject.dates} • {selectedProject.status}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">
                  {selectedProject.tagline}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-[#090f1d] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Gallery */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-[#090f1d] h-48">
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
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                  {selectedProject.problem || 'Complex structural challenges across data latency, integration, and stakeholder governance.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {selectedProject.solution || 'Modular architecture implementing resilient APIs, decoupled components, and real-time synchronization.'}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Architectural Highlights & Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#090f1d] border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-mono font-bold shrink-0">{idx + 1}.</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics & Performance */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Quantified Metrics</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.metrics.map(metric => (
                    <span key={metric} className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-bold">
                      ✓ {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned & Future Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {selectedProject.lessonsLearned && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-1">
                  <div className="text-xs font-mono text-amber-300 flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">{selectedProject.lessonsLearned}</p>
                </div>
              )}

              {selectedProject.futurePlans && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-1">
                  <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-bold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Roadmap & Future Extensions</span>
                  </div>
                  <p className="text-xs text-cyan-200/90 leading-relaxed">{selectedProject.futurePlans}</p>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="pt-1">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-bold">Technologies & Libraries</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#090f1d] border border-slate-800 text-xs font-mono text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-[#090f1d] hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer"
              >
                Close Inspector
              </button>

              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#090f1d] hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
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
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
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

