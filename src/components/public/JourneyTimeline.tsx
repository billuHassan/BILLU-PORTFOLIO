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
    <section id="journey" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-3 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Career Evolution & Architecture Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Engineering Milestones & Experience
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Chronological track of software engineering degree at TAR UMT, IT advisory & risk audit experience at Axcelasia, enterprise project deployments, and student leadership.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
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
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 ml-2 sm:ml-4">
        {filteredTimeline.map((item, idx) => {
          const Icon = categoryIcons[item.category] || CheckCircle2;

          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker node */}
              <div className={`absolute -left-[32px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center transition-all ${
                item.current
                  ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm ring-2 ring-sky-300/40'
                  : 'bg-white border-slate-300 text-slate-600 group-hover:border-sky-500 group-hover:text-sky-600'
              }`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Event Card */}
              <div
                onClick={() => setSelectedMilestone(item)}
                className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-sky-300 transition-all duration-200 shadow-sm hover:shadow-md space-y-3 cursor-pointer group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-sky-700 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-mono font-bold">
                        Present / Ongoing
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-sky-700 mt-0.5 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-mono group-hover:text-sky-700 font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6 text-left max-h-[90vh] overflow-y-auto text-slate-800">
            {/* Close button */}
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
              title="Close milestone modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-bold uppercase">
                  {selectedMilestone.category}
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  {selectedMilestone.date}
                </span>
                {selectedMilestone.current && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-mono font-bold">
                    Ongoing
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-display">
                {selectedMilestone.title}
              </h3>
              <p className="text-sm font-semibold text-sky-700 font-mono">
                {selectedMilestone.subtitle}
              </p>
            </div>

            {/* Attached Photo if exists */}
            {selectedMilestone.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 max-h-64 flex items-center justify-center">
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
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Detailed Engineering & Academic Narrative
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedMilestone.description}
              </p>
            </div>

            {/* Tags & Competencies */}
            {selectedMilestone.tags && selectedMilestone.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-sky-600" />
                  <span>Associated Skills & Domain Competencies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMilestone.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-medium"
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
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs font-mono transition-colors border border-slate-200 cursor-pointer"
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
