import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Milestone, Calendar, Briefcase, GraduationCap, Award, Rocket, CheckCircle2 } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState<string>('all');

  const categoryIcons: Record<string, any> = {
    experience: Briefcase,
    education: GraduationCap,
    certification: Award,
    project: Rocket,
    activity: Milestone,
    milestone: CheckCircle2
  };

  const filteredTimeline = filter === 'all'
    ? data.timeline
    : data.timeline.filter(t => t.category === filter);

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Milestone className="w-3.5 h-3.5" />
            <span>Milestone History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Journey Through Space & Time
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            A chronological progression of academic excellence, tech advisory internships, system architectures, and leadership service.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'project', label: 'Projects' },
            { id: 'certification', label: 'Honors' },
            { id: 'activity', label: 'Leadership' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === item.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-10 ml-2 sm:ml-4">
        {filteredTimeline.map((item, idx) => {
          const Icon = categoryIcons[item.category] || Milestone;

          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker node */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center transition-all ${
                item.current
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400'
              }`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Event Card */}
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 backdrop-blur-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                        Present / Ongoing
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
