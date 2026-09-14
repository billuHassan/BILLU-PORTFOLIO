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
    <section id="journal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-3">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Digital Archive & Systems Engineering Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Lab Experiments & Architecture Journal
          </h2>
          <p className="mt-2 text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
            Repository of system architectural explorations, performance optimizations, 3D WebGL benchmarks, and technology advisory governance reflections.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Archives
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Notes</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="cursor-pointer group flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 p-6 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  post.category === 'lab'
                    ? 'bg-purple-950 border border-purple-500/40 text-purple-300'
                    : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300'
                }`}>
                  {post.category === 'lab' ? 'Experimental Lab' : 'Journal Essay'}
                </span>

                <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Tap to read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-200 shadow-2xl ring-1 ring-cyan-500/30">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold uppercase">
                  {selectedPost.category === 'lab' ? 'Lab Experiment' : 'Journal Reflection'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {selectedPost.title}
                </h3>
                <div className="text-xs font-mono text-cyan-300 font-medium">
                  Published: {selectedPost.date} • Bilal Hassan Mussa
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                title="Close post modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm leading-relaxed whitespace-pre-line text-slate-100 font-sans space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1 font-medium">
                    <Tag className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-semibold transition-colors"
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
