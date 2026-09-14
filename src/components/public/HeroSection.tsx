import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, FileText, Sparkles, MapPin, CheckCircle2, ShieldCheck, Code2, Network } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setActivePage, setIs3DInteractiveOverlay } = usePortfolio();
  const { profile } = data;

  return (
    <section id="hero-section" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        {/* Left text column */}
        <div className="flex-1 space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/50 backdrop-blur-xl text-xs font-mono text-cyan-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{profile.status}</span>
          </div>

          {/* Main Title & Bio */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">{profile.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-cyan-300 font-display">
              {profile.title}
            </p>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {profile.tagline}
            </p>
          </div>

          {/* Pillars Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-100">
            <div className="flex items-center gap-2.5 bg-slate-950/50 backdrop-blur-xl p-3 rounded-xl border border-slate-700/60 shadow-md hover:border-cyan-400/50 transition-colors">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-medium text-slate-100">{profile.pillar1 || 'Tech Advisory & Risk Audit (Axcelasia)'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-950/50 backdrop-blur-xl p-3 rounded-xl border border-slate-700/60 shadow-md hover:border-indigo-400/50 transition-colors">
              <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-medium text-slate-100">{profile.pillar2 || 'Full-Stack & 3D WebGL Architectures'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-950/50 backdrop-blur-xl p-3 rounded-xl border border-slate-700/60 shadow-md hover:border-emerald-400/50 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-slate-100">{profile.pillar3 || 'TAR UMT Software Eng • 3.72 CGPA'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-950/50 backdrop-blur-xl p-3 rounded-xl border border-slate-700/60 shadow-md hover:border-purple-400/50 transition-colors">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="font-medium text-slate-100">{profile.pillar4 || profile.location}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => setActivePage('projects')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects ({data.projects.filter(p => p.published).length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('journey')}
              className="px-5 py-3 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 text-slate-100 border border-slate-700/70 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md backdrop-blur-xl"
            >
              <FileText className="w-4 h-4 text-slate-300" />
              <span>Journey & Resume</span>
            </button>

            <button
              onClick={() => setIs3DInteractiveOverlay(true)}
              className="px-5 py-3 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 text-cyan-300 border border-cyan-500/50 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md backdrop-blur-xl"
            >
              <Network className="w-4 h-4 text-cyan-400" />
              <span>3D Architecture View</span>
            </button>
          </div>
        </div>

        {/* Right column: Identity Engineering Card */}
        <div className="w-full lg:w-96 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-950/65 backdrop-blur-2xl border border-slate-700/70 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden group">
            {/* Profile Avatar Frame */}
            <div className="relative mb-5 flex justify-center">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-1 shadow-[0_0_25px_rgba(56,189,248,0.3)]">
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
              <div className="absolute bottom-0 right-28 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[9px] text-white font-bold" title="Available for hire">
                ✓
              </div>
            </div>

            {/* Quick Summary Spec */}
            <div className="text-center space-y-2 mb-4">
              <h3 className="text-xl font-bold text-white font-display">{profile.name}</h3>
              <p className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">{profile.candidateDegree || 'Software Engineering Candidate'}</p>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {profile.university || 'Tunku Abdul Rahman University of Management and Technology (TAR UMT)'}
              </p>
            </div>

            {/* Metrics pills with high-contrast text */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60">
                <div className="text-base font-bold text-cyan-300">{profile.cgpa || '3.72'}</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">CGPA</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60">
                <div className="text-base font-bold text-indigo-300">{profile.awardHighlight || 'Top 50'}</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">GAP Award</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60">
                <div className="text-base font-bold text-emerald-300">{profile.graduationDate || 'Nov 2026'}</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Graduation</div>
              </div>
            </div>

            {/* Language tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {profile.languages.map(lang => (
                <span key={lang.name} className="px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200 font-semibold">
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
