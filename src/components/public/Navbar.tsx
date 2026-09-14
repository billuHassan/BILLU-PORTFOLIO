import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PageTab, CosmicTheme } from '../../types';
import {
  Sparkles,
  Layers,
  Lock,
  Menu,
  X,
  Palette,
  Compass,
  FolderGit2,
  Milestone,
  Home,
  FileCode,
  GitBranch,
  Mail,
  Code
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
    { id: 'universe', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'sdlc', label: 'SDLC & Skills', icon: GitBranch },
    { id: 'journey', label: 'Experience', icon: Milestone },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const themeOptions: { key: CosmicTheme; label: string; color: string }[] = [
    { key: 'cyan', label: 'VS Modern Light', color: '#0284c7' },
    { key: 'aurora', label: 'CI/CD Green', color: '#059669' },
    { key: 'solar', label: 'Architecture Blueprint', color: '#d97706' },
    { key: 'amethyst', label: 'Microservices Mesh', color: '#7c3aed' },
  ];

  return (
    <header id="main-navigation" className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Identity Branding */}
        <button
          onClick={() => setActivePage('universe')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 group-hover:scale-105 transition-transform shadow-sm">
            <span className="font-mono font-bold text-sm tracking-wider">BM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-slate-900 font-display tracking-tight group-hover:text-sky-600 transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[11px] text-slate-600 font-mono flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              TAR UMT • Axcelasia Advisory
            </span>
          </div>
        </button>

        {/* 5 Core Website Pages (Tabs) Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
          {mainPages.map(page => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Colour Theme, 3D Architecture, 2D/3D Toggle, Owner Lock */}
        <div className="flex items-center gap-2">
          {/* Architecture Colour Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Architecture Theme Palette"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300 hidden sm:inline-block"
                style={{
                  backgroundColor:
                    cosmicTheme === 'cyan' ? '#0284c7' :
                    cosmicTheme === 'amethyst' ? '#7c3aed' :
                    cosmicTheme === 'solar' ? '#d97706' : '#059669'
                }}
              />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Developer Themes
                </div>
                {themeOptions.map(th => (
                  <button
                    key={th.key}
                    onClick={() => {
                      setCosmicTheme(th.key);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      cosmicTheme === th.key
                        ? 'bg-sky-50 text-sky-950 font-bold border border-sky-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.color }} />
                      <span>{th.label}</span>
                    </div>
                    {cosmicTheme === th.key && <span className="text-[10px] text-sky-600 font-bold">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Interactive Architecture Toggle */}
          {viewMode === '3d' && (
            <button
              onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                is3DInteractiveOverlay
                  ? 'bg-sky-600 text-white font-bold border-sky-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Explore 3D SDLC Architecture"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{is3DInteractiveOverlay ? 'Exit 3D' : '3D SDLC'}</span>
            </button>
          )}

          {/* 3D / 2D View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              viewMode === '3d'
                ? 'bg-sky-50 border-sky-200 text-sky-700 font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle between 3D SDLC canvas and 2D documentation view"
          >
            {viewMode === '3d' ? <Sparkles className="w-3.5 h-3.5 text-sky-600" /> : <FileCode className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="hidden sm:inline">{viewMode === '3d' ? '3D Canvas' : '2D View'}</span>
          </button>

          {/* Owner CMS Lock */}
          <button
            id="nav-admin-access-btn"
            onClick={() => setIsAdminOpen(true)}
            className={`p-2 rounded-xl text-xs border transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isAdmin
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
            }`}
            title={isAdmin ? "Owner CMS Active (Logged In)" : "Owner CMS Login"}
          >
            <Lock className="w-3.5 h-3.5" />
            {isAdmin && <span className="hidden md:inline font-mono text-[10px] text-amber-700">Admin Mode</span>}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-2">
          <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
            Portfolio Navigation
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 border-sky-200 font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Kuala Lumpur, Malaysia</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-sky-600 hover:underline flex items-center gap-1 cursor-pointer"
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
