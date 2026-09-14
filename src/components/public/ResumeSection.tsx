import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Download, Printer, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, education, experience, projects, skills, certifications } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-900">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Verified Resume / CV
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Always up-to-date and managed dynamically through the private CMS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print CV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Structured Resume Document Viewport */}
      <div className="rounded-3xl bg-slate-950/60 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-slate-200 space-y-10 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display print:text-black">
                {profile.name}
              </h1>
              <p className="text-base font-semibold text-cyan-400 print:text-blue-700">
                {profile.candidateDegree || profile.title}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 text-right print:text-slate-700 space-y-1">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/60 print:border-slate-300">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:underline">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:underline">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold print:text-slate-900">
            Executive Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Work Experience */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold print:text-slate-900">
            Work Experience
          </h3>
          {experience.map(exp => (
            <div key={exp.id} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                <div className="text-white print:text-black">
                  <span>{exp.role}</span> — <span className="text-cyan-300 print:text-blue-800">{exp.company}</span>
                </div>
                <div className="text-slate-400 font-mono text-xs">
                  {exp.startDate} – {exp.endDate} | {exp.location}
                </div>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-300 print:text-slate-800">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="leading-relaxed">{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold print:text-slate-900">
            Key Software Projects
          </h3>
          {projects.filter(p => p.published).map(proj => (
            <div key={proj.id} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                <div className="text-white print:text-black flex items-center gap-2">
                  <span>{proj.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 print:border">
                    {proj.category}
                  </span>
                </div>
                <div className="text-slate-400 font-mono text-xs">
                  {proj.dates}
                </div>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-800">
                {proj.description}
              </p>
              <div className="text-[11px] font-mono text-cyan-400 print:text-blue-700">
                Tech Stack: {proj.technologies.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Distinctions */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold print:text-slate-900">
            Education
          </h3>
          {education.map(edu => (
            <div key={edu.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                <div className="text-white print:text-black">
                  {edu.degree} — {edu.institution}
                </div>
                <div className="text-emerald-400 font-mono text-xs font-bold">
                  CGPA: {edu.cgpa}
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {edu.startDate} – {edu.endDate} | {edu.location}
              </div>
              <div className="text-xs text-slate-300 print:text-slate-700">
                Honors: {edu.honors.join(' • ')}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-800 print:border-slate-300">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold print:text-slate-900">
              Technical Competencies
            </h4>
            <div className="text-xs text-slate-300 print:text-slate-800 space-y-1 leading-relaxed">
              <div><strong className="text-white print:text-black">Languages:</strong> Java, C++, JavaScript, Python, SQL</div>
              <div><strong className="text-white print:text-black">Frameworks:</strong> Flutter, React, Three.js, WebGL, Node.js</div>
              <div><strong className="text-white print:text-black">Cloud & Systems:</strong> Firebase, Firestore, Vercel, REST APIs</div>
              <div><strong className="text-white print:text-black">Advisory & Governance:</strong> Tech Consulting, IT Internal Audit, Risk Assessment</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold print:text-slate-900">
              Languages & Extracurriculars
            </h4>
            <div className="text-xs text-slate-300 print:text-slate-800 space-y-1 leading-relaxed">
              <div><strong className="text-white print:text-black">Languages:</strong> Swahili (Native), English (Proficient), Arabic (Proficient)</div>
              <div><strong className="text-white print:text-black">Leadership:</strong> Committee Member, CIAG 2026, ISACA Malaysia Chapter (Eventify Platform Operations for 500 attendees)</div>
              <div><strong className="text-white print:text-black">Awards:</strong> GAP Platinum Award 2026 (Top 50 Students in TAR UMT)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
