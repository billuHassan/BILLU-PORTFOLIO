import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Milestone } from '../../types';
import { Calendar, Briefcase, GraduationCap, Award, Rocket, CheckCircle2, X, ArrowRight, MapPin, Tag } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState<string>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const categoryIcons: Record<string, React.ElementType> = {
    experience: Briefcase,
    education: GraduationCap,
    certification: Award,
    project: Rocket,
    activity: Award,
    milestone: CheckCircle2
  };

  const filteredTimeline = filter === 'all'
    ? data.timeline
    : data.timeline.filter(t => t.category === filter);

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Career Evolution & Architecture Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Engineering Milestones & Professional Track
          </h2>
          <p className="mt-2 text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
            Chronological log of software engineering degrees, cybersecurity advisory audit experience, enterprise production deployments, and leadership contributions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-slate-700/60 shadow-md">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                filter === item.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l border-slate-800/80 space-y-10 ml-2 sm:ml-4">
        {filteredTimeline.map((item, idx) => {
          const Icon = categoryIcons[item.category] || CheckCircle2;

          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker node */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center transition-all ${
                item.current
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-950/80 backdrop-blur-md border-slate-700 text-slate-300 group-hover:border-cyan-400 group-hover:text-cyan-300'
              }`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Event Card */}
              <div
                onClick={() => setSelectedMilestone(item)}
                className="p-6 rounded-3xl bg-slate-950/70 backdrop-blur-xl border border-slate-700/60 hover:border-cyan-400/60 transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] space-y-3 cursor-pointer group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono font-bold">
                        Present / Ongoing
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-750 border-slate-700/60">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-cyan-400 mt-0.5 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-slate-900/70 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-mono group-hover:text-cyan-300">
                  <span>Tap to open full milestone archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Detail Modal (Triggered on Tap/Click) */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/50 p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.8)] space-y-6 text-left ring-1 ring-cyan-500/30 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
              title="Close milestone modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold uppercase">
                  {selectedMilestone.category}
                </span>
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedMilestone.date}
                </span>
                {selectedMilestone.current && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                    Ongoing
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                {selectedMilestone.title}
              </h3>
              <p className="text-sm font-semibold text-cyan-300 font-mono">
                {selectedMilestone.subtitle}
              </p>
            </div>

            {/* Attached Photo/Certificate if exists */}
            {selectedMilestone.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-64 flex items-center justify-center">
                <img
                  src={selectedMilestone.imageUrl}
                  alt={selectedMilestone.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Complete Expanded Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Detailed Engineering & Academic Narrative
              </h4>
              <p className="text-sm text-slate-100 leading-relaxed bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60">
                {selectedMilestone.description}
              </p>
            </div>

            {/* Tags & Competencies */}
            {selectedMilestone.tags && selectedMilestone.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Associated Skills & Domain Competencies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMilestone.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-cyan-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs font-mono transition-colors border border-slate-700/60 cursor-pointer"
              >
                Close Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
