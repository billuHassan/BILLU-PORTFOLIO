import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, Project, Skill, TimelineEvent, Post, MediaAsset, ContactMessage, SiteSettings, Profile, CosmicTheme, PageTab } from '../types';
import { initialPortfolioData } from '../data/initialPortfolio';

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  adminToken: string | null;
  viewMode: '3d' | '2d';
  activePage: PageTab;
  cosmicTheme: CosmicTheme;
  is3DInteractiveOverlay: boolean;
  selectedProject: Project | null;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  setViewMode: (mode: '3d' | '2d') => void;
  setActivePage: (page: PageTab) => void;
  setCosmicTheme: (theme: CosmicTheme) => void;
  setIs3DInteractiveOverlay: (val: boolean) => void;
  setSelectedProject: (proj: Project | null) => void;
  loginAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  updateProfile: (profile: Partial<Profile>) => Promise<boolean>;
  saveProject: (project: Partial<Project>, id?: string) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveSkill: (skill: Partial<Skill>, id?: string) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  saveTimelineEvent: (event: Partial<TimelineEvent>, id?: string) => Promise<boolean>;
  deleteTimelineEvent: (id: string) => Promise<boolean>;
  savePost: (post: Partial<Post>, id?: string) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  uploadMediaFile: (file: File, meta?: { name?: string; altText?: string; usedIn?: string }) => Promise<{ success: boolean; url?: string; error?: string }>;
  deleteMediaAsset: (id: string) => Promise<boolean>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  sendContactMessage: (msg: { name: string; email: string; subject?: string; message: string; honeypot?: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  fetchAdminMessages: () => Promise<ContactMessage[]>;
  markMessageAsRead: (id: string) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  resetToInitialData: () => Promise<boolean>;
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<PageTab>('universe');
  const [cosmicTheme, setCosmicTheme] = useState<CosmicTheme>('cyan');
  const [is3DInteractiveOverlay, setIs3DInteractiveOverlay] = useState<boolean>(false);

  // Restore saved view mode and cosmic theme preference
  useEffect(() => {
    const savedMode = localStorage.getItem('bhm_view_mode') as '3d' | '2d' | null;
    if (savedMode) {
      setViewMode(savedMode);
    }
    const savedTheme = localStorage.getItem('bhm_cosmic_theme') as CosmicTheme | null;
    if (savedTheme) {
      setCosmicTheme(savedTheme);
    }
    const savedPage = localStorage.getItem('bhm_active_page') as PageTab | null;
    if (savedPage) {
      setActivePage(savedPage);
    }
  }, []);

  const handleSetViewMode = (mode: '3d' | '2d') => {
    setViewMode(mode);
    localStorage.setItem('bhm_view_mode', mode);
  };

  const handleSetActivePage = (page: PageTab) => {
    setActivePage(page);
    localStorage.setItem('bhm_active_page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetCosmicTheme = (theme: CosmicTheme) => {
    setCosmicTheme(theme);
    localStorage.setItem('bhm_cosmic_theme', theme);
  };

  // Restore admin token if present
  useEffect(() => {
    const savedToken = sessionStorage.getItem('bhm_admin_token');
    if (savedToken) {
      setAdminToken(savedToken);
      // Verify token
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then(res => res.json())
        .then(res => {
          if (res.authenticated) {
            setIsAdmin(true);
          } else {
            sessionStorage.removeItem('bhm_admin_token');
            setAdminToken(null);
            setIsAdmin(false);
          }
        })
        .catch(() => {
          // Keep offline state
        });
    }
  }, []);

  // Fetch portfolio data
  const refreshPortfolio = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          setError(null);
        }
      }
    } catch (err) {
      console.warn('Backend API connection warning, using initial client data cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPortfolio();
  }, []);

  // Login
  const loginAdmin = async (password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      if (res.ok && result.success && result.token) {
        setAdminToken(result.token);
        setIsAdmin(true);
        sessionStorage.setItem('bhm_admin_token', result.token);
        return { success: true };
      }
      return { success: false, error: result.error || 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection error' };
    }
  };

  // Logout
  const logoutAdmin = () => {
    if (adminToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      }).catch(() => {});
    }
    setAdminToken(null);
    setIsAdmin(false);
    sessionStorage.removeItem('bhm_admin_token');
  };

  // Update Profile
  const updateProfile = async (profileUpdate: Partial<Profile>) => {
    const updated = { ...data.profile, ...profileUpdate };
    setData(prev => ({ ...prev, profile: updated }));

    if (adminToken) {
      try {
        const res = await fetch('/api/admin/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(profileUpdate)
        });
        return res.ok;
      } catch (e) {
        console.error('Failed to sync profile update:', e);
      }
    }
    return true;
  };

  // Save Project (Add or Update)
  const saveProject = async (project: Partial<Project>, id?: string) => {
    let updatedProjects: Project[];
    if (id) {
      updatedProjects = data.projects.map(p => (p.id === id ? ({ ...p, ...project } as Project) : p));
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        slug: (project.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: project.title || 'New Project',
        tagline: project.tagline || '',
        description: project.description || '',
        problem: project.problem || '',
        solution: project.solution || '',
        features: project.features || [],
        technologies: project.technologies || [],
        category: project.category || 'Web & Full-Stack',
        status: project.status || 'In Progress',
        dates: project.dates || '2026',
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        images: project.images && project.images.length > 0 ? project.images : [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
        ],
        featured: project.featured ?? false,
        published: project.published ?? true,
        lessonsLearned: project.lessonsLearned,
        futurePlans: project.futurePlans,
        skillsLinked: project.skillsLinked || [],
        metrics: project.metrics || [],
        orbitRadius: 18 + (data.projects.length + 1) * 8,
        color: project.color || '#38bdf8'
      };
      updatedProjects = [...data.projects, newProj];
    }

    setData(prev => ({ ...prev, projects: updatedProjects }));

    if (adminToken) {
      try {
        const url = id ? `/api/admin/projects/${id}` : '/api/admin/projects';
        const method = id ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(project)
        });
        return res.ok;
      } catch (err) {
        console.error('Failed to sync project:', err);
      }
    }
    return true;
  };

  // Delete Project
  const deleteProject = async (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    if (adminToken) {
      try {
        const res = await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        return res.ok;
      } catch (err) {
        console.error('Failed to delete project on server:', err);
      }
    }
    return true;
  };

  // Save Skill
  const saveSkill = async (skill: Partial<Skill>, id?: string) => {
    let updatedSkills: Skill[];
    if (id) {
      updatedSkills = data.skills.map(s => (s.id === id ? ({ ...s, ...skill } as Skill) : s));
    } else {
      const newSkill: Skill = {
        id: `skill-${Date.now()}`,
        name: skill.name || 'New Skill',
        categoryId: skill.categoryId || 'cat-lang',
        level: skill.level || 80,
        featured: skill.featured ?? true,
        description: skill.description || ''
      };
      updatedSkills = [...data.skills, newSkill];
    }
    setData(prev => ({ ...prev, skills: updatedSkills }));

    if (adminToken) {
      try {
        const url = id ? `/api/admin/skills/${id}` : '/api/admin/skills';
        const method = id ? 'PUT' : 'POST';
        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(skill)
        });
      } catch (e) {}
    }
    return true;
  };

  // Delete Skill
  const deleteSkill = async (id: string) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    if (adminToken) {
      try {
        await fetch(`/api/admin/skills/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {}
    }
    return true;
  };

  // Save Timeline Event
  const saveTimelineEvent = async (event: Partial<TimelineEvent>, id?: string) => {
    let updatedTimeline: TimelineEvent[];
    if (id) {
      updatedTimeline = data.timeline.map(t => (t.id === id ? ({ ...t, ...event } as TimelineEvent) : t));
    } else {
      const newEvent: TimelineEvent = {
        id: `time-${Date.now()}`,
        year: event.year || '2026',
        date: event.date || '2026',
        title: event.title || 'New Milestone',
        subtitle: event.subtitle || '',
        category: event.category || 'milestone',
        description: event.description || '',
        tags: event.tags || [],
        current: event.current ?? false
      };
      updatedTimeline = [newEvent, ...data.timeline];
    }
    setData(prev => ({ ...prev, timeline: updatedTimeline }));

    if (adminToken) {
      try {
        const url = id ? `/api/admin/timeline/${id}` : '/api/admin/timeline';
        const method = id ? 'PUT' : 'POST';
        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(event)
        });
      } catch (e) {}
    }
    return true;
  };

  // Delete Timeline Event
  const deleteTimelineEvent = async (id: string) => {
    setData(prev => ({ ...prev, timeline: prev.timeline.filter(t => t.id !== id) }));
    if (adminToken) {
      try {
        await fetch(`/api/admin/timeline/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {}
    }
    return true;
  };

  // Save Post
  const savePost = async (post: Partial<Post>, id?: string) => {
    let updatedPosts: Post[];
    if (id) {
      updatedPosts = data.posts.map(p => (p.id === id ? ({ ...p, ...post } as Post) : p));
    } else {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        slug: (post.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: post.title || 'New Entry',
        summary: post.summary || '',
        content: post.content || '',
        category: post.category || 'journal',
        coverImage: post.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        tags: post.tags || [],
        date: post.date || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        published: post.published ?? true,
        relatedProjectId: post.relatedProjectId
      };
      updatedPosts = [newPost, ...data.posts];
    }
    setData(prev => ({ ...prev, posts: updatedPosts }));

    if (adminToken) {
      try {
        const url = id ? `/api/admin/posts/${id}` : '/api/admin/posts';
        const method = id ? 'PUT' : 'POST';
        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(post)
        });
      } catch (e) {}
    }
    return true;
  };

  // Delete Post
  const deletePost = async (id: string) => {
    setData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
    if (adminToken) {
      try {
        await fetch(`/api/admin/posts/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {}
    }
    return true;
  };

  // Upload Media
  const uploadMediaFile = async (file: File, meta?: { name?: string; altText?: string; usedIn?: string }) => {
    if (!adminToken) {
      return { success: false, error: 'Admin session required' };
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (meta?.name) formData.append('name', meta.name);
      if (meta?.altText) formData.append('altText', meta.altText);
      if (meta?.usedIn) formData.append('usedIn', meta.usedIn);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: formData
      });
      const result = await res.json();
      if (res.ok && result.success) {
        if (result.asset) {
          setData(prev => ({
            ...prev,
            mediaAssets: [result.asset, ...prev.mediaAssets]
          }));
        }
        return { success: true, url: result.fileUrl };
      }
      return { success: false, error: result.error || 'Upload failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Upload error' };
    }
  };

  // Delete Media
  const deleteMediaAsset = async (id: string) => {
    setData(prev => ({ ...prev, mediaAssets: prev.mediaAssets.filter(m => m.id !== id) }));
    if (adminToken) {
      try {
        await fetch(`/api/admin/media/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {}
    }
    return true;
  };

  // Update Settings
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    const updated = { ...data.settings, ...settings };
    setData(prev => ({ ...prev, settings: updated }));
    if (adminToken) {
      try {
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(settings)
        });
      } catch (e) {}
    }
    return true;
  };

  // Contact Form Submission
  const sendContactMessage = async (msg: { name: string; email: string; subject?: string; message: string; honeypot?: string }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        return { success: true, message: result.message };
      }
      return { success: false, error: result.error || 'Submission failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Connection error' };
    }
  };

  // Admin Messages Fetching
  const fetchAdminMessages = async (): Promise<ContactMessage[]> => {
    if (!adminToken) return [];
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const result = await res.json();
      if (res.ok && result.messages) {
        return result.messages;
      }
    } catch (e) {}
    return [];
  };

  const markMessageAsRead = async (id: string) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  const deleteMessage = async (id: string) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  // Reset to initial
  const resetToInitialData = async () => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setData(initialPortfolioData);
        return true;
      }
    } catch (e) {}
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        error,
        isAdmin,
        adminToken,
        viewMode,
        activePage,
        cosmicTheme,
        is3DInteractiveOverlay,
        selectedProject,
        isAdminOpen,
        setIsAdminOpen,
        setViewMode: handleSetViewMode,
        setActivePage: handleSetActivePage,
        setCosmicTheme: handleSetCosmicTheme,
        setIs3DInteractiveOverlay,
        setSelectedProject,
        loginAdmin,
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
        sendContactMessage,
        fetchAdminMessages,
        markMessageAsRead,
        deleteMessage,
        resetToInitialData,
        refreshPortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
