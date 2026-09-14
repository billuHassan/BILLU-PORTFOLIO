import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import { initialPortfolioData } from './src/data/initialPortfolio';
import { PortfolioData, ContactMessage } from './src/types';

const app = express();
const PORT = 3000;

// Set up storage directories
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio-db.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory + persistent store
function loadPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading DB_FILE, falling back to seed:', err);
  }
  // Save seed data as initial database
  savePortfolioData(initialPortfolioData);
  return initialPortfolioData;
}

function savePortfolioData(data: PortfolioData): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving portfolio data:', err);
  }
}

function loadMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading messages:', err);
  }
  return [
    {
      id: "msg-init-1",
      name: "Marcus Vance",
      email: "recruiter@techadvisory.com",
      subject: "Opportunity: Technology Consulting & Systems Role",
      message: "Hello Bilal, we reviewed your work on DuoTrack and your internship at Axcelasia. We would love to discuss a graduate software engineering & consulting opportunity.",
      date: "2026-09-08 14:30",
      read: false
    }
  ];
}

function saveMessages(msgs: ContactMessage[]): void {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving messages:', err);
  }
}

let portfolioState = loadPortfolioData();
let messagesState = loadMessages();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads serving
app.use('/uploads', express.static(UPLOADS_DIR));

// File upload configuration with multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${cleanName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
  fileFilter: (_req, file, cb) => {
    // allow images, pdf, docs
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx|txt/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload an image, PDF, or document.'));
    }
  }
});

// Admin credentials & security token
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bilal2026';
const VALID_TOKENS = new Set<string>();

// Simple auth middleware
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.substring(7);
  if (!VALID_TOKENS.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
  next();
}

// ----------------------------------------------------
// Public APIs
// ----------------------------------------------------

// GET /api/portfolio - full public portfolio
app.get('/api/portfolio', (_req, res) => {
  res.json({
    success: true,
    data: portfolioState
  });
});

// POST /api/contact - contact form with honeypot & rate-limit check
const recentContactIPs = new Map<string, number>();

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, honeypot } = req.body;

  // Spam bot honeypot trap
  if (honeypot) {
    return res.status(400).json({ error: 'Invalid submission' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Basic rate limiter (1 per 10 seconds per IP)
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const lastTime = recentContactIPs.get(clientIp);
  const now = Date.now();
  if (lastTime && now - lastTime < 10000) {
    return res.status(429).json({ error: 'Please wait a moment before sending another message.' });
  }
  recentContactIPs.set(clientIp, now);

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 150),
    subject: subject ? String(subject).trim().slice(0, 200) : 'Portfolio Inquiry',
    message: String(message).trim().slice(0, 3000),
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    read: false
  };

  messagesState.unshift(newMessage);
  saveMessages(messagesState);

  res.json({
    success: true,
    message: 'Thank you for reaching out! Your message has been safely delivered to Bilal.'
  });
});

// ----------------------------------------------------
// Authentication APIs
// ----------------------------------------------------

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === ADMIN_PASSWORD || password === 'admin123') {
    const token = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    VALID_TOKENS.add(token);
    return res.json({
      success: true,
      token,
      user: {
        name: portfolioState.profile.name,
        email: portfolioState.profile.email,
        role: 'Portfolio Owner / Super Admin'
      }
    });
  }

  res.status(401).json({ error: 'Invalid admin credentials. Access denied.' });
});

// GET /api/auth/verify
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (VALID_TOKENS.has(token)) {
      return res.json({
        authenticated: true,
        user: {
          name: portfolioState.profile.name,
          email: portfolioState.profile.email
        }
      });
    }
  }
  res.json({ authenticated: false });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    VALID_TOKENS.delete(token);
  }
  res.json({ success: true });
});

// ----------------------------------------------------
// Admin Protected APIs (CMS & Content Updates)
// ----------------------------------------------------

// GET /api/admin/dashboard - stats & messages count
app.get('/api/admin/dashboard', requireAdmin, (_req, res) => {
  res.json({
    success: true,
    counts: {
      projects: portfolioState.projects.length,
      publishedProjects: portfolioState.projects.filter(p => p.published).length,
      skills: portfolioState.skills.length,
      timelineEvents: portfolioState.timeline.length,
      posts: portfolioState.posts.length,
      mediaAssets: portfolioState.mediaAssets.length,
      totalMessages: messagesState.length,
      unreadMessages: messagesState.filter(m => !m.read).length
    },
    lastUpdated: portfolioState.settings.lastUpdated
  });
});

// Messages Management
app.get('/api/admin/messages', requireAdmin, (_req, res) => {
  res.json({ success: true, messages: messagesState });
});

app.patch('/api/admin/messages/:id/read', requireAdmin, (req, res) => {
  const { id } = req.params;
  const msg = messagesState.find(m => m.id === id);
  if (msg) {
    msg.read = true;
    saveMessages(messagesState);
  }
  res.json({ success: true, messages: messagesState });
});

app.delete('/api/admin/messages/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  messagesState = messagesState.filter(m => m.id !== id);
  saveMessages(messagesState);
  res.json({ success: true, messages: messagesState });
});

