import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, ArrowUp, Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-300 font-bold font-display">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{data.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Digital Universe Living Portfolio Platform</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-slate-400">Updated: {data.settings.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors flex items-center gap-1.5"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Top</span>
          </button>

          {/* Discreet Owner CMS Login Portal Trigger */}
          <button
            id="footer-owner-cms-btn"
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Private Owner CMS Access"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isAdmin ? "Owner CMS (Logged in)" : "Owner Portal"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
