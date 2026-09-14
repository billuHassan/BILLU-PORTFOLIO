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
    <section id="journal" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-2 shadow-sm">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Digital Archive & Systems Engineering Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Lab Experiments & Architecture Journal
          </h2>
          <p className="mt-1 text-slate-600 text-sm max-w-xl leading-relaxed">
            Repository of system architectural explorations, performance optimizations, 3D WebGL benchmarks, and technology advisory governance reflections.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-sky-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            All Archives
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-sky-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-sky-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
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
            className="cursor-pointer group flex flex-col justify-between rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-sky-300 transition-all duration-200 p-6 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  post.category === 'lab'
                    ? 'bg-purple-50 border border-purple-200 text-purple-700'
                    : 'bg-sky-50 border border-sky-200 text-sky-700'
                }`}>
                  {post.category === 'lab' ? 'Experimental Lab' : 'Journal Essay'}
                </span>

                <span className="text-xs font-mono text-slate-500 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-700 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-semibold text-sky-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Read Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-800 shadow-xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-bold uppercase">
                  {selectedPost.category === 'lab' ? 'Lab Experiment' : 'Journal Reflection'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {selectedPost.title}
                </h3>
                <div className="text-xs font-mono text-slate-500 font-medium">
                  Published: {selectedPost.date} • Bilal Hassan Mussa
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
                title="Close post modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm leading-relaxed whitespace-pre-line text-slate-700 font-sans space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 flex items-center gap-1 font-medium">
                    <Tag className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold transition-colors cursor-pointer border border-slate-200"
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
