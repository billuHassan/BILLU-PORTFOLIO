import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Post } from '../../types';
import { BookOpen, FlaskConical, Calendar, ArrowRight, X, Tag } from 'lucide-react';

export const LabAndJournalSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'journal' | 'lab'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const publishedPosts = data.posts.filter(p => p.published);
  const filteredPosts = activeTab === 'all'
    ? publishedPosts
    : publishedPosts.filter(p => p.category === activeTab);

  return (
    <section id="journal" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-2 shadow-sm">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Archive & Systems Engineering Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Lab Experiments & Architecture Journal
          </h2>
          <p className="mt-1 text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Repository of system architectural explorations, performance optimizations, 3D WebGL benchmarks, and technology advisory governance reflections.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl bg-[#090f1d] border border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All Archives
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Notes</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="cursor-pointer group flex flex-col justify-between rounded-3xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 p-5 sm:p-6 hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-950/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  post.category === 'lab'
                    ? 'bg-purple-950/80 border border-purple-500/50 text-purple-300'
                    : 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
                }`}>
                  {post.category === 'lab' ? 'Experimental Lab' : 'Journal Essay'}
                </span>

                <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {post.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-slate-300 bg-[#090f1d] px-2 py-0.5 rounded border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Read Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0b1222] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 text-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 font-bold uppercase">
                  {selectedPost.category === 'lab' ? 'Lab Experiment' : 'Journal Reflection'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {selectedPost.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 font-medium">
                  Published: {selectedPost.date} • Bilal Hassan Mussa
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-[#090f1d] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                title="Close post modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-300 font-sans space-y-4 bg-[#090f1d] p-5 rounded-2xl border border-slate-800">
              {selectedPost.content}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-[#090f1d] border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1 font-medium">
                    <Tag className="w-3 h-3 text-cyan-400" />
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-[#090f1d] hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-700"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
