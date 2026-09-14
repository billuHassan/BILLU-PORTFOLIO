import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-display">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            <span>{data.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Software Engineering & SDLC Architecture Portfolio</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-slate-500">Updated: {data.settings.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Top</span>
          </button>

          {/* Discreet Owner CMS Login Portal Trigger */}
          <button
            id="footer-owner-cms-btn"
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-sky-700 transition-colors cursor-pointer shadow-sm"
            title="Private Owner CMS Access"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isAdmin ? "Owner CMS (Active)" : "Owner Portal"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
