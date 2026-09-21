import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#070c18]/90 backdrop-blur-xl py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white font-bold font-display">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></span>
            <span>{data.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-slate-400">Software Engineering & SDLC Architecture Portfolio</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-cyan-400/80">Updated: {data.settings.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-[#090f1d] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">Top</span>
          </button>

          {/* Discreet Owner CMS Login Portal Trigger */}
          <button
            id="footer-owner-cms-btn"
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#090f1d] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer shadow-sm"
            title="Private Owner CMS Access"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">{isAdmin ? "Owner CMS (Active)" : "Owner Portal"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
