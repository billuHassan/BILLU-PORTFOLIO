import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, BookOpen, Compass, CheckCircle2, GraduationCap, Building2, Languages, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, education, experience } = data;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>About Me & Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Bridging Engineering Mastery with Strategic Advisory
        </h2>
        <p className="mt-3 text-slate-400 text-base sm:text-lg leading-relaxed">
          I combine full-stack development, 3D computer graphics, and technology advisory to build secure, resilient software architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Narrative and statement */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-4">
            <h3 className="text-xl font-bold text-white font-display">Biography</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {profile.bio}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              {profile.personalStatement}
            </p>
          </div>

          {/* Pillars of Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Tech Advisory & Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluating internal IT controls, modeling enterprise risk, and presenting governance findings to leadership.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Full-Stack & Mobile</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Developing robust platforms with Flutter, Firebase, React, Node.js, and strict RBAC governance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Interactive 3D Web</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crafting spatial WebGL/Three.js data explorers, interactive orbital mechanics, and dynamic canvases.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Academic & Professional Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Higher Education</h4>
                <p className="text-xs font-mono text-cyan-400">TAR UMT (Nov 2023 – Present)</p>
              </div>
            </div>

            {education.map(edu => (
              <div key={edu.id} className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-semibold text-white">{edu.degree}</h5>
                    <p className="text-xs text-slate-400">{edu.institution}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    CGPA {edu.cgpa}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  {edu.honors.map(honor => (
                    <div key={honor} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{honor}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Current Experience Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Current Industry Practice</h4>
                <p className="text-xs font-mono text-indigo-400">Axcelasia Sdn Bhd</p>
              </div>
            </div>

            {experience.map(exp => (
              <div key={exp.id} className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-semibold text-white">{exp.role}</h5>
                    <p className="text-xs text-slate-400">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focusing on internal audit reviews, operational technology risk assessments, control enhancements, and executive reporting.
                </p>
              </div>
            ))}
          </div>

          {/* Languages Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">Language Fluency</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {profile.languages.map(l => (
                <div key={l.name} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                  <div className="text-xs font-bold text-white">{l.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{l.level.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
