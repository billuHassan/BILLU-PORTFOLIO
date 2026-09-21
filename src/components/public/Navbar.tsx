import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PageTab, CosmicTheme } from '../../types';
import { SOFTWARE_ENGINEERING_THEMES } from '../3d/UniverseCanvas';
import {
  Compass,
  FolderGit2,
  Milestone,
  Home,
  GitBranch,
  Mail,
  Lock,
  Menu,
  X,
  Palette,
  Minimize2,
  CheckCircle2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    activePage,
    setActivePage,
    cosmicTheme,
    setCosmicTheme,
    is3DInteractiveOverlay,
    setIs3DInteractiveOverlay,
    setIsAdminOpen,
    isAdmin
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const mainPages: { id: PageTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'universe', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'sdlc', label: 'SDLC & Architecture', icon: GitBranch },
    { id: 'journey', label: 'Experience', icon: Milestone },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const currentTheme = SOFTWARE_ENGINEERING_THEMES[cosmicTheme] || SOFTWARE_ENGINEERING_THEMES.cyan;

  return (
    <header id="main-navigation" className="sticky top-0 z-40 w-full bg-[#090e1c]/95 backdrop-blur-2xl border-b border-slate-800/90 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Identity Branding */}
        <button
          onClick={() => setActivePage('universe')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-md shadow-cyan-950/50">
            <span className="font-mono font-extrabold text-sm tracking-wider">BM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              TAR UMT • Axcelasia IT Advisory
            </span>
          </div>
        </button>

        {/* 5 Core Website Pages Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0e1628] p-1 rounded-2xl border border-slate-800">
          {mainPages.map(page => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: 3D Cockpit, Theme Selector, Owner Lock */}
        <div className="flex items-center gap-2">
          {/* CI/CD Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e172a] border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>3D ACTIVE</span>
          </div>

          {/* Architecture Color Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Switch Software Engineering Theme"
              className="p-2 rounded-xl bg-[#0e1628] hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 shadow-sm transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-600 hidden sm:inline-block"
                style={{
                  backgroundColor:
                    cosmicTheme === 'cyan' ? '#38bdf8' :
                    cosmicTheme === 'amethyst' ? '#a855f7' :
                    cosmicTheme === 'solar' ? '#f59e0b' : '#10b981'
                }}
              />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0b1222] border border-slate-700 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  3D Code Background Themes
                </div>
                {(Object.keys(SOFTWARE_ENGINEERING_THEMES) as CosmicTheme[]).map(tKey => {
                  const th = SOFTWARE_ENGINEERING_THEMES[tKey];
                  return (
                    <button
                      key={tKey}
                      onClick={() => {
                        setCosmicTheme(tKey);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        cosmicTheme === tKey
                          ? 'bg-cyan-950/80 text-cyan-200 font-bold border border-cyan-500/50'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{
                            backgroundColor:
                              tKey === 'cyan' ? '#38bdf8' :
                              tKey === 'amethyst' ? '#a855f7' :
                              tKey === 'solar' ? '#f59e0b' : '#10b981'
                          }} 
                        />
                        <span className="truncate">{th.name.split('(')[0].trim()}</span>
                      </div>
                      {cosmicTheme === tKey && <span className="text-[10px] text-cyan-400 font-bold">Active</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3D Spatial Cockpit Mode (Always 3D) */}
          <button
            onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer shadow-md font-bold ${
              is3DInteractiveOverlay
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/25'
                : 'bg-[#0e1628] text-cyan-300 border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white'
            }`}
            title="Toggle Full 3D Interactive Cockpit Mode"
          >
            {is3DInteractiveOverlay ? <Minimize2 className="w-3.5 h-3.5" /> : <Compass className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{is3DInteractiveOverlay ? 'Dossier View' : '3D Cockpit'}</span>
          </button>

          {/* Owner CMS Lock */}
          <button
            id="nav-admin-access-btn"
            onClick={() => setIsAdminOpen(true)}
            className={`p-2 rounded-xl text-xs border transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isAdmin
                ? 'bg-amber-950/80 text-amber-300 border-amber-600 shadow-sm'
                : 'bg-[#0e1628] text-slate-300 hover:text-white border-slate-700/80 hover:bg-slate-800'
            }`}
            title={isAdmin ? "Owner CMS Active (Logged In)" : "Owner CMS Login"}
          >
            <Lock className="w-3.5 h-3.5" />
            {isAdmin && <span className="hidden md:inline font-mono text-[10px] text-amber-400 font-bold">Admin</span>}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0e1628] text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1020]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-2">
          <div className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider font-bold">
            Navigation Menu (3D Engine)
          </div>
          <div className="grid grid-cols-1 gap-2">
            {mainPages.map(page => {
              const Icon = page.icon;
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => {
                    setActivePage(page.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                      : 'bg-[#0e1628] text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Kuala Lumpur, Malaysia</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
