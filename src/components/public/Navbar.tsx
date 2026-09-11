import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PageTab, CosmicTheme } from '../../types';
import {
  Sparkles,
  Globe,
  Lock,
  Menu,
  X,
  Palette,
  Compass,
  FolderGit2,
  Milestone,
  Home,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    viewMode,
    setViewMode,
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
    { id: 'universe', label: '1. Universe & Overview', icon: Home },
    { id: 'projects', label: '2. Projects & Innovations', icon: FolderGit2 },
    { id: 'journey', label: '3. Journey, Skills & Contact', icon: Milestone },
    { id: 'all', label: 'Full Scroll', icon: Layers },
  ];

  const themeOptions: { key: CosmicTheme; label: string; color: string }[] = [
    { key: 'cyan', label: 'Nebula Cyan', color: '#00f2fe' },
    { key: 'amethyst', label: 'Cosmic Amethyst', color: '#c084fc' },
    { key: 'solar', label: 'Supernova Gold', color: '#fbbf24' },
    { key: 'aurora', label: 'Emerald Aurora', color: '#34d399' },
  ];

  return (
    <header id="main-navigation" className="sticky top-0 z-30 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Identity Branding */}
        <button
          onClick={() => setActivePage('universe')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <span className="font-mono font-bold text-sm tracking-wider">BM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[11px] text-cyan-400/90 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              TAR UMT • Axcelasia Advisory
            </span>
          </div>
        </button>

        {/* 3 Core Website Pages (Tabs) Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/80">
          {mainPages.map(page => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Colour Theme, 3D Flight Mode, 2D/3D Toggle, Owner Lock */}
        <div className="flex items-center gap-2">
          {/* Cosmic Colour Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Cosmic Colour Palette"
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/30 hidden sm:inline-block"
                style={{
                  backgroundColor:
                    cosmicTheme === 'cyan' ? '#00f2fe' :
                    cosmicTheme === 'amethyst' ? '#c084fc' :
                    cosmicTheme === 'solar' ? '#fbbf24' : '#34d399'
                }}
              />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900/95 border border-slate-700 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400">
                  Cosmic Palettes
                </div>
                {themeOptions.map(th => (
                  <button
                    key={th.key}
                    onClick={() => {
                      setCosmicTheme(th.key);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                      cosmicTheme === th.key
                        ? 'bg-cyan-500/20 text-white font-bold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.color }} />
                      <span>{th.label}</span>
                    </div>
                    {cosmicTheme === th.key && <span className="text-[10px] text-cyan-400">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Orbit / Flight Mode Toggle */}
          {viewMode === '3d' && (
            <button
              onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
                is3DInteractiveOverlay
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:bg-slate-800'
              }`}
              title="Toggle interactive 3D Orbit and flight sandbox"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{is3DInteractiveOverlay ? 'Exit 3D' : '3D Orbit'}</span>
            </button>
          )}

          {/* 3D / 2D View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
              viewMode === '3d'
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
            title="Toggle between 3D celestial canvas and standard 2D layout"
          >
            {viewMode === '3d' ? <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> : <Globe className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="hidden sm:inline">{viewMode === '3d' ? '3D View' : '2D View'}</span>
          </button>

          {/* Owner CMS Lock */}
          <button
            id="nav-admin-access-btn"
            onClick={() => setIsAdminOpen(true)}
            className={`p-2 rounded-xl text-xs border transition-all flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
            title={isAdmin ? "Owner CMS Active (Logged In)" : "Owner CMS Login"}
          >
            <Lock className="w-3.5 h-3.5" />
            {isAdmin && <span className="hidden md:inline font-mono text-[10px] text-amber-300">Admin Mode</span>}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-2">
          <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
            Portfolio Pages
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium border transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-200 border-slate-800/80 hover:bg-slate-800 hover:text-cyan-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Kuala Lumpur, Malaysia</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-cyan-400 hover:underline flex items-center gap-1"
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
