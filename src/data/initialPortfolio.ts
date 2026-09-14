import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Bilal Hassan Mussa",
    title: "Software Engineering Graduate Candidate & Tech Advisory Intern",
    tagline: "Architecting interactive digital experiences, scalable full-stack applications, and robust technology advisory solutions.",
    bio: "Software Engineering undergraduate at TAR UMT with a 3.72/4.00 CGPA, graduating in November 2026. Technology Advisory Intern with extensive hands-on experience in technology consulting, internal IT controls auditing, risk assessments, and governance. Proven record in developing production-grade web and mobile applications including AI-driven career engines, real-time administrative dashboards, and WebGL 3D visualizations.",
    personalStatement: "Driven by curiosity and engineering rigor, I bridge the gap between creative visual computing (Three.js/WebGL), enterprise cloud architecture (Node.js, Flutter, Firebase), and strategic technology advisory to build systems that are both mathematically elegant and commercially resilient.",
    location: "Kuala Lumpur, Malaysia",
    email: "BilalhassanMussa@gmail.com",
    phone: "+60 11-2601 0717",
    linkedin: "https://linkedin.com/in/bilal-hassan-mussa-431a9439b",
    github: "https://github.com/billuHassan",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80",
    status: "Available for Full-time Roles & Engineering Opportunities",
    currentFocus: "Next-gen Interactive 3D Web, AI Systems, Enterprise Risk Governance",
    goals: "Deliver high-impact software engineering solutions and advance toward technical leadership in full-stack architecture and tech consulting.",
    interests: ["Interactive 3D Web Graphics", "Cloud Governance & Risk", "Generative AI Architectures", "Mobile App Ecosystems", "Open Source Innovation"],
    languages: [
      { name: "English", level: "Professional Working Proficiency", proficiency: 90 },
      { name: "Swahili", level: "Native / Bilingual", proficiency: 100 },
      { name: "Arabic", level: "Professional Working Proficiency", proficiency: 80 }
    ],
    university: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
    candidateDegree: "Software Engineering Candidate",
    cgpa: "3.72",
    awardHighlight: "Top 50 GAP Award",
    graduationDate: "Nov 2026",
    pillar1: "Tech Advisory & Risk Audit (Axcelasia)",
    pillar2: "Full-Stack & 3D WebGL Architectures",
    pillar3: "TAR UMT Software Eng • 3.72 CGPA",
    pillar4: "Kuala Lumpur, Malaysia",
    aboutHeadline: "Bridging Software Engineering with Technology Governance",
    aboutSubheadline: "I fuse modern full-stack development, 3D computer graphics, and technology advisory to architect resilient, high-security software systems.",
    aboutPillar1Title: "Tech Advisory & Audit",
    aboutPillar1Desc: "Evaluating internal IT controls, modeling enterprise risk, and presenting governance findings to leadership.",
    aboutPillar2Title: "Full-Stack & Mobile",
    aboutPillar2Desc: "Developing robust platforms with Flutter, Firebase, React, Node.js, and strict RBAC governance.",
    aboutPillar3Title: "Interactive 3D Web",
    aboutPillar3Desc: "Crafting spatial WebGL/Three.js data explorers, interactive architectural topology, and dynamic canvases.",
    twitter: "",
    calendly: ""
  },
  projects: [
    {
      id: "proj-1",
      slug: "ai-career-assistant",
      title: "AI Career Assistant Platform",
      tagline: "Personalized intelligent career advisory & skill-gap matching engine",
      description: "A full-scale career-assistance web platform providing personalized vocational guidance, automated CV analysis, and live job-market trend alignments powered by AI and modern web technologies.",
      problem: "Graduates and emerging developers struggle to identify accurate skill deficiencies, align with shifting tech-market requirements, and navigate personalized career roadmaps.",
      solution: "Engineered an AI-backed web platform utilizing modern generative APIs, dynamic skill clustering, and real-time gap evaluations to deliver tailored career roadmaps and relevant job matches.",
      features: [
        "Dynamic career roadmap generation tailored to individual candidate backgrounds",
        "Automated skill-market alignment and recommendation synthesis",
        "Interactive career exploration dashboard with actionable feedback milestones",
        "Vercel cloud continuous delivery pipeline with instantaneous edge routing"
      ],
      technologies: ["React", "JavaScript", "Google AI Studio", "Tailwind CSS", "Vercel", "REST APIs"],
      category: "AI / ML",
      status: "In Progress",
      dates: "June 2026 – Present",
      githubUrl: "https://github.com/billuHassan/ai-career-assistant",
      liveUrl: "https://ai-career-assistant.vercel.app",
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      published: true,
      lessonsLearned: "Architecting server-side AI proxy routes prevents token leakages and minimizes browser latency while delivering personalized career telemetry.",
      futurePlans: "Incorporate automated real-time mock interviews using WebRTC and multi-modal AI feedback loops.",
      skillsLinked: ["skill-3", "skill-6", "skill-7", "skill-11"],
      metrics: ["Sub-500ms AI Response Inference", "Personalized Trajectory Scoring", "Modular React Component Architecture"],
      orbitRadius: 18,
      color: "#38bdf8"
    },
    {
      id: "proj-2",
      slug: "duotrack-mobile-admin",
      title: "DuoTrack Mobile App — Administrative Module",
      tagline: "Centralized administration, user telemetry, and reward governance system",
      description: "Architected and built the mission-critical administrative module for DuoTrack, a Flutter and Firebase mobile ecosystem, delivering enterprise-level user moderation, goal tracking, and announcements.",
      problem: "Mobile client applications require dependable, low-latency administrative backends to enforce role-based access control, manage reward points, and broadcast urgent updates securely.",
      solution: "Created an administrative console and cloud synchronization module with Firebase Firestore and Authentication, providing administrators with real-time management of user tiers, goal milestones, and systemic push broadcasts.",
      features: [
        "Comprehensive user lifecycle management and access control enforcement",
        "Gamification point calculation engine and milestone verification pipelines",
        "Centralized announcement broadcasting and notification telemetry",
        "Real-time reactive synchronization using Firebase Firestore listeners"
      ],
      technologies: ["Flutter", "Dart", "Firebase", "Firestore", "Firebase Auth", "Cloud Functions"],
      category: "Mobile",
      status: "Completed",
      dates: "November 2025 – April 2026",
      githubUrl: "https://github.com/billuHassan/duotrack-admin-module",
      liveUrl: "https://github.com/billuHassan/duotrack-admin-module",
      images: [
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      published: true,
      lessonsLearned: "Designing granular Firestore security rules and indexing schemas prevented unauthorized privilege escalations across multi-tenant mobile clients.",
      futurePlans: "Extend automated anomaly alerts for unusual points transactions using serverless triggers.",
      skillsLinked: ["skill-7", "skill-8", "skill-12", "skill-13"],
      metrics: ["Zero Security Breaches", "Real-time State Synchronization", "500+ Simulated Mobile Users Handled"],
      orbitRadius: 28,
      color: "#818cf8"
    },
    {
      id: "proj-3",
      slug: "3d-data-visualization",
      title: "Interactive 3D Data Visualization Engine",
      tagline: "High-performance WebGL & Three.js spatial graph exploratory canvas",
      description: "An interactive spatial 3D data visualization environment engineered to transform dense multidimensional datasets into intuitive, navigable galactic nodes and interactive clusters.",
      problem: "Traditional 2D bar charts and scatter plots fail to represent high-dimensional clustering, relationship weights, and cross-variable dependencies effectively.",
      solution: "Employed Three.js, WebGL shader pipelines, and custom force-directed spatial layouts to empower users to rotate, inspect, filter, and drill into data clusters in real-time 3D space.",
      features: [
        "Interactive 3D orbital camera with buttery smooth lerping and bounded panning",
        "Spatial node clustering with dynamic luminous color gradients based on cluster density",
        "High-performance particle systems rendering 5,000+ data coordinates at 60 FPS",
        "Custom HUD info-cards displaying deep metric inspections upon node selection"
      ],
      technologies: ["JavaScript", "Three.js", "WebGL", "HTML5 Canvas", "CSS3", "Math3D"],
      category: "3D & Graphics",
      status: "Completed",
      dates: "April 2026",
      githubUrl: "https://github.com/billuHassan/3d-data-visualization",
      liveUrl: "https://github.com/billuHassan/3d-data-visualization",
      images: [
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      published: true,
      lessonsLearned: "Reusing geometries and instanced meshes drastically lowers draw calls from hundreds to single digits, ensuring smooth performance even on mobile WebGL.",
      futurePlans: "Support live CSV/JSON data ingest and VR headset spatial inspection mode.",
      skillsLinked: ["skill-3", "skill-9", "skill-10", "skill-6"],
      metrics: ["60 FPS across desktop GPUs", "5,000+ Interactive Data Nodes", "Sub-10ms raycasting hit tests"],
      orbitRadius: 38,
      color: "#34d399"
    }
  ],
  skillCategories: [
    { id: "cat-lang", name: "Core Languages", description: "Foundational programming and algorithmic languages", icon: "Code" },
    { id: "cat-web", name: "Web & Mobile Development", description: "Responsive interfaces, mobile apps, and UI toolkits", icon: "Layout" },
    { id: "cat-3d", name: "3D & Creative Computing", description: "WebGL shaders, spatial rendering, and immersive canvases", icon: "Box" },
    { id: "cat-backend", name: "Backend, Cloud & Databases", description: "API gateways, real-time databases, and cloud infrastructure", icon: "Database" },
    { id: "cat-advisory", name: "Tech Advisory & Governance", description: "Audit frameworks, risk assessments, and executive communication", icon: "ShieldCheck" }
  ],
  skills: [
    { id: "skill-1", name: "Java", categoryId: "cat-lang", level: 90, featured: true, description: "Object-oriented design patterns, enterprise patterns, threading" },
    { id: "skill-2", name: "C++", categoryId: "cat-lang", level: 85, featured: false, description: "Memory management, data structures, low-level optimization" },
    { id: "skill-3", name: "JavaScript", categoryId: "cat-lang", level: 95, featured: true, description: "ES6+, async pipelines, DOM, functional patterns" },
    { id: "skill-4", name: "Python", categoryId: "cat-lang", level: 88, featured: true, description: "Data analytics, scripting, automation, AI integration" },
    { id: "skill-5", name: "SQL", categoryId: "cat-lang", level: 88, featured: true, description: "Complex relational queries, indexing, schema optimization" },
    { id: "skill-6", name: "Web Development", categoryId: "cat-web", level: 95, featured: true, description: "Modern responsive web architecture, HTML5, CSS3, REST" },
    { id: "skill-7", name: "Flutter", categoryId: "cat-web", level: 86, featured: true, description: "Cross-platform mobile apps, reactive state, custom UI widgets" },
    { id: "skill-8", name: "Firebase", categoryId: "cat-backend", level: 90, featured: true, description: "Firestore, Firebase Auth, security rules, Cloud Functions" },
    { id: "skill-9", name: "Three.js", categoryId: "cat-3d", level: 92, featured: true, description: "Scene graph, materials, particle systems, camera control" },
    { id: "skill-10", name: "WebGL", categoryId: "cat-3d", level: 82, featured: true, description: "Shader pipelines, 3D graphics hardware acceleration" },
    { id: "skill-11", name: "Technology Consulting", categoryId: "cat-advisory", level: 88, featured: true, description: "Strategic tech assessments, client requirements translation" },
    { id: "skill-12", name: "Internal Auditing", categoryId: "cat-advisory", level: 85, featured: true, description: "IT process audit, controls validation, gap identification" },
    { id: "skill-13", name: "Risk Assessment", categoryId: "cat-advisory", level: 87, featured: true, description: "Technology & operational threat modeling and mitigation" },
    { id: "skill-14", name: "Client Communication", categoryId: "cat-advisory", level: 92, featured: true, description: "Executive stakeholder presentations and report synthesis" }
  ],
  timeline: [
    {
      id: "time-1",
      year: "2026",
      date: "August 2026",
      title: "Committee Member — CIAG 2026",
      subtitle: "ISACA Malaysia Chapter",
      category: "activity",
      description: "Administered Eventify event-management platform for premier annual governance conference hosting ~500 attendees. Executed attendee lifecycle operations and feedback analytics.",
      tags: ["ISACA", "Governance", "Eventify", "500 Attendees"]
    },
    {
      id: "time-2",
      year: "2026",
      date: "June 2026 – Present",
      title: "Technology Advisory Intern",
      subtitle: "Axcelasia Sdn Bhd",
      category: "experience",
      description: "Executing internal audit reviews, operational process gap analyses, tech consulting engagements, and presenting control enhancement roadmaps to senior executive leadership.",
      tags: ["Internal Audit", "Tech Advisory", "Risk Controls", "Client Consulting"],
      current: true
    },
    {
      id: "time-3",
      year: "2026",
      date: "June 2026",
      title: "AI Career Assistant Platform Launch",
      subtitle: "Personal Innovation Project",
      category: "project",
      description: "Engineered and deployed an intelligent career navigation and skills-matching platform leveraging Google AI Studio and modern web stacks.",
      tags: ["AI", "React", "Cloud Deployment", "Google AI Studio"]
    },
    {
      id: "time-4",
      year: "2026",
      date: "May 2026",
      title: "GAP Platinum Award Recipient",
      subtitle: "TAR UMT — Top 50 Students",
      category: "certification",
      description: "Honored with the prestigious Graduate Attributes Programme (GAP) Platinum Award, recognizing top 50 student leadership, academic excellence, and community impact.",
      tags: ["GAP Platinum", "Top 50", "Honors"]
    },
    {
      id: "time-5",
      year: "2026",
      date: "April 2026",
      title: "3D Data Visualization Engine",
      subtitle: "Computer Graphics Showcase",
      category: "project",
      description: "Built WebGL-accelerated 3D data explorer rendering multi-dimensional nodes and interactive particle fields with real-time GPU math.",
      tags: ["Three.js", "WebGL", "Data Science", "Canvas"]
    },
    {
      id: "time-6",
      year: "2025–2026",
      date: "November 2025 – April 2026",
      title: "DuoTrack Mobile Admin System",
      subtitle: "Full-Stack Mobile Architecture",
      category: "project",
      description: "Spearheaded the administrative core for DuoTrack on Flutter/Firebase, establishing centralized moderation, audit trails, and announcements.",
      tags: ["Flutter", "Firebase", "RBAC", "Mobile"]
    },
    {
      id: "time-7",
      year: "2023–2026",
      date: "November 2023 – November 2026",
      title: "Bachelor of Software Engineering (Honours)",
      subtitle: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
      category: "education",
      description: "Currently pursuing degree with exceptional 3.72/4.00 CGPA. Named to Dean's List (2023–2025) and President's List (2024).",
      tags: ["Degree", "CGPA 3.72", "Software Engineering", "Honors"],
      current: true
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Technology Advisory Intern",
      company: "Axcelasia Sdn Bhd",
      location: "Kuala Lumpur, Malaysia",
      startDate: "June 2026",
      endDate: "Present",
      current: true,
      type: "Internship",
      responsibilities: [
        "Supported comprehensive internal audit activities and rigorous operational analysis to identify systemic process inefficiencies and risk exposure.",
        "Collaborated with cross-functional teams on specialized technology consulting engagements and tailored digital client architectures.",
        "Assisted in conducting detailed client interviews and risk assessments to evaluate technology, cybersecurity, and operational vulnerabilities.",
        "Synthesized and presented audit findings and strategic remediation roadmaps to senior executive management to drive governance and regulatory decision-making.",
        "Assisted in testing, reviewing, and formalizing internal IT controls to reduce enterprise compliance overhead and operational liabilities."
      ],
      skills: ["Technology Consulting", "Internal Auditing", "Risk Assessment", "Client Communication", "Governance Frameworks"]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Software Engineering (Honours)",
      institution: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
      location: "Kuala Lumpur, Malaysia",
      cgpa: "3.72 / 4.00",
      startDate: "November 2023",
      endDate: "November 2026 (Expected)",
      honors: [
        "GAP Platinum Award (2026) — Top 50 Students in TAR UMT",
        "Dean's List Award recipient (2023 – 2025)",
        "President's List Award recipient (2024)"
      ]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "GAP Platinum Award",
      issuer: "TAR UMT",
      year: "2026",
      badge: "Top 50 Students",
      description: "Prestigious university-wide distinction awarded to the top 50 graduating leaders demonstrating exemplary character, technical mastery, and campus impact."
    },
    {
      id: "cert-2",
      title: "Dean's List Award",
      issuer: "TAR UMT",
      year: "2023–2025",
      badge: "Academic Honors",
      description: "Continuous academic distinction for maintaining outstanding semester GPA scores throughout undergraduate curriculum."
    },
    {
      id: "cert-3",
      title: "President's List Distinction",
      issuer: "TAR UMT",
      year: "2024",
      badge: "Highest Academic Honor",
      description: "Highest academic honor recognized by the University President for semester-wide peak performance."
    },
    {
      id: "cert-4",
      title: "Eventify Platform Administrator Credential",
      issuer: "ISACA Malaysia Chapter / CIAG 2026",
      year: "2026",
      badge: "Event Ops",
      description: "Successfully configured and coordinated attendee management infrastructure for the 500-attendee Governance & Audit Conference."
    }
  ],
  posts: [
    {
      id: "post-1",
      slug: "bridging-risk-advisory-with-code",
      title: "Bridging Enterprise Risk Advisory with Full-Stack Engineering",
      summary: "Reflections on how conducting internal IT audits at Axcelasia transformed how I write defensive, compliant, and scalable code.",
      content: "When engineers write software, we often obsess over algorithmic throughput and user experience. But during my technology advisory internship at Axcelasia, sitting on the other side of the table with auditors and risk compliance officers revealed a crucial truth: security, audit trails, and internal controls are not post-launch checkboxes. They are fundamental architectural pillars.\n\nFrom enforcing strict role-based access control (RBAC) in Firestore to logging immutable administrative operations, software engineering and technology advisory are two sides of the same coin.",
      category: "journal",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      tags: ["Tech Advisory", "Governance", "Software Engineering", "Security"],
      date: "July 2026",
      published: true
    },
    {
      id: "post-2",
      slug: "optimizing-webgl-performance",
      title: "Achieving 60 FPS in Three.js Particle Constellations",
      summary: "Deep dive into GPU draw call reduction, instanced meshes, and custom buffer geometries for interactive 3D web environments.",
      content: "Rendering thousands of dynamic celestial stars and interactive project portals in a web browser without heating up the user's laptop requires careful memory stewardship. By bundling node coordinates into a single Float32Array BufferGeometry and utilizing instanced rendering, we reduce draw calls from over 400 down to 2.\n\nCombined with requestAnimationFrame lerping and adaptive device pixel ratios, the digital universe feels effortlessly fluid even on mobile browsers.",
      category: "lab",
      coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
      tags: ["Three.js", "WebGL", "Optimization", "Creative Dev"],
      date: "May 2026",
      published: true,
      relatedProjectId: "proj-3"
    },
    {
      id: "post-3",
      slug: "designing-flutter-admin-systems",
      title: "Designing Centralized Admin Modularity in Mobile Architectures",
      summary: "Lessons learned implementing administrative governance, telemetry, and points moderation for the DuoTrack mobile ecosystem.",
      content: "In DuoTrack, our priority was ensuring that administrative actions (broadcasting notices, adjusting user rewards, auditing accounts) were decoupled from everyday user activities. By structuring administrative privileges through custom Firebase claims and deterministic security rules, we prevented privilege escalations while providing admins with live responsive dashboards.",
      category: "journal",
      coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      tags: ["Flutter", "Firebase", "Architecture", "Mobile Admin"],
      date: "March 2026",
      published: true,
      relatedProjectId: "proj-2"
    }
  ],
  mediaAssets: [
    {
      id: "media-1",
      name: "AI Career Assistant Screenshot",
      filename: "ai-career-screen.png",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      size: 450000,
      type: "image/png",
      uploadDate: "2026-06-15",
      altText: "AI Career Assistant Platform UI",
      caption: "Dashboard view of AI career trajectory explorer",
      usedIn: "AI Career Assistant Platform"
    },
    {
      id: "media-2",
      name: "DuoTrack Admin Dashboard",
      filename: "duotrack-admin.png",
      url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
      size: 512000,
      type: "image/png",
      uploadDate: "2026-03-20",
      altText: "DuoTrack Mobile Admin Interface",
      caption: "Administrative console managing users and points",
      usedIn: "DuoTrack Mobile Application"
    },
    {
      id: "media-3",
      name: "3D Visualizer Canvas",
      filename: "threejs-canvas.png",
      url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      size: 620000,
      type: "image/png",
      uploadDate: "2026-04-10",
      altText: "Interactive 3D WebGL Visualization",
      caption: "Spatial node clusters in 3D WebGL",
      usedIn: "3D Data Visualization Website"
    },
    {
      id: "media-4",
      name: "GAP Platinum Award Certificate",
      filename: "gap-platinum-cert.jpg",
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
      size: 320000,
      type: "image/jpeg",
      uploadDate: "2026-05-18",
      altText: "GAP Platinum Award Certificate Badge",
      caption: "Top 50 Students Honor TAR UMT 2026",
      usedIn: "Achievements"
    }
  ],
  settings: {
    siteTitle: "Bilal Hassan Mussa | Digital Universe & Portfolio",
    universeTheme: "cosmic-dark",
    particleDensity: "medium",
    enable3DByDefault: true,
    accentColor: "#38bdf8",
    showAdminLink: true,
    resumeFileName: "Bilal_Hassan_Mussa_Resume.pdf",
    resumeDownloadUrl: "#resume-section",
    lastUpdated: "2026-09-10"
  }
};
