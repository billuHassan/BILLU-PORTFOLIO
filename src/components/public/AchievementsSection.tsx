import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Trophy, Medal, Star, CheckCircle } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Accolades & Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Awards, Honors & Certifications
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Recognized for exceptional academic consistency, campus leadership, and professional conference execution.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.certifications.map(cert => (
          <div
            key={cert.id}
            className="group p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {cert.year}
                </span>
              </div>

              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold mb-2">
                  {cert.badge || 'Honors'}
                </span>
                <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Credential</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
