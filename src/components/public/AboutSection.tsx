import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, BookOpen, Layers, CheckCircle2, GraduationCap, Building2, Languages, Cpu, Terminal, ArrowRight, GitCommit } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, setActivePage } = usePortfolio();
  const { profile } = data;

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-3 shadow-sm">
          <Terminal className="w-3.5 h-3.5" />
          <span>Engineering Philosophy & Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          {profile.aboutHeadline || "Bridging Software Engineering with Systems Governance"}
        </h2>
        <p className="mt-2 text-slate-600 text-base leading-relaxed">
          {profile.aboutSubheadline || "Fusing modern full-stack development, interactive 3D computing, and technology advisory to architect resilient, auditable software systems."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Biography Narrative */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span>Professional Narrative</span>
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {profile.bio}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              {profile.personalStatement}
            </p>
          </div>

          {/* Three Specialization Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{profile.aboutPillar1Title || "Tech Advisory & Audit"}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Internal IT controls, compliance models, and technology advisory at Axcelasia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{profile.aboutPillar2Title || "Full-Stack & Cloud"}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                React, TypeScript, Node.js, and Docker microservices with strict type safety.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{profile.aboutPillar3Title || "Interactive 3D Web"}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Spatial WebGL, Three.js shaders, and interactive system topology visualizers.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Active Developer Console / System Environment */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 shadow-md border border-slate-800 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-4">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-slate-400 ml-1">developer_profile.json</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">● ONLINE</span>
            </div>

            {/* JSON Code Snippet */}
            <div className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed py-1">
              <div><span className="text-slate-500">"candidate":</span> <span className="text-emerald-400">"{profile.name}"</span>,</div>
              <div><span className="text-slate-500">"degree":</span> <span className="text-cyan-400">"BSc (Hons) Software Engineering"</span>,</div>
              <div><span className="text-slate-500">"institution":</span> <span className="text-cyan-400">"TAR UMT (Kuala Lumpur)"</span>,</div>
              <div><span className="text-slate-500">"current_focus":</span> <span className="text-amber-300">"{profile.currentFocus || 'Cloud-Native Architecture & IT Governance'}"</span>,</div>
              <div><span className="text-slate-500">"primary_stack":</span> [</div>
              <div className="pl-4 text-slate-300">
                <span className="text-indigo-400">"TypeScript"</span>, <span className="text-indigo-400">"React"</span>, <span className="text-indigo-400">"C++"</span>, <span className="text-indigo-400">"Docker"</span>, <span className="text-indigo-400">"Three.js"</span>
              </div>
              <div>],</div>
              <div><span className="text-slate-500">"sdlc_practices":</span> <span className="text-sky-300">{'["CI/CD Automated", "Unit Test Coverage > 95%", "Clean Code"]'}</span></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActivePage('sdlc')}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>Explore SDLC Lifecycle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-500">v2.4.0-stable</span>
          </div>
        </div>
      </div>
    </section>
  );
};
