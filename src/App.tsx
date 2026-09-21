import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { SDLCSection } from './components/public/SDLCSection';
import { SkillsConstellation } from './components/public/SkillsConstellation';
import { JourneyTimeline } from './components/public/JourneyTimeline';
import { AchievementsSection } from './components/public/AchievementsSection';
import { LabAndJournalSection } from './components/public/LabAndJournalSection';
import { ResumeSection } from './components/public/ResumeSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PageTab } from './types';
import { Home, FolderGit2, Milestone, GitBranch, Mail, ArrowRight, Sparkles } from 'lucide-react';

const PageNavDock: React.FC = () => {
  const { activePage, setActivePage, is3DInteractiveOverlay } = usePortfolio();

  if (is3DInteractiveOverlay) return null;

  const pages: { id: PageTab; label: string; short: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'universe', label: 'Overview', short: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', short: 'Projects', icon: FolderGit2 },
    { id: 'sdlc', label: 'SDLC & Stack', short: 'SDLC', icon: GitBranch },
    { id: 'journey', label: 'Experience', short: 'Career', icon: Milestone },
    { id: 'contact', label: 'Contact', short: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="flex items-center gap-1 bg-[#0b1222]/95 backdrop-blur-2xl border border-slate-700/80 px-2 py-1.5 rounded-full shadow-2xl shadow-cyan-950/40">
        {pages.map(page => {
          const Icon = page.icon;
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => {
                setActivePage(page.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/30 scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{page.label}</span>
              <span className="sm:hidden">{page.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, isAdmin, loading, activePage, setActivePage, is3DInteractiveOverlay } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070c18] flex flex-col items-center justify-center text-cyan-400 font-mono space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <div className="text-sm tracking-wider">INITIALIZING 3D SDLC PIPELINE...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 3D WebGL Software Engineering SDLC Canvas - ALWAYS ACTIVE */}
      <UniverseCanvas />

      {/* Global Background Depth Scrim: high-contrast dark scrim that keeps foreground text crystal clear while letting Java & C++ 3D code glow softly */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[#070c18]/80 backdrop-blur-[2px]" />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Multi-Page Architecture - hidden during full 3D Cockpit mode to eliminate any overlap */}
      <main className={`relative z-10 pb-20 transition-all duration-300 ${is3DInteractiveOverlay ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* PAGE 1: Overview & Biography */}
        {(activePage === 'universe' || activePage === 'all') && (
          <div id="page-universe-overview" className="transition-opacity duration-300">
            <HeroSection />
            <AboutSection />

            {/* Quick Teaser Navigation Pathways */}
            {activePage === 'universe' && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => {
                      setActivePage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-[#0e172a]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 p-5 transition-all shadow-lg hover:shadow-cyan-950/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Code & Systems</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        Engineering Projects
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Production applications, full-stack microservices & algorithms.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setActivePage('sdlc');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-[#0e172a]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 p-5 transition-all shadow-lg hover:shadow-cyan-950/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>CI/CD & Architecture</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        SDLC Pipeline & Stack
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        6-phase continuous delivery lifecycle & code competencies.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setActivePage('journey');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-[#0e172a]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 p-5 transition-all shadow-lg hover:shadow-cyan-950/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <Milestone className="w-3.5 h-3.5" />
                        <span>Career & Education</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        Experience & Credentials
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Axcelasia IT advisory, TAR UMT degree honors, and CV.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* PAGE 2: Projects & Innovation Gallery */}
        {(activePage === 'projects' || activePage === 'all') && (
          <div id="page-projects-gallery" className="transition-opacity duration-300">
            <ProjectsSection />
            <LabAndJournalSection />
          </div>
        )}

        {/* PAGE 3: SDLC Lifecycle & Engineering Stack */}
        {(activePage === 'sdlc' || activePage === 'all') && (
          <div id="page-sdlc-pipeline" className="transition-opacity duration-300">
            <SDLCSection />
            <SkillsConstellation />
          </div>
        )}

        {/* PAGE 4: Career Journey & Experience */}
        {(activePage === 'journey' || activePage === 'all') && (
          <div id="page-journey-credentials" className="transition-opacity duration-300">
            <JourneyTimeline />
            <AchievementsSection />
            <ResumeSection />
          </div>
        )}

        {/* PAGE 5: Direct Contact */}
        {(activePage === 'contact' || activePage === 'all') && (
          <div id="page-contact" className="transition-opacity duration-300">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating Bottom Page Dock */}
      <PageNavDock />

      {/* Public Footer */}
      {!is3DInteractiveOverlay && <Footer />}

      {/* Private Admin / CMS Modal Systems */}
      {isAdminOpen && (
        isAdmin ? (
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        ) : (
          <AdminLoginModal onClose={() => setIsAdminOpen(false)} />
        )
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}
