import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, FileText, Send, Sparkles, MapPin, CheckCircle2, ShieldCheck, Code2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, viewMode, setViewMode, setActivePage, setIs3DInteractiveOverlay } = usePortfolio();
  const { profile } = data;

  return (
    <section id="hero-section" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        {/* Left text column */}
        <div className="flex-1 space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profile.status}</span>
          </div>

          {/* Main Title & Bio */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">{profile.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-slate-200">
              {profile.title}
            </p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              {profile.tagline}
            </p>
          </div>

          {/* Pillars Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Tech Advisory & Risk Audit (Axcelasia)</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Full-Stack & 3D Computing (Three.js/WebGL)</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TAR UMT Software Eng • 3.72 CGPA</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => setActivePage('projects')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects ({data.projects.filter(p => p.published).length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('journey')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Journey & Resume</span>
            </button>

            <button
              onClick={() => setIs3DInteractiveOverlay(true)}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>3D Flight Mode</span>
            </button>
          </div>
        </div>

        {/* Right column: Identity Hologram Card */}
        <div className="w-full lg:w-96 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900/80 border border-slate-700/60 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors" />

            {/* Profile Avatar Frame */}
            <div className="relative mb-5 flex justify-center">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-1 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-indigo-300 font-display">
                      BHM
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-28 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[9px] text-white font-bold" title="Open for hire">
                ✓
              </div>
            </div>

            {/* Quick Summary Spec */}
            <div className="text-center space-y-2 mb-4">
              <h3 className="text-xl font-bold text-white font-display">{profile.name}</h3>
              <p className="text-xs font-mono text-cyan-400">Software Engineering Candidate</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tunku Abdul Rahman University of Management and Technology (TAR UMT)
              </p>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="text-base font-bold text-cyan-400">3.72</div>
                <div className="text-[10px] text-slate-500">CGPA</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="text-base font-bold text-indigo-400">Top 50</div>
                <div className="text-[10px] text-slate-500">GAP Award</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="text-base font-bold text-emerald-400">Nov 2026</div>
                <div className="text-[10px] text-slate-500">Graduation</div>
              </div>
            </div>

            {/* Language proficiency tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {profile.languages.map(lang => (
                <span key={lang.name} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
