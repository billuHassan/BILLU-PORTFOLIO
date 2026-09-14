import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { SDLCSection } from './components/public/SDLCSection';
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
    { id: 'sdlc', label: 'SDLC & Skills', short: 'SDLC', icon: GitBranch },
    { id: 'journey', label: 'Experience', short: 'Career', icon: Milestone },
    { id: 'contact', label: 'Contact', short: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xl border border-slate-200 px-2 py-1.5 rounded-full shadow-lg">
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white font-bold shadow-sm scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
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
  const { viewMode, isAdminOpen, setIsAdminOpen, isAdmin, loading, activePage, setActivePage } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-700 font-mono space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
        <div className="text-sm">Loading Software Engineering Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative selection:bg-sky-200 selection:text-sky-950 font-sans">
      {/* 3D WebGL Software Engineering SDLC Canvas */}
      {viewMode === '3d' && <UniverseCanvas />}

      {/* Global Background Readability Scrim: ensures all foreground text remains crisp and highly legible */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-white/40 backdrop-blur-[0.5px]" />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Multi-Page Architecture */}
      <main className="relative z-10 pb-20">
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
                    className="group cursor-pointer rounded-2xl bg-white/90 border border-slate-200 hover:border-sky-300 p-5 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Projects</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                        Engineering Projects
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Production systems, AI microservices, and apps.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-sky-600 group-hover:text-white transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setActivePage('sdlc');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-white/90 border border-slate-200 hover:border-sky-300 p-5 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>SDLC</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                        SDLC & Stack Matrix
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        6-phase continuous delivery lifecycle & code.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-sky-600 group-hover:text-white transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setActivePage('journey');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-white/90 border border-slate-200 hover:border-sky-300 p-5 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <Milestone className="w-3.5 h-3.5" />
                        <span>Career</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                        Experience & Honors
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Axcelasia IT advisory, TAR UMT degree, and CV.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-sky-600 group-hover:text-white transition-all shrink-0 ml-3">
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
      <Footer />

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
