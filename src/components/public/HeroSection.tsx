import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, FileText, Sparkles, MapPin, CheckCircle2, ShieldCheck, Code2, Workflow, Terminal } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setActivePage, setIs3DInteractiveOverlay } = usePortfolio();
  const { profile } = data;

  return (
    <section id="hero-section" className="relative pt-8 sm:pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        {/* Left text column */}
        <div className="flex-1 space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">{profile.status}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700 font-semibold">{profile.location}</span>
          </div>

          {/* Main Title & Bio */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
              Hi, I'm <span className="text-sky-600">{profile.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-slate-700 font-display">
              {profile.title}
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {profile.tagline}
            </p>
          </div>

          {/* Engineering Pillars Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
            <div className="flex items-center gap-2.5 bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm text-slate-700 hover:border-sky-300 transition-colors">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-medium">{profile.pillar1 || 'Tech Advisory & Risk Audit (Axcelasia)'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm text-slate-700 hover:border-indigo-300 transition-colors">
              <Code2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-medium">{profile.pillar2 || 'Full-Stack & 3D WebGL Architectures'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm text-slate-700 hover:border-emerald-300 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{profile.pillar3 || 'TAR UMT Software Eng • 3.72 CGPA'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm text-slate-700 hover:border-purple-300 transition-colors">
              <Workflow className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="font-medium">SDLC CI/CD Automated Pipelines</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('projects')}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects ({data.projects.filter(p => p.published).length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('sdlc')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Workflow className="w-4 h-4 text-sky-600" />
              <span>SDLC & Skills Matrix</span>
            </button>

            <button
              onClick={() => setActivePage('journey')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Experience & Timeline</span>
            </button>
          </div>
        </div>

        {/* Right column: Identity Engineering Card */}
        <div className="w-full lg:w-96 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-6 shadow-md overflow-hidden">
            {/* Profile Avatar Frame */}
            <div className="relative mb-5 flex justify-center">
              <div className="w-28 h-28 rounded-2xl bg-sky-100 p-1 shadow-sm border border-sky-200">
                <div className="w-full h-full rounded-[14px] bg-slate-100 flex items-center justify-center overflow-hidden">
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
                    <div className="text-3xl font-extrabold text-sky-700 font-display">
                      BHM
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-28 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" title="Available for hire">
                ✓
              </div>
            </div>

            {/* Quick Summary Spec */}
            <div className="text-center space-y-1.5 mb-4">
              <h3 className="text-xl font-bold text-slate-900 font-display">{profile.name}</h3>
              <p className="text-xs font-mono text-sky-700 font-bold uppercase tracking-wider">{profile.candidateDegree || 'Software Engineering Candidate'}</p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {profile.university || 'Tunku Abdul Rahman University of Management and Technology (TAR UMT)'}
              </p>
            </div>

            {/* Metrics pills with clean light styling */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="text-base font-bold text-sky-700">{profile.cgpa || '3.72'}</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">CGPA</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="text-base font-bold text-indigo-700">{profile.awardHighlight || 'Top 50'}</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">GAP Award</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="text-base font-bold text-emerald-700">{profile.graduationDate || 'Nov 2026'}</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Graduation</div>
              </div>
            </div>

            {/* Language tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {profile.languages.map(lang => (
                <span key={lang.name} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 font-semibold">
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
