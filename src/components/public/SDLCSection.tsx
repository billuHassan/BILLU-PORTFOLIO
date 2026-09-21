import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SDLC_STAGES } from '../3d/UniverseCanvas';
import { 
  Terminal, 
  Code, 
  Layers, 
  Activity, 
  Boxes, 
  ShieldCheck, 
  Cloud, 
  Workflow,
  Check
} from 'lucide-react';

export const SDLCSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeStageId, setActiveStageId] = useState<string>('plan');

  const activeStage = SDLC_STAGES.find(s => s.id === activeStageId) || SDLC_STAGES[0];

  const stageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Layers: Layers,
    Code: Code,
    Boxes: Boxes,
    ShieldCheck: ShieldCheck,
    Cloud: Cloud,
    Activity: Activity
  };

  return (
    <section id="sdlc-pipeline-section" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3 shadow-sm">
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>SDLC Architecture & Engineering Lifecycle</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
          Software Development Life Cycle
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
          Systematic engineering workflow: C4 architecture, typed development, automated test suites, containerized delivery, and IT risk governance.
        </p>
      </div>

      {/* 6-Stage Interactive SDLC Track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
        {SDLC_STAGES.map(stage => {
          const isSelected = stage.id === activeStageId;
          const Icon = stageIcons[stage.iconName] || Code;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[105px] ${
                isSelected
                  ? 'bg-[#0e213b] border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                  : 'bg-[#090f1d] hover:bg-[#0e1628] border-slate-800 shadow-sm hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {stage.phase}
                </span>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <h4 className={`text-xs font-bold font-mono tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stage.name.split('&')[0].trim()}
                </h4>
                <div className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-500'}`}>
                  {stage.status}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown & Code Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
        {/* Left Column: Methodology & Practice */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 font-bold text-[10px]">
                Phase {activeStage.phase} of 06
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-semibold text-slate-300 text-[11px]">{activeStage.metrics}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {activeStage.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {activeStage.description}
            </p>

            {/* Key Deliverables & Rigor */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono font-bold uppercase text-slate-200 tracking-wider">
                Engineering Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-100">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>C4 Architectural Diagrams</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero-regression CI Validation</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Peer Code Review Checklists</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated Rollout Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Stack in this stage */}
          <div className="pt-3 border-t border-slate-700/80">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-200 mb-2">
              Verified Tooling & Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeStage.tools.map(tool => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-lg bg-[#090f1d] border border-slate-800 text-[11px] font-mono text-cyan-300 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code & Terminal Artifact Example */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-[#070b16] text-slate-100 font-mono text-xs shadow-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Terminal Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-slate-400">
                sdlc_{activeStage.id}.sh
              </span>
            </div>

            {/* Code Body */}
            <div className="space-y-2 py-1 text-slate-300 overflow-x-auto text-[11px]">
              {activeStageId === 'plan' && (
                <>
                  <div className="text-slate-500"># 01. System Architecture & Feasibility</div>
                  <div><span className="text-cyan-400">c4model</span> --spec=distributed-cloud --output=blueprint.png</div>
                  <div><span className="text-indigo-400">jira</span> sprint create --title="Sprint 14: Core Pipeline"</div>
                  <div className="text-emerald-400 font-semibold">✓ Specification verified against SLA requirements</div>
                </>
              )}
              {activeStageId === 'code' && (
                <>
                  <div className="text-slate-500"># 02. Git Feature Branch & Typed Development</div>
                  <div><span className="text-cyan-400">git</span> checkout -b feature/distributed-event-bus</div>
                  <div><span className="text-indigo-400">npm</span> run typecheck && npm run lint</div>
                  <div className="text-emerald-400 font-semibold">✓ Zero TypeScript compilation errors found</div>
                </>
              )}
              {activeStageId === 'build' && (
                <>
                  <div className="text-slate-500"># 03. Containerization & Production Bundling</div>
                  <div><span className="text-cyan-400">docker</span> build -t bilal/system-core:v2.4 -f Dockerfile .</div>
                  <div><span className="text-indigo-400">vite</span> build --mode=production</div>
                  <div className="text-emerald-400 font-semibold">✓ Production build succeeded in 3.42s (138 kB)</div>
                </>
              )}
              {activeStageId === 'test' && (
                <>
                  <div className="text-slate-500"># 04. Automated Unit & Integration Suites</div>
                  <div><span className="text-cyan-400">npx</span> vitest run --coverage</div>
                  <div><span className="text-slate-400">Statements : 98.4% ( 1842/1871 )</span></div>
                  <div><span className="text-slate-400">Branches   : 96.2% ( 412/428 )</span></div>
                  <div className="text-emerald-400 font-semibold">✓ 42 test suites passed (100% Green CI)</div>
                </>
              )}
              {activeStageId === 'deploy' && (
                <>
                  <div className="text-slate-500"># 05. Automated Cloud Run & Cluster Deployment</div>
                  <div><span className="text-cyan-400">gcloud</span> run deploy cloud-engine --image=v2.4</div>
                  <div><span className="text-indigo-400">kubectl</span> rollout status deployment/web-cluster</div>
                  <div className="text-emerald-400 font-semibold">✓ Ingress live: Zero-downtime routing active</div>
                </>
              )}
              {activeStageId === 'monitor' && (
                <>
                  <div className="text-slate-500"># 06. Observability & IT Governance Controls</div>
                  <div><span className="text-cyan-400">curl</span> -s https://api.bilal.dev/health/telemetry</div>
                  <div><span className="text-slate-400">{"{"} status: "healthy", latency_p99: "14.2ms", uptime: "99.99%" {"}"}</span></div>
                  <div className="text-emerald-400 font-semibold">✓ Axcelasia Audit compliance checklist verified</div>
                </>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              Dev Environment Active
            </span>
            <span className="text-emerald-400 font-bold">Ready</span>
          </div>
        </div>
      </div>

      {/* Technical Competencies Matrix (Grouped cleanly without duplicate clutter) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Technical Competencies & Engineering Stack
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Core technologies applied in production systems and academic engineering coursework.
            </p>
          </div>
          <div className="text-[11px] font-mono text-cyan-400 font-semibold">
            {data.skills.length} Documented Proficiencies
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {['Programming & Core', 'Frontend & 3D Web', 'Backend & Cloud', 'Systems & Advisory'].map(category => {
            const skillsInCat = data.skills.filter(s => {
              if (category === 'Programming & Core') return s.category === 'Core & Systems' || ['TypeScript', 'JavaScript', 'C++', 'Python', 'Java', 'SQL'].includes(s.name);
              if (category === 'Frontend & 3D Web') return s.category === 'Frontend & 3D' || ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'WebGL', 'HTML/CSS'].includes(s.name);
              if (category === 'Backend & Cloud') return s.category === 'Backend & Cloud' || ['Node.js', 'Express', 'Docker', 'Google Cloud (GCP)', 'PostgreSQL', 'MongoDB'].includes(s.name);
              return s.category === 'Governance & Architecture' || ['IT Advisory', 'Internal Audit', 'Cybersecurity', 'Agile / Scrum', 'Git / GitHub'].includes(s.name);
            });

            return (
              <div key={category} className="p-3.5 rounded-2xl bg-[#090f1d] border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wide border-b border-slate-800 pb-1.5">
                  {category}
                </div>
                <div className="space-y-2">
                  {skillsInCat.slice(0, 5).map(skill => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">{skill.name}</span>
                        <span className="font-mono text-[10px] text-cyan-400 font-bold">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-500 transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
