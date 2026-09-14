import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsSection } from './components/public/ProjectsSection';
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
import { Home, FolderGit2, Milestone, Layers, ArrowRight, Sparkles } from 'lucide-react';

const PageNavDock: React.FC = () => {
  const { activePage, setActivePage, is3DInteractiveOverlay } = usePortfolio();

  if (is3DInteractiveOverlay) return null;

  const pages: { id: PageTab; label: string; short: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'universe', label: '1. Architecture & Bio', short: 'System', icon: Home },
    { id: 'projects', label: '2. Projects & Systems', short: 'Projects', icon: FolderGit2 },
    { id: 'journey', label: '3. Journey & Credentials', short: 'Journey', icon: Milestone },
    { id: 'all', label: 'Full System View', short: 'All', icon: Layers },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="flex items-center gap-1 bg-slate-950/95 backdrop-blur-xl border border-slate-700/90 px-2 py-1.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {pages.map(page => {
          const Icon = page.icon;
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span className="hidden sm:inline font-mono">{page.label}</span>
              <span className="sm:hidden font-mono">{page.short}</span>
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 font-mono space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <div className="text-sm">Initializing Bilal Hassan Mussa's Software Engineering Architecture Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950">
      {/* 3D WebGL Software Engineering Architecture Canvas */}
      {viewMode === '3d' && <UniverseCanvas />}

      {/* Global Background Readability Scrim: ensures all foreground words are 100% visible with zero fading or glare */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-slate-950/50" />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Dynamic 3-Page Content Architecture */}
      <main className="relative z-10">
        {/* PAGE 1: Architecture & Biography */}
        {(activePage === 'universe' || activePage === 'all') && (
          <div id="page-universe-overview" className="transition-opacity duration-300">
            <HeroSection />
            <AboutSection />

            {/* Quick Teaser Pathway to Page 2 & 3 */}
            {activePage === 'universe' && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActivePage('projects')}
                    className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 p-6 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Page 2 of 3</span>
                      </div>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        Distributed Projects & Systems Lab
                      </h4>
                      <p className="text-xs text-slate-200 mt-1">
                        Explore production systems, AI microservices, and interactive applications.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-200 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shrink-0 ml-4">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActivePage('journey')}
                    className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-400/60 p-6 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Page 3 of 3</span>
                      </div>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                        Engineering Journey, Skills & Transmission
                      </h4>
                      <p className="text-xs text-slate-200 mt-1">
                        TAR UMT honors, Axcelasia IT advisory, verified technical competencies, and direct inquiry portal.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-200 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0 ml-4">
                      <ArrowRight className="w-5 h-5" />
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
            {activePage === 'projects' && (
              <div className="pt-8 pb-4 text-center max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
                  <span>Page 2 • Engineering Innovations</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Projects & Technical Lab
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Interactive case studies, production systems, and research notes authored by Bilal Hassan Mussa.
                </p>
              </div>
            )}
            <ProjectsSection />
            <LabAndJournalSection />
          </div>
        )}

        {/* PAGE 3: Career Journey, Skills & Direct Inquiry */}
        {(activePage === 'journey' || activePage === 'all') && (
          <div id="page-journey-credentials" className="transition-opacity duration-300">
            {activePage === 'journey' && (
              <div className="pt-8 pb-4 text-center max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-3">
                  <span>Page 3 • Career Odyssey & Credentials</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Journey, Skills & Transmission
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Academic honors at TAR UMT, Technology Advisory at Axcelasia, verified technical competencies, and contact channel.
                </p>
              </div>
            )}
            <JourneyTimeline />
            <SkillsConstellation />
            <AchievementsSection />
            <ResumeSection />
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
