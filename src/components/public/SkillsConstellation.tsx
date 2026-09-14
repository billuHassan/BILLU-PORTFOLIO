import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill, Project } from '../../types';
import { Cpu, Layers, Sparkles, Shield, Code, Layout, Box, Database, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SkillsConstellation: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categoryIcons: Record<string, React.ElementType> = {
    'cat-lang': Code,
    'cat-web': Layout,
    'cat-3d': Box,
    'cat-backend': Database,
    'cat-advisory': Shield,
  };

  const filteredSkills = activeCategory === 'all'
    ? data.skills
    : data.skills.filter(s => s.categoryId === activeCategory);

  // Find portfolio projects associated with the selected skill
  const getAssociatedProjects = (skill: Skill): Project[] => {
    const sNameLower = skill.name.toLowerCase();
    return data.projects.filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(sNameLower) || sNameLower.includes(t.toLowerCase()))
    );
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Engineering Competencies & Constellation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Technical Skills & Architecture Disciplines
        </h2>
        <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
          Comprehensive competency matrix spanning programming languages, distributed backend systems, 3D graphics pipelines, and cybersecurity audit frameworks.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-slate-950/70 backdrop-blur-xl text-slate-200 hover:text-white hover:bg-slate-900/80 border border-slate-700/60'
          }`}
        >
          All Domains ({data.skills.length})
        </button>

        {data.skillCategories.map(cat => {
          const Icon = categoryIcons[cat.id] || Layers;
          const count = data.skills.filter(s => s.categoryId === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-slate-950/70 backdrop-blur-xl text-slate-200 hover:text-white hover:bg-slate-900/80 border border-slate-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map(skill => {
          const categoryObj = data.skillCategories.find(c => c.id === skill.categoryId);
          const Icon = categoryIcons[skill.categoryId] || Layers;

          return (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="p-5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-slate-700/60 hover:border-cyan-400/60 transition-all duration-200 group hover:-translate-y-0.5 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                        {categoryObj?.name || 'General Engineering'}
                      </span>
                    </div>
                  </div>

                  {skill.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1 font-bold">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>

                {skill.description ? (
                  <p className="text-xs text-slate-200 mb-4 leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                ) : (
                  <p className="text-xs text-slate-300 mb-4 italic">
                    Tap to inspect technical scope and related implementations.
                  </p>
                )}
              </div>

              {/* Proficiency meter & Tap action indicator */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-200 font-medium">Proficiency Mastery</span>
                  <span className="text-cyan-300 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900/80 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono pt-1 group-hover:text-cyan-300">
                  <span>Tap to expand full explanation</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Detail Modal (Triggered on Tap/Click) */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/50 p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.8)] space-y-6 text-left ring-1 ring-cyan-500/30">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                {(() => {
                  const Icon = categoryIcons[selectedSkill.categoryId] || Layers;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">
                  {selectedSkill.name}
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                  {data.skillCategories.find(c => c.id === selectedSkill.categoryId)?.name || 'Technical Domain'}
                </span>
              </div>
            </div>

            {/* Mastery Level Gauge */}
            <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold">Technical Fluency & Execution</span>
                <span className="text-cyan-400 font-bold text-sm">{selectedSkill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-950/80 overflow-hidden border border-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>

            {/* Full Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Capability Overview
              </h4>
              <p className="text-sm text-slate-100 leading-relaxed bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60">
                {selectedSkill.description || `${selectedSkill.name} is leveraged across core production software systems, architecture design, and high-reliability pipelines.`}
              </p>
            </div>

            {/* Linked Portfolio Projects */}
            {(() => {
              const matchedProjects = getAssociatedProjects(selectedSkill);
              if (matchedProjects.length === 0) return null;

              return (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Implemented In Portfolio Projects ({matchedProjects.length})</span>
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {matchedProjects.map(proj => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setSelectedSkill(null);
                          setSelectedProject(proj);
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-cyan-500/40 transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {proj.title}
                          </div>
                          <div className="text-[11px] text-slate-300 font-mono">
                            {proj.category} • {proj.status}
                          </div>
                        </div>
                        <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs font-mono transition-colors border border-slate-700/60 cursor-pointer"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
