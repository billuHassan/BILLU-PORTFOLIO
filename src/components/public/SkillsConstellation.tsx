import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Cpu, Check, Layers, Sparkles, Shield, Code, Layout, Box, Database } from 'lucide-react';

export const SkillsConstellation: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categoryIcons: Record<string, any> = {
    'cat-lang': Code,
    'cat-web': Layout,
    'cat-3d': Box,
    'cat-backend': Database,
    'cat-advisory': Shield,
  };

  const filteredSkills = activeCategory === 'all'
    ? data.skills
    : data.skills.filter(s => s.categoryId === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Competencies & Constellation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Technical Skills & Advisory Disciplines
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Dynamic matrix covering programming languages, frameworks, graphics pipelines, and governance consulting frameworks.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
            activeCategory === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
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
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75">({count})</span>
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
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 backdrop-blur-sm group hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {categoryObj?.name || 'General'}
                    </span>
                  </div>
                </div>

                {skill.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured
                  </span>
                )}
              </div>

              {skill.description && (
                <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              )}

              {/* Proficiency meter */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Proficiency Mastery</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
