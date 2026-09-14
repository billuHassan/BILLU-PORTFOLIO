export type CosmicTheme = 'cyan' | 'amethyst' | 'solar' | 'aurora';
export type PageTab = 'universe' | 'projects' | 'journey' | 'all';

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  personalStatement: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter?: string;
  calendly?: string;
  avatarUrl: string;
  bannerUrl?: string;
  status: string;
  currentFocus: string;
  goals: string;
  interests: string[];
  languages: { name: string; level: string; proficiency?: number }[];
  university?: string;
  candidateDegree?: string;
  cgpa?: string;
  awardHighlight?: string;
  graduationDate?: string;
  pillar1?: string;
  pillar2?: string;
  pillar3?: string;
  pillar4?: string;
  aboutHeadline?: string;
  aboutSubheadline?: string;
  aboutPillar1Title?: string;
  aboutPillar1Desc?: string;
  aboutPillar2Title?: string;
  aboutPillar2Desc?: string;
  aboutPillar3Title?: string;
  aboutPillar3Desc?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  category: 'AI / ML' | 'Web & Full-Stack' | 'Mobile' | '3D & Graphics' | 'Governance / Systems';
  status: 'Completed' | 'In Progress' | 'Prototype';
  dates: string;
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  featured: boolean;
  published: boolean;
  lessonsLearned?: string;
  futurePlans?: string;
  skillsLinked: string[];
  metrics?: string[];
  orbitRadius?: number;
  color?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  level: number; // 1-100
  featured: boolean;
  icon?: string;
  description?: string;
  projectIds?: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  category: 'experience' | 'education' | 'project' | 'certification' | 'activity' | 'milestone';
  description: string;
  tags: string[];
  current?: boolean;
  image?: string;
  badgeUrl?: string;
}

export type Milestone = TimelineEvent;

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  type?: string;
  description?: string;
  responsibilities: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  cgpa: string;
  startDate: string;
  endDate: string;
  honors: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge?: string;
  description: string;
  verificationUrl?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'journal' | 'lab';
  coverImage?: string;
  tags: string[];
  date: string;
  published: boolean;
  relatedProjectId?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadDate: string;
  altText?: string;
  caption?: string;
  usedIn?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  universeTheme: 'cosmic-dark' | 'deep-cyber' | 'stellar-blue';
  particleDensity: 'low' | 'medium' | 'high';
  enable3DByDefault: boolean;
  accentColor: string;
  showAdminLink: boolean;
  resumeFileName: string;
  resumeDownloadUrl: string;
  lastUpdated: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  timeline: TimelineEvent[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  posts: Post[];
  mediaAssets: MediaAsset[];
  settings: SiteSettings;
}
