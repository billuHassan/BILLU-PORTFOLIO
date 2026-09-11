import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { FolderGit2, ExternalLink, Github, Sparkles, X, CheckCircle, Lightbulb, TrendingUp, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, selectedProject, setSelectedProject, setViewMode } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Mobile', '3D & Graphics'];

  const publishedProjects = data.projects.filter(p => p.published);
  const filteredProjects = filter === 'All'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Projects & Technical Systems
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Every project is a living database record representing real engineering challenges, architectural solutions, and quantified impact.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 self-start md:self-auto overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1"
          >
            {/* Top Media / Thumbnail */}
            <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
              <img
                src={proj.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={proj.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => {
                  // Safe fallback per spec
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Status and Category badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                  {proj.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md ${
                  proj.status === 'Completed'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                }`}>
                  {proj.status}
                </span>
              </div>

              {/* Dates */}
              <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300">
                {proj.dates}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 font-mono">
                  {proj.tagline}
                </p>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-500">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setViewMode('3d');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setSelectedProject(proj);
                    }}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-400 border border-cyan-500/20 text-xs"
                    title="Focus in 3D Universe"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
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
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
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

      {/* Deep Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-300">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedProject.dates} • {selectedProject.status}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400 font-mono mt-0.5">
                  {selectedProject.tagline}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Gallery */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-52">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.problem || 'Complex structural challenges across data latency, integration, and stakeholder governance.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.solution || 'Modular architecture implementing resilient APIs, decoupled components, and real-time synchronization.'}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Architectural Highlights & Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
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
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Quantified Metrics</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.metrics.map(metric => (
                    <span key={metric} className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                      ✓ {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned & Future Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {selectedProject.lessonsLearned && (
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedProject.lessonsLearned}</p>
                </div>
              )}

              {selectedProject.futurePlans && (
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Roadmap & Future Extensions</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedProject.futurePlans}</p>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Technologies & Libraries</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close Inspector
              </button>

              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700"
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
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2"
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
