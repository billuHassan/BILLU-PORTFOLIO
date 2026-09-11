import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Skill, TimelineEvent, Post, ContactMessage } from '../../types';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Milestone,
  BookOpen,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Upload,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Shield,
  User,
  Award
} from 'lucide-react';
import { ImageManagerField } from './ImageManagerField';
import { ProjectGalleryManager } from './ProjectGalleryManager';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    data,
    logoutAdmin,
    updateProfile,
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    saveTimelineEvent,
    deleteTimelineEvent,
    savePost,
    deletePost,
    uploadMediaFile,
    deleteMediaAsset,
    updateSiteSettings,
    fetchAdminMessages,
    markMessageAsRead,
    deleteMessage,
    resetToInitialData
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'timeline' | 'posts' | 'media' | 'profile' | 'messages' | 'settings'
  >('overview');

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Project Edit State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Skill Edit State
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  // Timeline Edit State
  const [editingTimeline, setEditingTimeline] = useState<Partial<TimelineEvent> | null>(null);
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);

  // Post Edit State
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  // Media Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState('');
  const [uploading, setUploading] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(data.profile);

  // Fetch messages when messages tab is opened
  useEffect(() => {
    if (activeTab === 'messages' || activeTab === 'overview') {
      setMsgLoading(true);
      fetchAdminMessages().then(msgs => {
        setMessages(msgs);
        setMsgLoading(false);
      });
    }
  }, [activeTab]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Helper for Project Save
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    await saveProject(editingProject, editingProject.id);
    setEditingProject(null);
    setIsAddingProject(false);
    showToast('Project saved successfully!');
  };

  // Helper for Skill Save
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    await saveSkill(editingSkill, editingSkill.id);
    setEditingSkill(null);
    setIsAddingSkill(false);
    showToast('Skill saved successfully!');
  };

  // Helper for Timeline Save
  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimeline) return;
    await saveTimelineEvent(editingTimeline, editingTimeline.id);
    setEditingTimeline(null);
    setIsAddingTimeline(false);
    showToast('Milestone saved successfully!');
  };

  // Helper for Post Save
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    await savePost(editingPost, editingPost.id);
    setEditingPost(null);
    setIsAddingPost(false);
    showToast('Journal post saved successfully!');
  };

  // Helper for Media Upload
  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    const res = await uploadMediaFile(uploadFile, { name: uploadName });
    setUploading(false);
    if (res.success) {
      setUploadFile(null);
      setUploadName('');
      showToast('Media uploaded to library!');
    } else {
      alert(res.error || 'Upload failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Toast notification */}
      {successToast && (
        <div className="absolute top-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display">Private CMS Workspace</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-[10px] font-mono text-amber-300">
                Owner Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Live Content Management for {data.profile.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Return to Public Site"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-slate-800/80 bg-slate-900/50 p-4 space-y-1.5 shrink-0 overflow-y-auto hidden sm:block font-mono text-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 py-2">
            Content Architecture
          </div>

          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'projects', label: `Projects (${data.projects.length})`, icon: FolderGit2 },
            { id: 'media', label: `Media Library (${data.mediaAssets.length})`, icon: ImageIcon },
            { id: 'skills', label: `Skills (${data.skills.length})`, icon: Cpu },
            { id: 'timeline', label: `Journey & Milestones (${data.timeline.length})`, icon: Milestone },
            { id: 'posts', label: `Journal & Lab (${data.posts.length})`, icon: BookOpen },
            { id: 'profile', label: 'Profile & Narrative', icon: User },
            { id: 'messages', label: `Visitor Messages (${messages.filter(m => !m.read).length} new)`, icon: Mail },
            { id: 'settings', label: 'Settings & Theme', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-950/60 space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-2xl font-bold text-white font-display">System Overview</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Database counts and platform status. Any modifications update the live 3D universe in real-time.
                </p>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-400">Total Projects</div>
                  <div className="text-3xl font-extrabold text-white font-display">{data.projects.length}</div>
                  <div className="text-[11px] text-slate-400">
                    {data.projects.filter(p => p.published).length} published online
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-indigo-400">Skills Constellation</div>
                  <div className="text-3xl font-extrabold text-white font-display">{data.skills.length}</div>
                  <div className="text-[11px] text-slate-400">Across 5 technical domains</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-purple-400">Media Assets</div>
                  <div className="text-3xl font-extrabold text-white font-display">{data.mediaAssets.length}</div>
                  <div className="text-[11px] text-slate-400">In private media library</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-emerald-400">Visitor Inquiries</div>
                  <div className="text-3xl font-extrabold text-white font-display">{messages.length}</div>
                  <div className="text-[11px] text-slate-400">
                    {messages.filter(m => !m.read).length} unread messages
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Quick CMS Operations
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingProject({
                        title: '',
                        tagline: '',
                        description: '',
                        problem: '',
                        solution: '',
                        category: 'AI / ML',
                        status: 'In Progress',
                        dates: '2026',
                        features: [],
                        technologies: [],
                        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
                        published: true,
                        featured: true
                      });
                      setIsAddingProject(true);
                      setActiveTab('projects');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Project</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('media')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Media Asset</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Review Contact Inbox</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Projects Manager</h3>
                  <p className="text-xs font-mono text-slate-400">Add, edit, publish/unpublish, and update architectural details.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      tagline: '',
                      description: '',
                      problem: '',
                      solution: '',
                      category: 'Web & Full-Stack',
                      status: 'In Progress',
                      dates: '2026',
                      features: [],
                      technologies: [],
                      images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
                      published: true,
                      featured: true
                    });
                    setIsAddingProject(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add / Edit Form Modal */}
              {(isAddingProject || editingProject) && (
                <form onSubmit={handleSaveProject} className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <h4 className="text-base font-bold text-white">
                      {editingProject?.id ? `Edit: ${editingProject.title}` : 'Create New Project Record'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProject?.title || ''}
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={editingProject?.category || 'AI / ML'}
                        onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      >
                        <option value="AI / ML">AI / ML</option>
                        <option value="Web & Full-Stack">Web & Full-Stack</option>
                        <option value="Mobile">Mobile</option>
                        <option value="3D & Graphics">3D & Graphics</option>
                        <option value="Governance / Systems">Governance / Systems</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Tagline / Short Hook</label>
                    <input
                      type="text"
                      value={editingProject?.tagline || ''}
                      onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingProject?.description || ''}
                      onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">The Problem</label>
                      <textarea
                        rows={3}
                        value={editingProject?.problem || ''}
                        onChange={e => setEditingProject({ ...editingProject, problem: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">The Solution</label>
                      <textarea
                        rows={3}
                        value={editingProject?.solution || ''}
                        onChange={e => setEditingProject({ ...editingProject, solution: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Status</label>
                      <select
                        value={editingProject?.status || 'In Progress'}
                        onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Prototype">Prototype</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Dates / Timeline</label>
                      <input
                        type="text"
                        value={editingProject?.dates || '2026'}
                        onChange={e => setEditingProject({ ...editingProject, dates: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Primary Color (Hex)</label>
                      <input
                        type="text"
                        value={editingProject?.color || '#38bdf8'}
                        onChange={e => setEditingProject({ ...editingProject, color: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Technologies (Comma separated)</label>
                      <input
                        type="text"
                        value={editingProject?.technologies ? editingProject.technologies.join(', ') : ''}
                        onChange={e => setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Project Gallery & Screenshots Manager */}
                  <ProjectGalleryManager
                    images={editingProject?.images || []}
                    onChange={(newImages) => setEditingProject({
                      ...editingProject,
                      images: newImages
                    })}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub URL</label>
                      <input
                        type="text"
                        value={editingProject?.githubUrl || ''}
                        onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Live Demo URL</label>
                      <input
                        type="text"
                        value={editingProject?.liveUrl || ''}
                        onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject?.published ?? true}
                        onChange={e => setEditingProject({ ...editingProject, published: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                      />
                      <span>Published on Public Site</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject?.featured ?? true}
                        onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                      />
                      <span>Featured Project</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                    >
                      Save Project to Database
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Projects Table */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4">Project</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Published</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white font-sans text-sm">{p.title}</div>
                          <div className="text-slate-400">{p.tagline}</div>
                        </td>
                        <td className="p-4 text-slate-300">{p.category}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            p.status === 'Completed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => saveProject({ published: !p.published }, p.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              p.published ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {p.published ? 'Active' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                            title="Edit project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${p.title}"?`)) {
                                deleteProject(p.id);
                                showToast('Project deleted');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MEDIA LIBRARY TAB */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Media Library</h3>
                <p className="text-xs font-mono text-slate-400">
                  Upload project screenshots, certificates, and profile media. Copy URLs to attach to projects or articles without editing code.
                </p>
              </div>

              {/* Upload Dropzone Form */}
              <form onSubmit={handleMediaUpload} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-mono text-slate-300">Select Image / Document File</label>
                    <input
                      type="file"
                      required
                      accept="image/*,application/pdf"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadFile(file);
                          if (!uploadName) setUploadName(file.name);
                        }
                      }}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-mono text-slate-300">Asset Label</label>
                    <input
                      type="text"
                      placeholder="e.g. DuoTrack Mobile Screen 1"
                      value={uploadName}
                      onChange={e => setUploadName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!uploadFile || uploading}
                    className="self-end px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
                  </button>
                </div>
              </form>

              {/* Media Asset Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.mediaAssets.map(asset => (
                  <div key={asset.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="h-32 rounded-xl bg-slate-950 overflow-hidden relative group">
                      <img
                        src={asset.url}
                        alt={asset.altText || asset.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white truncate">{asset.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">{asset.usedIn || 'Asset'}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          showToast('URL copied to clipboard!');
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[10px] font-mono flex items-center gap-1"
                        title="Copy Asset URL"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete media asset "${asset.name}"?`)) {
                            deleteMediaAsset(asset.id);
                            showToast('Asset removed');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Skills Constellation Manager</h3>
                  <p className="text-xs font-mono text-slate-400">Configure proficiency levels and categorizations.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSkill({ name: '', categoryId: 'cat-lang', level: 85, featured: true });
                    setIsAddingSkill(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Skill Edit Form */}
              {(isAddingSkill || editingSkill) && (
                <form onSubmit={handleSaveSkill} className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Skill Name *</label>
                      <input
                        type="text"
                        required
                        value={editingSkill?.name || ''}
                        onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={editingSkill?.categoryId || 'cat-lang'}
                        onChange={e => setEditingSkill({ ...editingSkill, categoryId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      >
                        {data.skillCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">
                        Proficiency: {editingSkill?.level || 80}%
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={editingSkill?.level || 80}
                        onChange={e => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkill(null);
                        setIsAddingSkill(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                    >
                      Save Skill
                    </button>
                  </div>
                </form>
              )}

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.skills.map(s => (
                  <div key={s.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{s.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">Level: {s.level}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSkill(s)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteSkill(s.id);
                          showToast('Skill removed');
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIMELINE / JOURNEY TAB */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Milestone & Timeline Manager</h3>
                  <p className="text-xs font-mono text-slate-400">Add or revise academic, professional, and leadership events.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTimeline({
                      year: '2026',
                      date: '2026',
                      title: '',
                      subtitle: '',
                      category: 'experience',
                      description: '',
                      tags: []
                    });
                    setIsAddingTimeline(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              {/* Form */}
              {(isAddingTimeline || editingTimeline) && (
                <form onSubmit={handleSaveTimeline} className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Milestone Title *</label>
                      <input
                        type="text"
                        required
                        value={editingTimeline?.title || ''}
                        onChange={e => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Subtitle / Organization</label>
                      <input
                        type="text"
                        value={editingTimeline?.subtitle || ''}
                        onChange={e => setEditingTimeline({ ...editingTimeline, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Date Text (e.g. June 2026 – Present)</label>
                      <input
                        type="text"
                        value={editingTimeline?.date || ''}
                        onChange={e => setEditingTimeline({ ...editingTimeline, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={editingTimeline?.category || 'experience'}
                        onChange={e => setEditingTimeline({ ...editingTimeline, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      >
                        <option value="experience">Experience</option>
                        <option value="education">Education</option>
                        <option value="project">Project</option>
                        <option value="certification">Certification</option>
                        <option value="activity">Activity / Leadership</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={editingTimeline?.tags ? editingTimeline.tags.join(', ') : ''}
                        onChange={e => setEditingTimeline({
                          ...editingTimeline,
                          tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Description</label>
                    <textarea
                      rows={2}
                      value={editingTimeline?.description || ''}
                      onChange={e => setEditingTimeline({ ...editingTimeline, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <ImageManagerField
                    label="Milestone Certificate / Evidence Photo (Optional)"
                    sublabel="Visual badge or photo for this achievement"
                    aspectRatio="video"
                    value={editingTimeline?.image || ''}
                    onChange={(url) => setEditingTimeline({ ...editingTimeline, image: url })}
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTimeline(null);
                        setIsAddingTimeline(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                    >
                      Save Milestone
                    </button>
                  </div>
                </form>
              )}

              {/* List */}
              <div className="space-y-3">
                {data.timeline.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t.title}</div>
                      <div className="text-xs text-cyan-400 font-mono">{t.subtitle} • {t.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTimeline(t)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteTimelineEvent(t.id);
                          showToast('Milestone removed');
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JOURNAL & LAB POSTS TAB */}
          {activeTab === 'posts' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Journal & Lab Articles Manager</h3>
                  <p className="text-xs font-mono text-slate-400">Publish engineering notes, research logs, and architectural writeups.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingPost({
                      title: '',
                      slug: '',
                      summary: '',
                      content: '',
                      category: 'journal',
                      tags: [],
                      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                      published: true,
                      coverImage: ''
                    });
                    setIsAddingPost(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>

              {/* Post Editor Form */}
              {(isAddingPost || editingPost) && (
                <form onSubmit={handleSavePost} className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={editingPost?.title || ''}
                        onChange={e => {
                          const val = e.target.value;
                          const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          setEditingPost({
                            ...editingPost,
                            title: val,
                            slug: editingPost?.slug || autoSlug
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingPost?.slug || ''}
                        onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={editingPost?.category || 'journal'}
                        onChange={e => setEditingPost({ ...editingPost, category: e.target.value as 'journal' | 'lab' })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      >
                        <option value="journal">Technical Journal</option>
                        <option value="lab">Lab & Architecture Note</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Publication Date</label>
                      <input
                        type="text"
                        value={editingPost?.date || ''}
                        onChange={e => setEditingPost({ ...editingPost, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={editingPost?.tags ? editingPost.tags.join(', ') : ''}
                        onChange={e => setEditingPost({
                          ...editingPost,
                          tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageManagerField
                    label="Article Cover Visual"
                    sublabel="Header image for the journal card and reader view"
                    aspectRatio="video"
                    value={editingPost?.coverImage || ''}
                    onChange={(url) => setEditingPost({ ...editingPost, coverImage: url })}
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Executive Summary</label>
                    <textarea
                      rows={2}
                      value={editingPost?.summary || ''}
                      onChange={e => setEditingPost({ ...editingPost, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Article Body Content (Markdown Supported)</label>
                    <textarea
                      rows={6}
                      value={editingPost?.content || ''}
                      onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingPost?.published ?? true}
                        onChange={e => setEditingPost({ ...editingPost, published: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                      />
                      <span>Published & Visible</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPost(null);
                          setIsAddingPost(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                      >
                        Save Article
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Posts List */}
              <div className="space-y-3">
                {data.posts.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {p.coverImage && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700">
                          <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{p.title}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                            p.category === 'lab' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-cyan-500/20 text-cyan-300'
                          }`}>
                            {p.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {p.date} • {p.tags.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPost(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Edit article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete post "${p.title}"?`)) {
                            deletePost(p.id);
                            showToast('Post removed');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE & NARRATIVE TAB */}
          {activeTab === 'profile' && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile(profileForm);
                showToast('Profile information saved!');
              }}
              className="space-y-5 max-w-4xl"
            >
              <div>
                <h3 className="text-xl font-bold text-white font-display">Profile & Bio Editor</h3>
                <p className="text-xs font-mono text-slate-400">Update personal statement, contact links, and current status.</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                {/* Visual Imagery: Avatar & Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                  <ImageManagerField
                    label="Profile Avatar / Photo"
                    sublabel="Square image displayed on Hero, Nav, and Footer"
                    aspectRatio="square"
                    value={profileForm.avatarUrl}
                    onChange={(url) => setProfileForm({ ...profileForm, avatarUrl: url })}
                  />
                  <ImageManagerField
                    label="Cosmic Profile Banner"
                    sublabel="Header background imagery"
                    aspectRatio="banner"
                    value={profileForm.bannerUrl || ''}
                    onChange={(url) => setProfileForm({ ...profileForm, bannerUrl: url })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={e => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Tagline</label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Biography</label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Personal Philosophy Statement</label>
                  <textarea
                    rows={3}
                    value={profileForm.personalStatement}
                    onChange={e => setProfileForm({ ...profileForm, personalStatement: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Phone</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* VISITOR INBOX TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Inbound Contact Messages</h3>
                <p className="text-xs font-mono text-slate-400">Recruiter and collaborator inquiries sent from the public website.</p>
              </div>

              {msgLoading && <div className="text-xs font-mono text-slate-400">Loading inbox...</div>}

              {messages.length === 0 && !msgLoading && (
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs font-mono">
                  No messages in the inbox yet.
                </div>
              )}

              <div className="space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      msg.read ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-900 border-cyan-500/40 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white font-display">{msg.name}</h4>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-cyan-400">
                          <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a> • {msg.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!msg.read && (
                          <button
                            onClick={async () => {
                              await markMessageAsRead(msg.id);
                              setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
                              showToast('Marked as read');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                          >
                            Mark Read
                          </button>
                        )}

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono"
                        >
                          Reply
                        </a>

                        <button
                          onClick={async () => {
                            if (confirm('Delete this message?')) {
                              await deleteMessage(msg.id);
                              setMessages(messages.filter(m => m.id !== msg.id));
                              showToast('Message deleted');
                            }
                          }}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-400"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-semibold text-slate-300 mb-2">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Platform & Universe Settings</h3>
                <p className="text-xs font-mono text-slate-400">Configure graphics density, site identity, and database reset.</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Site Title</label>
                  <input
                    type="text"
                    value={data.settings.siteTitle}
                    onChange={e => updateSiteSettings({ siteTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Particle Density (3D Graphics)</label>
                  <select
                    value={data.settings.particleDensity}
                    onChange={e => updateSiteSettings({ particleDensity: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="low">Low (Battery Saver)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Cinematic)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Reset Database to Seed State</div>
                    <div className="text-[11px] text-slate-400">Restores Bilal Hassan Mussa's initial projects, skills, and resume data.</div>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to reset all data back to the default resume dataset?')) {
                        await resetToInitialData();
                        showToast('Database reset to authentic resume state!');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-mono font-semibold"
                  >
                    Reset Seed Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
