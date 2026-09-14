import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SDLC_STAGES, SDLCStageInfo } from '../3d/UniverseCanvas';
import { 
  GitBranch, 
  Terminal, 
  Code, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Boxes, 
  ShieldCheck, 
  Cloud, 
  Sparkles,
  ArrowRight,
  Cpu,
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
    <section id="sdlc-pipeline-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-3 shadow-sm">
          <Workflow className="w-3.5 h-3.5" />
          <span>SDLC Architecture & Engineering Lifecycle</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Software Development Life Cycle
        </h2>
        <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
          How Bilal Hassan Mussa approaches end-to-end systems engineering: from conceptual architecture diagrams to automated testing, containerized delivery, and IT governance controls.
        </p>
      </div>

      {/* 6-Stage Interactive SDLC Track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {SDLC_STAGES.map(stage => {
          const isSelected = stage.id === activeStageId;
          const Icon = stageIcons[stage.iconName] || Code;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-sky-50/90 border-sky-300 shadow-md ring-2 ring-sky-400/30'
                  : 'bg-white/80 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {stage.phase}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className={`text-xs font-bold font-mono tracking-tight ${isSelected ? 'text-sky-900' : 'text-slate-800'}`}>
                  {stage.name.split('&')[0].trim()}
                </h4>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {stage.status}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown & Code Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
        {/* Left Column: Methodology & Practice */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700">
              <span className="px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 font-bold">
                Phase {activeStage.phase} of 06
              </span>
              <span>•</span>
              <span className="font-semibold">{activeStage.metrics}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {activeStage.name}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              {activeStage.description}
            </p>

            {/* Key Deliverables & Rigor */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
                Engineering Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>C4 Architectural Diagrams</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero-regression CI Validation</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Peer Code Review Checklists</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated Rollout Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Stack in this stage */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2">
              Verified Tooling & Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {activeStage.tools.map(tool => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code & Terminal Artifact Example */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 text-slate-100 font-mono text-xs shadow-md border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Terminal Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-400">
                sdlc_{activeStage.id}.sh
              </span>
            </div>

            {/* Code Body */}
            <div className="space-y-2 py-2 text-slate-300 overflow-x-auto">
              {activeStageId === 'plan' && (
                <>
                  <div className="text-slate-500"># 01. System Architecture & Feasibility</div>
                  <div><span className="text-cyan-400">c4model</span> --spec=distributed-cloud --output=blueprint.png</div>
                  <div><span className="text-indigo-400">jira</span> sprint create --title="Sprint 14: Core Pipeline"</div>
                  <div className="text-emerald-400">✓ Specification verified against SLA requirements</div>
                </>
              )}
              {activeStageId === 'code' && (
                <>
                  <div className="text-slate-500"># 02. Git Feature Branch & Typed Development</div>
                  <div><span className="text-cyan-400">git</span> checkout -b feature/distributed-event-bus</div>
                  <div><span className="text-indigo-400">npm</span> run typecheck && npm run lint</div>
                  <div className="text-emerald-400">✓ Zero TypeScript compilation errors found</div>
                </>
              )}
              {activeStageId === 'build' && (
                <>
                  <div className="text-slate-500"># 03. Containerization & Production Bundling</div>
                  <div><span className="text-cyan-400">docker</span> build -t bilal/system-core:v2.4 -f Dockerfile .</div>
                  <div><span className="text-indigo-400">vite</span> build --mode=production</div>
                  <div className="text-emerald-400">✓ Production build succeeded in 3.42s (138 kB)</div>
                </>
              )}
              {activeStageId === 'test' && (
                <>
                  <div className="text-slate-500"># 04. Automated Unit & Integration Suites</div>
                  <div><span className="text-cyan-400">npx</span> vitest run --coverage</div>
                  <div><span className="text-slate-400">Statements : 98.4% ( 1842/1871 )</span></div>
                  <div><span className="text-slate-400">Branches   : 96.2% ( 412/428 )</span></div>
                  <div className="text-emerald-400">✓ 42 test suites passed (100% Green CI)</div>
                </>
              )}
              {activeStageId === 'deploy' && (
                <>
                  <div className="text-slate-500"># 05. Automated Cloud Run & Cluster Deployment</div>
                  <div><span className="text-cyan-400">gcloud</span> run deploy cloud-engine --image=v2.4</div>
                  <div><span className="text-indigo-400">kubectl</span> rollout status deployment/web-cluster</div>
                  <div className="text-emerald-400">✓ Ingress live: Zero-downtime routing active</div>
                </>
              )}
              {activeStageId === 'monitor' && (
                <>
                  <div className="text-slate-500"># 06. Observability & IT Governance Controls</div>
                  <div><span className="text-cyan-400">curl</span> -s https://api.bilal.dev/health/telemetry</div>
                  <div><span className="text-slate-400">{"{"} status: "healthy", latency_p99: "14.2ms", uptime: "99.99%" {"}"}</span></div>
                  <div className="text-emerald-400">✓ Axcelasia Audit compliance checklist verified</div>
                </>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Dev Environment Active
            </span>
            <span className="text-emerald-400 font-semibold">Ready</span>
          </div>
        </div>
      </div>

      {/* Technical Competencies Matrix (Grouped cleanly without duplicate clutter) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Technical Competencies & Engineering Stack
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Core technologies applied in production systems and academic engineering coursework.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            {data.skills.length} Documented Proficiencies
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Programming & Core', 'Frontend & 3D Web', 'Backend & Cloud', 'Systems & Advisory'].map(category => {
            const skillsInCat = data.skills.filter(s => {
              if (category === 'Programming & Core') return s.category === 'Core & Systems' || ['TypeScript', 'JavaScript', 'C++', 'Python', 'Java', 'SQL'].includes(s.name);
              if (category === 'Frontend & 3D Web') return s.category === 'Frontend & 3D' || ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'WebGL', 'HTML/CSS'].includes(s.name);
              if (category === 'Backend & Cloud') return s.category === 'Backend & Cloud' || ['Node.js', 'Express', 'Docker', 'Google Cloud (GCP)', 'PostgreSQL', 'MongoDB'].includes(s.name);
              return s.category === 'Governance & Architecture' || ['IT Advisory', 'Internal Audit', 'Cybersecurity', 'Agile / Scrum', 'Git / GitHub'].includes(s.name);
            });

            return (
              <div key={category} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
                  {category}
                </div>
                <div className="space-y-2">
                  {skillsInCat.slice(0, 5).map(skill => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{skill.name}</span>
                        <span className="font-mono text-[11px] text-slate-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-600 transition-all"
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
