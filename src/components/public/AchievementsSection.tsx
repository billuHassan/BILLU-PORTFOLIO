import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Trophy, CheckCircle, X, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';
import { Certification } from '../../types';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="achievements" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 mb-3 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>Accolades & Leadership Recognition</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Awards, Honors & Engineering Certifications
        </h2>
        <p className="mt-1.5 text-slate-600 text-sm leading-relaxed">
          Recognized for top academic consistency (CGPA 3.72), GAP Top 50 Student Leadership, and conference execution.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.certifications.map(cert => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-amber-300 transition-all duration-200 flex flex-col justify-between space-y-3 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  {cert.year}
                </span>
              </div>

              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-800 font-bold mb-1.5">
                  {cert.badge || 'Honors'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-display group-hover:text-amber-800 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-0.5 font-medium">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
              <span className="text-sky-700 group-hover:text-sky-800 flex items-center gap-1 text-[11px] font-semibold">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6 text-left text-slate-800">
            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-800 font-bold">
                  {selectedCert.badge || 'Distinction'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedCert.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 font-medium">
                  <span>{selectedCert.issuer}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {selectedCert.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Credential Status Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Officially Verified Academic Record</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">ID: {selectedCert.id}</span>
            </div>

            {/* Expanded Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Achievement Scope & Institutional Impact
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedCert.description}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs font-mono transition-colors border border-slate-200 cursor-pointer"
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