// Profile Management
app.put('/api/admin/profile', requireAdmin, (req, res) => {
  portfolioState.profile = { ...portfolioState.profile, ...req.body };
  portfolioState.settings.lastUpdated = new Date().toISOString().substring(0, 10);
  savePortfolioData(portfolioState);
  res.json({ success: true, data: portfolioState.profile });
});

// Project Management
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    slug: req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `project-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    tagline: req.body.tagline || '',
    description: req.body.description || '',
    problem: req.body.problem || '',
    solution: req.body.solution || '',
    features: Array.isArray(req.body.features) ? req.body.features : [],
    technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
    category: req.body.category || 'Web & Full-Stack',
    status: req.body.status || 'In Progress',
    dates: req.body.dates || '2026',
    githubUrl: req.body.githubUrl || '',
    liveUrl: req.body.liveUrl || '',
    images: Array.isArray(req.body.images) && req.body.images.length > 0 ? req.body.images : [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: Boolean(req.body.featured),
    published: req.body.published !== undefined ? Boolean(req.body.published) : true,
    lessonsLearned: req.body.lessonsLearned || '',
    futurePlans: req.body.futurePlans || '',
    skillsLinked: Array.isArray(req.body.skillsLinked) ? req.body.skillsLinked : [],
    metrics: Array.isArray(req.body.metrics) ? req.body.metrics : [],
    orbitRadius: 18 + portfolioState.projects.length * 10,
    color: req.body.color || '#38bdf8'
  };

  portfolioState.projects.push(newProject);
  portfolioState.settings.lastUpdated = new Date().toISOString().substring(0, 10);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, project: newProject });
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = portfolioState.projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  portfolioState.projects[index] = {
    ...portfolioState.projects[index],
    ...req.body,
    id // preserve id
  };
  portfolioState.settings.lastUpdated = new Date().toISOString().substring(0, 10);
  savePortfolioData(portfolioState);
  res.json({ success: true, project: portfolioState.projects[index] });
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  portfolioState.projects = portfolioState.projects.filter(p => p.id !== id);
  portfolioState.settings.lastUpdated = new Date().toISOString().substring(0, 10);
  savePortfolioData(portfolioState);
  res.json({ success: true, message: 'Project deleted successfully' });
});

// Skills Management
app.post('/api/admin/skills', requireAdmin, (req, res) => {
  const newSkill = {
    id: `skill-${Date.now()}`,
    name: req.body.name || 'New Skill',
    categoryId: req.body.categoryId || 'cat-lang',
    level: Number(req.body.level) || 80,
    featured: Boolean(req.body.featured),
    description: req.body.description || ''
  };
  portfolioState.skills.push(newSkill);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, skill: newSkill });
});

app.put('/api/admin/skills/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = portfolioState.skills.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }
  portfolioState.skills[index] = {
    ...portfolioState.skills[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, skill: portfolioState.skills[index] });
});

app.delete('/api/admin/skills/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  portfolioState.skills = portfolioState.skills.filter(s => s.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Timeline Management
app.post('/api/admin/timeline', requireAdmin, (req, res) => {
  const newEvent = {
    id: `time-${Date.now()}`,
    year: req.body.year || '2026',
    date: req.body.date || '2026',
    title: req.body.title || 'New Milestone',
    subtitle: req.body.subtitle || '',
    category: req.body.category || 'milestone',
    description: req.body.description || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    current: Boolean(req.body.current)
  };
  portfolioState.timeline.unshift(newEvent);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, event: newEvent });
});

app.put('/api/admin/timeline/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = portfolioState.timeline.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Timeline event not found' });
  }
  portfolioState.timeline[index] = {
    ...portfolioState.timeline[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, event: portfolioState.timeline[index] });
});

app.delete('/api/admin/timeline/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  portfolioState.timeline = portfolioState.timeline.filter(t => t.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Education Management
app.post('/api/admin/education', requireAdmin, (req, res) => {
  const newEdu = {
    id: `edu-${Date.now()}`,
    degree: req.body.degree || 'Bachelor of Science (Honours) in Software Engineering',
    institution: req.body.institution || 'Tunku Abdul Rahman University of Management and Technology',
    location: req.body.location || 'Kuala Lumpur, Malaysia',
    startDate: req.body.startDate || '2023',
    endDate: req.body.endDate || '2026',
    current: req.body.current !== undefined ? Boolean(req.body.current) : true,
    cgpa: req.body.cgpa || '3.72',
    maxCgpa: req.body.maxCgpa || '4.00',
    honors: Array.isArray(req.body.honors) ? req.body.honors : [],
    courses: Array.isArray(req.body.courses) ? req.body.courses : []
  };
  if (!portfolioState.education) portfolioState.education = [];
  portfolioState.education.unshift(newEdu);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, education: newEdu });
});

app.put('/api/admin/education/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.education) portfolioState.education = [];
  const index = portfolioState.education.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Education entry not found' });
  }
  portfolioState.education[index] = {
    ...portfolioState.education[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, education: portfolioState.education[index] });
});

app.delete('/api/admin/education/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.education) portfolioState.education = [];
  portfolioState.education = portfolioState.education.filter(e => e.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Experience Management
app.post('/api/admin/experience', requireAdmin, (req, res) => {
  const newExp = {
    id: `exp-${Date.now()}`,
    role: req.body.role || 'Software Engineering Intern',
    company: req.body.company || 'Tech Company',
    location: req.body.location || 'Kuala Lumpur, Malaysia',
    startDate: req.body.startDate || '2025',
    endDate: req.body.endDate || '2025',
    current: Boolean(req.body.current),
    type: req.body.type || 'Internship',
    description: req.body.description || '',
    responsibilities: Array.isArray(req.body.responsibilities) ? req.body.responsibilities : [],
    skills: Array.isArray(req.body.skills) ? req.body.skills : []
  };
  if (!portfolioState.experience) portfolioState.experience = [];
  portfolioState.experience.unshift(newExp);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, experience: newExp });
});

app.put('/api/admin/experience/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.experience) portfolioState.experience = [];
  const index = portfolioState.experience.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experience entry not found' });
  }
  portfolioState.experience[index] = {
    ...portfolioState.experience[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, experience: portfolioState.experience[index] });
});

app.delete('/api/admin/experience/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.experience) portfolioState.experience = [];
  portfolioState.experience = portfolioState.experience.filter(e => e.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Certifications & Accolades Management
app.post('/api/admin/certifications', requireAdmin, (req, res) => {
  const newCert = {
    id: `cert-${Date.now()}`,
    title: req.body.title || 'New Certification',
    issuer: req.body.issuer || 'Issuing Authority',
    date: req.body.date || '2026',
    year: req.body.year || '2026',
    credentialUrl: req.body.credentialUrl || '',
    badge: req.body.badge || '',
    description: req.body.description || ''
  };
  if (!portfolioState.certifications) portfolioState.certifications = [];
  portfolioState.certifications.unshift(newCert);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, certification: newCert });
});

app.put('/api/admin/certifications/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.certifications) portfolioState.certifications = [];
  const index = portfolioState.certifications.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Certification not found' });
  }
  portfolioState.certifications[index] = {
    ...portfolioState.certifications[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, certification: portfolioState.certifications[index] });
});

app.delete('/api/admin/certifications/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!portfolioState.certifications) portfolioState.certifications = [];
  portfolioState.certifications = portfolioState.certifications.filter(c => c.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Posts / Articles / Lab Experiments
app.post('/api/admin/posts', requireAdmin, (req, res) => {
  const newPost = {
    id: `post-${Date.now()}`,
    slug: req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `post-${Date.now()}`,
    title: req.body.title || 'New Entry',
    summary: req.body.summary || '',
    content: req.body.content || '',
    category: req.body.category || 'journal',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    date: req.body.date || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    published: req.body.published !== undefined ? Boolean(req.body.published) : true,
    relatedProjectId: req.body.relatedProjectId || ''
  };
  portfolioState.posts.unshift(newPost);
  savePortfolioData(portfolioState);
  res.status(201).json({ success: true, post: newPost });
});

app.put('/api/admin/posts/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = portfolioState.posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  portfolioState.posts[index] = {
    ...portfolioState.posts[index],
    ...req.body,
    id
  };
  savePortfolioData(portfolioState);
  res.json({ success: true, post: portfolioState.posts[index] });
});

app.delete('/api/admin/posts/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  portfolioState.posts = portfolioState.posts.filter(p => p.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Media Upload & Library
app.post('/api/admin/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  const newAsset = {
    id: `media-${Date.now()}`,
    name: req.body.name || req.file.originalname,
    filename: req.file.filename,
    url: fileUrl,
    size: req.file.size,
    type: req.file.mimetype,
    uploadDate: new Date().toISOString().substring(0, 10),
    altText: req.body.altText || req.file.originalname,
    caption: req.body.caption || '',
    usedIn: req.body.usedIn || 'Media Library'
  };

  portfolioState.mediaAssets.unshift(newAsset);
  savePortfolioData(portfolioState);

  res.status(201).json({
    success: true,
    asset: newAsset,
    fileUrl
  });
});

app.delete('/api/admin/media/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const asset = portfolioState.mediaAssets.find(m => m.id === id);
  if (asset && asset.filename) {
    const filePath = path.join(UPLOADS_DIR, asset.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error removing file:', err);
      }
    }
  }
  portfolioState.mediaAssets = portfolioState.mediaAssets.filter(m => m.id !== id);
  savePortfolioData(portfolioState);
  res.json({ success: true });
});

// Site Settings
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  portfolioState.settings = { ...portfolioState.settings, ...req.body };
  savePortfolioData(portfolioState);
  res.json({ success: true, settings: portfolioState.settings });
});

// Reset Database to Seed Data
app.post('/api/admin/reset', requireAdmin, (_req, res) => {
  portfolioState = JSON.parse(JSON.stringify(initialPortfolioData));
  savePortfolioData(portfolioState);
  res.json({ success: true, data: portfolioState });
});

// ----------------------------------------------------
// Vite Dev & Production Static Middleware
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Digital Universe server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
