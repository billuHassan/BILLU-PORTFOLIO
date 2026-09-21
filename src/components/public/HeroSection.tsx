import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, FileText, CheckCircle2, ShieldCheck, Code2, Workflow, Terminal, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setActivePage, setIs3DInteractiveOverlay } = usePortfolio();
  const { profile } = data;

  return (
    <section id="hero-section" className="relative pt-6 sm:pt-10 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left text column */}
        <div className="flex-1 space-y-5">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0d1527]/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">{profile.status}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-semibold">{profile.location}</span>
          </div>

          {/* Main Title & Bio */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Hi, I'm <span className="text-cyan-400">{profile.name}</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-slate-200 font-display">
              {profile.title}
            </p>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {profile.tagline}
            </p>
          </div>

          {/* Engineering Pillars - Decluttered, high contrast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
            <div className="flex items-center gap-2.5 bg-[#0d1527]/90 p-3 rounded-xl border border-slate-700/80 text-slate-100 hover:border-cyan-500/60 transition-colors">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold">{profile.pillar1 || 'Tech Advisory & Risk Audit (Axcelasia)'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#0d1527]/90 p-3 rounded-xl border border-slate-700/80 text-slate-100 hover:border-indigo-500/60 transition-colors">
              <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-semibold">{profile.pillar2 || 'Full-Stack & 3D WebGL Architectures'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#0d1527]/90 p-3 rounded-xl border border-slate-700/80 text-slate-100 hover:border-emerald-500/60 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{profile.pillar3 || 'TAR UMT Software Eng • 3.72 CGPA'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#0d1527]/90 p-3 rounded-xl border border-slate-700/80 text-slate-100 hover:border-amber-500/60 transition-colors">
              <Workflow className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">SDLC CI/CD Continuous Delivery</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('projects')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects ({data.projects.filter(p => p.published).length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('sdlc')}
              className="px-4 py-2.5 rounded-xl bg-[#0d1527] hover:bg-[#131f38] text-slate-200 border border-slate-700 font-bold text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-cyan-400" />
              <span>SDLC & Stack</span>
            </button>

            <button
              onClick={() => setIs3DInteractiveOverlay(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 font-bold text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Enter 3D Cockpit</span>
            </button>
          </div>
        </div>

        {/* Right column: Identity Engineering Card */}
        <div className="w-full lg:w-96 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0d1527]/95 backdrop-blur-2xl border border-slate-800 p-5 shadow-2xl overflow-hidden">
            {/* Profile Avatar Frame */}
            <div className="relative mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-cyan-950/60 p-1 shadow-inner border border-cyan-500/40">
                <div className="w-full h-full rounded-[14px] bg-[#090f1d] flex items-center justify-center overflow-hidden">
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
                    <div className="text-2xl font-extrabold text-cyan-300 font-display">
                      BHM
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-28 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0d1527] flex items-center justify-center text-[8px] text-slate-950 font-extrabold" title="Available for hire">
                ✓
              </div>
            </div>

            {/* Quick Summary Spec */}
            <div className="text-center space-y-1 mb-3">
              <h3 className="text-lg font-bold text-white font-display">{profile.name}</h3>
              <p className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">{profile.candidateDegree || 'Software Engineering Candidate'}</p>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {profile.university || 'TAR UMT (Kuala Lumpur)'}
              </p>
            </div>

            {/* Metrics pills with clean dark engineering styling */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-700/80 text-center font-mono">
              <div className="p-2 rounded-xl bg-[#090f1d] border border-slate-700/80">
                <div className="text-sm font-bold text-cyan-300">{profile.cgpa || '3.72'}</div>
                <div className="text-[9px] text-slate-300 font-semibold mt-0.5">CGPA</div>
              </div>
              <div className="p-2 rounded-xl bg-[#090f1d] border border-slate-700/80">
                <div className="text-sm font-bold text-indigo-300">{profile.awardHighlight || 'Top 50'}</div>
                <div className="text-[9px] text-slate-300 font-semibold mt-0.5">GAP Award</div>
              </div>
              <div className="p-2 rounded-xl bg-[#090f1d] border border-slate-700/80">
                <div className="text-sm font-bold text-emerald-400">{profile.graduationDate || 'Nov 2026'}</div>
                <div className="text-[9px] text-slate-300 font-semibold mt-0.5">Graduation</div>
              </div>
            </div>

            {/* Spoken & Native Languages */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              {profile.languages.map(lang => (
                <span key={lang.name} className="px-2 py-0.5 rounded-lg bg-[#090f1d] border border-slate-800 text-[10px] font-mono text-slate-300 font-medium">
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
