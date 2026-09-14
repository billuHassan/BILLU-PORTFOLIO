import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Trophy, CheckCircle, X, ArrowRight, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';
import { Certification } from '../../types';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Accolades & Leadership Recognition</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Awards, Honors & Engineering Certifications
        </h2>
        <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
          Recognized for top academic consistency (CGPA 3.72), GAP Top 50 Student Leadership, and conference execution.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.certifications.map(cert => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {cert.year}
                </span>
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold mb-2">
                  {cert.badge || 'Honors'}
                </span>
                <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-300 mt-0.5 font-medium">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
              <span className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 text-[11px]">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certification & Honor Detail Modal (Triggered on Tap/Click) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/50 p-6 sm:p-8 shadow-2xl space-y-6 text-left ring-1 ring-cyan-500/30">
            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold">
                  {selectedCert.badge || 'Distinction'}
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  {selectedCert.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-medium">
                  <span>{selectedCert.issuer}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {selectedCert.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Credential Status Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Officially Verified Academic Record</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">ID: {selectedCert.id}</span>
            </div>

            {/* Expanded Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Achievement Scope & Institutional Impact
              </h4>
              <p className="text-sm text-slate-100 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                {selectedCert.description}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-mono transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
