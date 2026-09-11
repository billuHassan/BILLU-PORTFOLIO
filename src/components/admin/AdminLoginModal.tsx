import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, KeyRound, X, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

export const AdminLoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your owner password.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await loginAdmin(password);
    setLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Invalid credentials. Please verify your password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Owner CMS Portal</h3>
              <p className="text-xs font-mono text-slate-400">Restricted to Portfolio Administrator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Admin Passcode</span>
              <span className="text-[10px] text-amber-400/90 font-mono">Default: bilal2026</span>
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                placeholder="Enter password (e.g. bilal2026)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-sm text-white font-mono placeholder:text-slate-600"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Security & Access Control:</span>
            </div>
            <p>
              Provides full CRUD permissions across projects, media uploads, timeline events, articles, and visitor inbox.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2"
          >
            {loading ? <span>Verifying...</span> : <span>Unlock Private CMS</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
