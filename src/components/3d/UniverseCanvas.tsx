import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';
import { CosmicTheme } from '../../types';
import { 
  GitBranch, 
  Terminal, 
  Code, 
  CheckCircle2, 
  Layers, 
  Activity, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Palette, 
  Boxes, 
  ShieldCheck, 
  Cloud, 
  Code2, 
  Sparkles,
  Cpu
} from 'lucide-react';

export interface SDLCStageInfo {
  id: string;
  name: string;
  phase: string;
  description: string;
  status: string;
  tools: string[];
  metrics: string;
  color: string;
  colorHex: number;
  iconName: string;
}

export const SDLC_STAGES: SDLCStageInfo[] = [
  {
    id: 'plan',
    phase: '01',
    name: 'PLAN & ARCHITECTURE',
    description: 'System requirement analysis, UML/C4 modeling, distributed architectural specs & agile sprint governance.',
    status: 'SPECIFIED',
    tools: ['Figma', 'Jira', 'C4 Models', 'System Architecture Specs'],
    metrics: '100% Requirements Tracked',
    color: 'text-sky-600',
    colorHex: 0x0284c7,
    iconName: 'Layers'
  },
  {
    id: 'code',
    phase: '02',
    name: 'CODE & COLLABORATION',
    description: 'TypeScript, React 19, C++, Python, modular clean architecture, Git feature branching & peer reviews.',
    status: 'ACTIVE COMMIT',
    tools: ['TypeScript', 'React', 'C++', 'Git / GitHub', 'VS Code'],
    metrics: 'Clean Code Standards',
    color: 'text-indigo-600',
    colorHex: 0x4f46e5,
    iconName: 'Code'
  },
  {
    id: 'build',
    phase: '03',
    name: 'BUILD & CONTAINERIZE',
    description: 'Vite/esbuild bundling, Docker multi-stage containerization, tree-shaking & dependency vulnerability audit.',
    status: 'PASSING',
    tools: ['Docker', 'Vite', 'esbuild', 'Node.js', 'npm'],
    metrics: 'Bundle Size < 140kB',
    color: 'text-amber-600',
    colorHex: 0xd97706,
    iconName: 'Boxes'
  },
  {
    id: 'test',
    phase: '04',
    name: 'TEST & QUALITY ASSURANCE',
    description: 'Automated Vitest/Jest unit suites, integration tests, static typing verification & zero regression.',
    status: 'GREEN ✓',
    tools: ['Vitest', 'Jest', 'ESLint', 'TypeCheck', 'Security Scans'],
    metrics: '98.4% Code Coverage',
    color: 'text-emerald-600',
    colorHex: 0x059669,
    iconName: 'ShieldCheck'
  },
  {
    id: 'deploy',
    phase: '05',
    name: 'DEPLOY & CLUSTER',
    description: 'Automated CI/CD pipelines, Google Cloud Run, Kubernetes pods, zero-downtime rolling deployments.',
    status: 'ONLINE',
    tools: ['Cloud Run', 'Kubernetes', 'CI/CD Actions', 'Nginx', 'GCP'],
    metrics: 'Zero Downtime Rollout',
    color: 'text-cyan-600',
    colorHex: 0x0891b2,
    iconName: 'Cloud'
  },
  {
    id: 'monitor',
    phase: '06',
    name: 'MONITOR & OBSERVABILITY',
    description: 'Real-time telemetry, APM log analytics, IT governance controls, response latency monitoring & audit trails.',
    status: 'OPTIMAL',
    tools: ['Datadog', 'Prometheus', 'Cloud Logging', 'Audit Trails'],
    metrics: 'Latency < 16ms | 99.99% Uptime',
    color: 'text-purple-600',
    colorHex: 0x9333ea,
    iconName: 'Activity'
  }
];

export const SOFTWARE_ENGINEERING_THEMES: Record<CosmicTheme, {
  name: string;
  tagline: string;
  bgHex: number;
  fogHex: number;
  gridA: number;
  gridB: number;
  codeStreamColor: string;
  codeGlow: string;
  pipelineColor: number;
  accent1: number;
  accent2: number;
  cardBg: string;
  uiBorder: string;
  uiBadge: string;
}> = {
  cyan: {
    name: 'VS Code Java & C++ (Deep Obsidian & Cyan)',
    tagline: 'Modern Java 21 Spring & C++20 Concurrency on Deep Obsidian',
    bgHex: 0x070c18,
    fogHex: 0x070c18,
    gridA: 0x0e3a5f,
    gridB: 0x081f33,
    codeStreamColor: '#38bdf8',
    codeGlow: '#0284c7',
    pipelineColor: 0x0284c7,
    accent1: 0x38bdf8,
    accent2: 0x6366f1,
    cardBg: 'bg-[#0d1527]/95',
    uiBorder: 'border-cyan-500/40',
    uiBadge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
  },
  aurora: {
    name: 'Matrix C++ & Java (Cyber Emerald Terminal)',
    tagline: 'High-speed C++ pipelines & passing Java JUnit/Vitest suites',
    bgHex: 0x05120d,
    fogHex: 0x05120d,
    gridA: 0x064e3b,
    gridB: 0x022c22,
    codeStreamColor: '#10b981',
    codeGlow: '#059669',
    pipelineColor: 0x059669,
    accent1: 0x10b981,
    accent2: 0x34d399,
    cardBg: 'bg-[#081814]/95',
    uiBorder: 'border-emerald-500/40',
    uiBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
  },
  solar: {
    name: 'Compiler Amber (C++ & Java Syntax)',
    tagline: 'Axcelasia IT advisory, security audit & distributed systems',
    bgHex: 0x110c08,
    fogHex: 0x110c08,
    gridA: 0x5c2b09,
    gridB: 0x2e1403,
    codeStreamColor: '#f59e0b',
    codeGlow: '#d97706',
    pipelineColor: 0xd97706,
    accent1: 0xf59e0b,
    accent2: 0xfb923c,
    cardBg: 'bg-[#15110d]/95',
    uiBorder: 'border-amber-500/40',
    uiBadge: 'bg-amber-950/80 text-amber-300 border-amber-800'
  },
  amethyst: {
    name: 'Tokyo Night (Java & C++ Microservices)',
    tagline: 'Distributed Java Kafka streams & C++ network topology',
    bgHex: 0x0e0a1a,
    fogHex: 0x0e0a1a,
    gridA: 0x4c1d95,
    gridB: 0x240e4f,
    codeStreamColor: '#c084fc',
    codeGlow: '#9333ea',
    pipelineColor: 0x7c3aed,
    accent1: 0xa855f7,
    accent2: 0x38bdf8,
    cardBg: 'bg-[#130e26]/95',
    uiBorder: 'border-purple-500/40',
    uiBadge: 'bg-purple-950/80 text-purple-300 border-purple-800'
  }
};

// Helper: Create authentic multi-line syntax-highlighted IDE window textures
function createIDEWindowTexture(
  filename: string,
  lines: Array<{ num: string; tokens: Array<{ text: string; color: string }> }>,
  borderColor: string,
  accentColor: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Dark IDE background with rounded corners
    ctx.fillStyle = 'rgba(8, 14, 28, 0.96)';
    ctx.beginPath();
    ctx.roundRect(4, 4, 632, 352, 16);
    ctx.fill();

    // 2. High-contrast glowing border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 3. Header bar
    ctx.fillStyle = 'rgba(13, 22, 42, 0.98)';
    ctx.beginPath();
    ctx.roundRect(4, 4, 632, 46, [16, 16, 0, 0]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4, 50);
    ctx.lineTo(636, 50);
    ctx.stroke();

    // Window traffic light controls
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(24, 27, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(42, 27, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(60, 27, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Filename active editor tab
    ctx.fillStyle = 'rgba(23, 37, 84, 0.7)';
    ctx.beginPath();
    ctx.roundRect(84, 12, 210, 28, 6);
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(filename, 100, 30);

    // Code lines with syntax highlighting
    ctx.font = '14px "JetBrains Mono", monospace';
    let yPos = 84;
    lines.forEach(line => {
      // Line number
      ctx.fillStyle = '#475569';
      ctx.fillText(line.num.padStart(2, '0'), 24, yPos);

      // Syntax tokens
      let xPos = 60;
      line.tokens.forEach(tok => {
        ctx.fillStyle = tok.color;
        ctx.fillText(tok.text, xPos, yPos);
        xPos += ctx.measureText(tok.text).width;
      });
      yPos += 26;
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Create vertical streaming matrix code column texture
function createMatrixStreamTexture(tokens: string[], colorHex: string, glowColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 160, 640);
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    tokens.forEach((tok, idx) => {
      const y = 32 + idx * 26;
      const isLead = idx === tokens.length - 1 || idx === tokens.length - 2;
      ctx.fillStyle = isLead ? '#ffffff' : colorHex;
      ctx.shadowColor = isLead ? '#ffffff' : glowColor;
      ctx.shadowBlur = isLead ? 12 : 5;
      ctx.fillText(tok, 80, y);
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Create floating syntax token billboard
function createSyntaxTokenTexture(symbol: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 90;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(10, 17, 34, 0.88)';
    ctx.beginPath();
    ctx.roundRect(4, 4, 152, 82, 12);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillText(symbol, 80, 45);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Create high-res canvas texture for SDLC stage label billboard
function createStageCanvasTexture(text: string, subtext: string, color: string, bgColor = 'rgba(10, 16, 32, 0.95)'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(6, 6, 500, 148, 16);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Terminal dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(28, 30, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(44, 30, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(60, 30, 5, 0, Math.PI * 2);
    ctx.fill();

    // Title / Code
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(text, 26, 74);

    // Subtext
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(subtext, 26, 116);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const UniverseCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    cosmicTheme,
    setCosmicTheme,
    activePage,
    is3DInteractiveOverlay,
    setIs3DInteractiveOverlay
  } = usePortfolio();

  const [selectedStage, setSelectedStage] = useState<SDLCStageInfo | null>(SDLC_STAGES[0]);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Elevated camera target: eye level at y=6.0 (prevents scene from looking pushed down)
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 6.0, 0));
  const currentCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 11, 40));
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 11, 40));

  // Dynamic light & material references
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const pipelineTorusMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const matrixStreamsGroupRef = useRef<THREE.Group | null>(null);
  const ideSpritesRef = useRef<THREE.SpriteMaterial[]>([]);
  const matrixStreamMaterialsRef = useRef<THREE.SpriteMaterial[]>([]);
  const syntaxSpriteMaterialsRef = useRef<THREE.SpriteMaterial[]>([]);

  // Mouse interaction
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    prevMouseX: 0,
    prevMouseY: 0
  });

  // Stage focus camera animator
  const focusOnStage = (stage: SDLCStageInfo, index: number) => {
    setSelectedStage(stage);
    const angle = (index / SDLC_STAGES.length) * Math.PI * 2;
    const stageRadius = 24;
    const stageX = Math.cos(angle) * stageRadius;
    const stageZ = Math.sin(angle) * stageRadius;

    cameraTargetRef.current.set(stageX, 6.0, stageZ);
    targetCameraPosRef.current.set(stageX * 1.35, 11, stageZ * 1.35 + 14);
  };

  const resetCamera = () => {
    setSelectedStage(null);
    cameraTargetRef.current.set(0, 6.0, 0);
    targetCameraPosRef.current.set(0, 11, 40);
  };

  // Adjust camera target on page tab change - Elevated to eye level
  useEffect(() => {
    if (activePage === 'universe') {
      targetCameraPosRef.current.set(0, 11, 40);
      cameraTargetRef.current.set(0, 6.0, 0);
    } else if (activePage === 'projects') {
      targetCameraPosRef.current.set(12, 12, 36);
      cameraTargetRef.current.set(6, 6.0, 0);
    } else if (activePage === 'sdlc') {
      targetCameraPosRef.current.set(0, 16, 36);
      cameraTargetRef.current.set(0, 6.5, 0);
    } else if (activePage === 'journey') {
      targetCameraPosRef.current.set(-12, 12, 36);
      cameraTargetRef.current.set(-6, 6.0, 0);
    } else {
      targetCameraPosRef.current.set(0, 11, 40);
      cameraTargetRef.current.set(0, 6.0, 0);
    }
  }, [activePage]);

  // Handle theme changes
  useEffect(() => {
    const theme = SOFTWARE_ENGINEERING_THEMES[cosmicTheme] || SOFTWARE_ENGINEERING_THEMES.cyan;
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(theme.bgHex);
      if (sceneRef.current.fog) {
        (sceneRef.current.fog as THREE.FogExp2).color.setHex(theme.fogHex);
      }
    }
    if (pipelineTorusMatRef.current) {
      pipelineTorusMatRef.current.color.setHex(theme.pipelineColor);
      pipelineTorusMatRef.current.emissive.setHex(theme.pipelineColor);
    }
    if (gridHelperRef.current) {
      sceneRef.current?.remove(gridHelperRef.current);
      const newGrid = new THREE.GridHelper(160, 80, theme.gridA, theme.gridB);
      newGrid.position.y = -4.5;
      gridHelperRef.current = newGrid;
      sceneRef.current?.add(newGrid);
    }
  }, [cosmicTheme]);

  // Adjust background code opacities so they are softly faded in reading mode, and vivid in 3D Cockpit mode
  useEffect(() => {
    const streamOp = is3DInteractiveOverlay ? 0.65 : 0.20;
    const ideOp = is3DInteractiveOverlay ? 0.88 : 0.28;
    const synOp = is3DInteractiveOverlay ? 0.75 : 0.20;

    matrixStreamMaterialsRef.current.forEach(mat => {
      mat.opacity = streamOp;
    });
    ideSpritesRef.current.forEach(mat => {
      mat.opacity = ideOp;
    });
    syntaxSpriteMaterialsRef.current.forEach(mat => {
      mat.opacity = synOp;
    });
  }, [is3DInteractiveOverlay]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Verify WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const curTheme = SOFTWARE_ENGINEERING_THEMES[cosmicTheme] || SOFTWARE_ENGINEERING_THEMES.cyan;

    // 1. Scene & Rich Software Engineering Atmosphere (Clear depth, light fog so code is crystal clear)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(curTheme.bgHex);
    // Subtle fog to prevent murky washing out
    scene.fog = new THREE.FogExp2(curTheme.fogHex, 0.0016);

    // 2. Camera - Positioned to look forward at eye-level
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.copy(currentCameraPosRef.current);
    camera.lookAt(cameraTargetRef.current);
    cameraRef.current = camera;

    // 3. Renderer with high dynamic range & crisp contrast
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Vibrant Cyber Software Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(curTheme.accent1, 2.0);
    dirLight1.position.set(25, 45, 25);
    dirLightRef.current = dirLight1;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(curTheme.accent2, 1.6);
    dirLight2.position.set(-25, 30, -25);
    scene.add(dirLight2);

    const underGlowLight = new THREE.PointLight(curTheme.pipelineColor, 3.0, 80);
    underGlowLight.position.set(0, 0, 0);
    scene.add(underGlowLight);

    // 5. Software Engineering Blueprint Ground Grid (Elevated to y = -4.5)
    const gridHelper = new THREE.GridHelper(160, 80, curTheme.gridA, curTheme.gridB);
    gridHelper.position.y = -4.5;
    gridHelperRef.current = gridHelper;
    scene.add(gridHelper);

    // 6. CASCADING 3D MATRIX CODE STREAMS (Java & C++ Production Code Background)
    const matrixGroup = new THREE.Group();
    matrixStreamsGroupRef.current = matrixGroup;
    scene.add(matrixGroup);

    // Authentic Java & C++ statements and syntax tokens
    const codeTokensBatches = [
      // Stream 1: Java 21 Spring & Concurrency
      ['public class Service {', 'String[] args', 'System.out.println("200 OK");', 'List<Node> nodes = new ArrayList<>();', 'CompletableFuture.supplyAsync()', '@Override public void run()', '@RestController', 'synchronized(lock)', 'Optional<T>', 'try { exec(); } catch(e)'],
      // Stream 2: C++20 High-Performance Systems & Smart Pointers
      ['#include <iostream>', '#include <vector>', '#include <memory>', 'std::cout << "Engine Ready\\n";', 'std::unique_ptr<Pipeline> p;', 'template <typename T>', 'constexpr auto SLA = 16ms;', 'const auto& [id, node] : map', 'std::make_shared<Ctx>()', 'std::thread worker(process);'],
      // Stream 3: Java Enterprise Streams & Axcelasia IT Audit
      ['Stream<DataPacket> stream;', 'HttpStatus.ACCEPTED', 'package com.enterprise;', 'new ConcurrentHashMap<>()', 'implements Serializable', 'public static void main', 'return ResponseEntity.ok();', 'Collections.unmodifiableList()', 'Logger.getLogger("App")'],
      // Stream 4: C++ Concurrency & Vector Optimization
      ['std::vector<uint8_t> buffer;', 'std::lock_guard<std::mutex> lk;', 'virtual ~ServiceNode() = default;', 'noexcept', 'static_cast<double>(latency);', 'std::chrono::milliseconds(16)', 'int main(int argc, char* argv[])', 'auto start = clock::now();']
    ];

    const streamMeshes: Array<{ mesh: THREE.Sprite; speed: number; startY: number; resetY: number }> = [];
    const streamCount = 42;
    matrixStreamMaterialsRef.current = [];

    // Faded opacity for background code streams to prevent interfering with foreground text
    const baseStreamOpacity = is3DInteractiveOverlay ? 0.65 : 0.18;

    for (let i = 0; i < streamCount; i++) {
      const tokens = codeTokensBatches[i % codeTokensBatches.length];
      const tex = createMatrixStreamTexture(tokens, curTheme.codeStreamColor, curTheme.codeGlow);
      const mat = new THREE.SpriteMaterial({ 
        map: tex, 
        transparent: true, 
        opacity: baseStreamOpacity + Math.random() * 0.08 
      });
      matrixStreamMaterialsRef.current.push(mat);
      const sprite = new THREE.Sprite(mat);

      // Distribute in cylindrical matrix space around user view
      const angle = (i / streamCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = 24 + Math.random() * 32;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() * 50) - 10;

      sprite.position.set(x, y, z);
      sprite.scale.set(4.5, 18, 1);
      matrixGroup.add(sprite);

      streamMeshes.push({
        mesh: sprite,
        speed: 3.5 + Math.random() * 5.0,
        startY: 38,
        resetY: -16
      });
    }

    // 7. FLOATING REALISTIC MULTI-LINE 3D IDE CODE WINDOWS (Java & C++ Architecture)
    const ideWindowsGroup = new THREE.Group();
    scene.add(ideWindowsGroup);
    ideSpritesRef.current = [];

    const ideWindowDefs = [
      {
        filename: 'HighSpeedPipeline.cpp',
        lines: [
          { num: '01', tokens: [{ text: '#include ', color: '#f59e0b' }, { text: '<iostream>', color: '#34d399' }, { text: ', <vector>', color: '#34d399' }, { text: ', <memory>', color: '#34d399' }] },
          { num: '02', tokens: [{ text: 'namespace ', color: '#38bdf8' }, { text: 'Engine::Production ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '  std::unique_ptr<WorkerPool> ', color: '#38bdf8' }, { text: 'pool;', color: '#f8fafc' }] },
          { num: '04', tokens: [{ text: '  void ', color: '#c084fc' }, { text: 'deployZeroDowntime', color: '#fbbf24' }, { text: '() noexcept {', color: '#94a3b8' }] },
          { num: '05', tokens: [{ text: '    std::cout << "[C++20] Rolling update OK\\n";', color: '#10b981' }] },
          { num: '06', tokens: [{ text: '    assert(telemetry.getP99Latency() < 16.0);', color: '#38bdf8' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '}', color: '#94a3b8' }] }
        ]
      },
      {
        filename: 'EnterpriseCluster.java',
        lines: [
          { num: '01', tokens: [{ text: 'package ', color: '#f59e0b' }, { text: 'com.architecture.cloud;', color: '#94a3b8' }] },
          { num: '02', tokens: [{ text: 'import ', color: '#38bdf8' }, { text: 'java.util.concurrent.CompletableFuture;', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '@RestController', color: '#fbbf24' }] },
          { num: '04', tokens: [{ text: 'public class ', color: '#38bdf8' }, { text: 'ClusterManager ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '05', tokens: [{ text: '  public CompletableFuture<Status> ', color: '#38bdf8' }, { text: 'deploy() {', color: '#94a3b8' }] },
          { num: '06', tokens: [{ text: '    return CompletableFuture.supplyAsync(k8s::apply);', color: '#34d399' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '}', color: '#94a3b8' }] }
        ]
      },
      {
        filename: 'SecurityGovernanceService.java',
        lines: [
          { num: '01', tokens: [{ text: '// Axcelasia Tech Advisory & IT Audit', color: '#64748b' }] },
          { num: '02', tokens: [{ text: 'public class ', color: '#38bdf8' }, { text: 'SecurityGovernanceService ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '  @Override', color: '#fbbf24' }] },
          { num: '04', tokens: [{ text: '  public AuditReport ', color: '#38bdf8' }, { text: 'verifyZeroTrustMatrix() {', color: '#94a3b8' }] },
          { num: '05', tokens: [{ text: '    PolicyEngine policy = RBACValidator.enforce();', color: '#34d399' }] },
          { num: '06', tokens: [{ text: '    return new AuditReport(SOC2.CERTIFIED);', color: '#10b981' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '}', color: '#94a3b8' }] }
        ]
      },
      {
        filename: 'SpatialPipeline.cpp',
        lines: [
          { num: '01', tokens: [{ text: '#include ', color: '#f59e0b' }, { text: '<thread>', color: '#34d399' }, { text: ', <mutex>', color: '#34d399' }, { text: ', <vector>', color: '#34d399' }] },
          { num: '02', tokens: [{ text: 'class ', color: '#38bdf8' }, { text: 'SpatialEngine ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '  std::mutex mtx;', color: '#f8fafc' }] },
          { num: '04', tokens: [{ text: '  std::vector<MatrixNode> nodes;', color: '#38bdf8' }] },
          { num: '05', tokens: [{ text: '  void render(double dt) {', color: '#fbbf24' }] },
          { num: '06', tokens: [{ text: '    std::lock_guard<std::mutex> lk(mtx);', color: '#34d399' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '};', color: '#94a3b8' }] }
        ]
      },
      {
        filename: 'EventStreamRouter.java',
        lines: [
          { num: '01', tokens: [{ text: 'package ', color: '#f59e0b' }, { text: 'com.microservices.streaming;', color: '#94a3b8' }] },
          { num: '02', tokens: [{ text: 'public class ', color: '#38bdf8' }, { text: 'KafkaEventRouter ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '  public void dispatch(Stream<DataPacket> stream) {', color: '#38bdf8' }] },
          { num: '04', tokens: [{ text: '    stream.filter(DataPacket::isValid)', color: '#34d399' }] },
          { num: '05', tokens: [{ text: '          .forEach(channel::send);', color: '#34d399' }] },
          { num: '06', tokens: [{ text: '    System.out.println("[Status: 200 OK]");', color: '#10b981' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '}', color: '#94a3b8' }] }
        ]
      },
      {
        filename: 'DistributedMesh.cpp',
        lines: [
          { num: '01', tokens: [{ text: 'template <typename T>', color: '#38bdf8' }] },
          { num: '02', tokens: [{ text: 'class ', color: '#38bdf8' }, { text: 'DistributedClusterNode ', color: '#f8fafc' }, { text: '{', color: '#94a3b8' }] },
          { num: '03', tokens: [{ text: '  T payload;', color: '#f8fafc' }] },
          { num: '04', tokens: [{ text: 'public:', color: '#c084fc' }] },
          { num: '05', tokens: [{ text: '  void broadcastPacket() noexcept {', color: '#fbbf24' }] },
          { num: '06', tokens: [{ text: '    std::cout << "[Pod Active] P99 Latency: 14.2ms\\n";', color: '#10b981' }] },
          { num: '07', tokens: [{ text: '  }', color: '#94a3b8' }] },
          { num: '08', tokens: [{ text: '};', color: '#94a3b8' }] }
        ]
      }
    ];

    const baseIdeOpacity = is3DInteractiveOverlay ? 0.88 : 0.28;

    ideWindowDefs.forEach((winDef, wIdx) => {
      const tex = createIDEWindowTexture(
        winDef.filename,
        winDef.lines,
        curTheme.codeStreamColor,
        curTheme.codeStreamColor
      );
      const spriteMat = new THREE.SpriteMaterial({ 
        map: tex, 
        transparent: true, 
        opacity: baseIdeOpacity 
      });
      ideSpritesRef.current.push(spriteMat);
      const sprite = new THREE.Sprite(spriteMat);

      // Distribute radially at eye level
      const angle = (wIdx / ideWindowDefs.length) * Math.PI * 2;
      const radius = 34 + (wIdx % 2) * 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 6.5 + (wIdx % 3) * 4.5;

      sprite.position.set(x, y, z);
      sprite.scale.set(12, 6.75, 1);
      ideWindowsGroup.add(sprite);
    });

    // 8. FLOATING 3D SYNTAX TOKENS (Java & C++ Syntax: std::vector, public class, std::cout, etc.)
    const syntaxTokensGroup = new THREE.Group();
    scene.add(syntaxTokensGroup);
    syntaxSpriteMaterialsRef.current = [];

    const syntaxGlyphs = [
      'public class', 
      'std::vector', 
      'std::cout', 
      'System.out', 
      'nullptr', 
      'constexpr', 
      'template<T>', 
      'new ArrayList<>()', 
      'const auto&', 
      'std::unique_ptr', 
      '@Override', 
      'synchronized'
    ];
    const syntaxMeshes: THREE.Sprite[] = [];
    const baseSyntaxOpacity = is3DInteractiveOverlay ? 0.75 : 0.20;

    syntaxGlyphs.forEach((sym, gIdx) => {
      const tex = createSyntaxTokenTexture(sym, curTheme.codeStreamColor);
      const spriteMat = new THREE.SpriteMaterial({ 
        map: tex, 
        transparent: true, 
        opacity: baseSyntaxOpacity 
      });
      syntaxSpriteMaterialsRef.current.push(spriteMat);
      const sprite = new THREE.Sprite(spriteMat);

      const angle = (gIdx / syntaxGlyphs.length) * Math.PI * 2 + 0.4;
      const radius = 26 + (gIdx % 3) * 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 2.0 + (gIdx % 4) * 3.5;

      sprite.position.set(x, y, z);
      sprite.scale.set(3.8, 2.1, 1);
      syntaxTokensGroup.add(sprite);
      syntaxMeshes.push(sprite);
    });

    // 9. SDLC CONTINUOUS LIFECYCLE RING (Elevated to y = 6.0)
    const pipelineRadius = 24;
    const pipelineGroup = new THREE.Group();
    pipelineGroup.position.y = 6.0;
    scene.add(pipelineGroup);

    // Continuous circular pipeline track
    const trackGeo = new THREE.TorusGeometry(pipelineRadius, 0.32, 16, 120);
    const trackMat = new THREE.MeshStandardMaterial({
      color: curTheme.pipelineColor,
      roughness: 0.2,
      metalness: 0.8,
      emissive: curTheme.pipelineColor,
      emissiveIntensity: 0.35
    });
    pipelineTorusMatRef.current = trackMat;
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.rotation.x = Math.PI / 2;
    pipelineGroup.add(trackMesh);

    // Outer subtle guide ring with glowing accent
    const guideRingGeo = new THREE.TorusGeometry(pipelineRadius + 2.2, 0.06, 8, 100);
    const guideRingMat = new THREE.MeshBasicMaterial({ color: curTheme.accent1, transparent: true, opacity: 0.45 });
    const guideRing = new THREE.Mesh(guideRingGeo, guideRingMat);
    guideRing.rotation.x = Math.PI / 2;
    pipelineGroup.add(guideRing);

    // 10. SDLC STAGE STATIONS (6 Elevated Stages: Plan, Code, Build, Test, Deploy, Monitor)
    const stationMeshes: THREE.Group[] = [];

    SDLC_STAGES.forEach((stage, idx) => {
      const angle = (idx / SDLC_STAGES.length) * Math.PI * 2;
      const x = Math.cos(angle) * pipelineRadius;
      const z = Math.sin(angle) * pipelineRadius;

      const stationGroup = new THREE.Group();
      stationGroup.position.set(x, 0, z);

      // Pedestal in titanium slate
      const baseGeo = new THREE.CylinderGeometry(2.4, 2.8, 0.7, 24);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.9
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      stationGroup.add(baseMesh);

      // Glowing Station Indicator Ring
      const ringGeo = new THREE.TorusGeometry(2.3, 0.16, 12, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: stage.colorHex });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.45;
      stationGroup.add(ringMesh);

      // Core Geometric Node
      let coreGeo: THREE.BufferGeometry;
      if (idx === 0) coreGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      else if (idx === 1) coreGeo = new THREE.OctahedronGeometry(1.4);
      else if (idx === 2) coreGeo = new THREE.DodecahedronGeometry(1.3);
      else if (idx === 3) coreGeo = new THREE.IcosahedronGeometry(1.3);
      else if (idx === 4) coreGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.5, 16);
      else coreGeo = new THREE.TorusGeometry(1.2, 0.38, 12, 24);

      const coreMat = new THREE.MeshStandardMaterial({
        color: stage.colorHex,
        roughness: 0.15,
        metalness: 0.65,
        emissive: stage.colorHex,
        emissiveIntensity: 0.65
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = 1.8;
      stationGroup.add(coreMesh);

      // Stage Billboard
      const labelTexture = createStageCanvasTexture(
        `${stage.phase}. ${stage.name}`,
        `Status: ${stage.status} • ${stage.tools[0]}`,
        stage.colorHex === 0x059669 ? '#10b981' : curTheme.codeStreamColor
      );
      const spriteMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.95 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(0, 4.6, 0);
      sprite.scale.set(7.5, 2.4, 1);
      stationGroup.add(sprite);

      pipelineGroup.add(stationGroup);
      stationMeshes.push(stationGroup);
    });

    // 11. DATA FLOW PACKETS IN PIPELINE
    const packetCount = 16;
    const packetGroup = new THREE.Group();
    pipelineGroup.add(packetGroup);

    const packetGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packetMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      packetGroup.add(pMesh);
      packetMeshes.push(pMesh);
    }

    // 12. Mouse & Touch Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 6;
        mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 4;
        return;
      }
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetCameraPosRef.current.x -= deltaX * 0.08;
      targetCameraPosRef.current.y = Math.max(3, Math.min(35, targetCameraPosRef.current.y + deltaY * 0.08));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      targetCameraPosRef.current.z = Math.max(20, Math.min(75, targetCameraPosRef.current.z + e.deltaY * 0.03));
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: true });

    // 13. HIGH-PRECISION ANIMATION LOOP (Replaces deprecated THREE.Clock with performance.now())
    let animationFrameId: number;
    const startTime = performance.now();
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;
      const deltaTime = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      // Smooth camera interpolation towards elevated target
      currentCameraPosRef.current.x += (targetCameraPosRef.current.x + mouseRef.current.targetX - currentCameraPosRef.current.x) * 0.05;
      currentCameraPosRef.current.y += (targetCameraPosRef.current.y + mouseRef.current.targetY - currentCameraPosRef.current.y) * 0.05;
      currentCameraPosRef.current.z += (targetCameraPosRef.current.z - currentCameraPosRef.current.z) * 0.05;

      camera.position.copy(currentCameraPosRef.current);
      camera.lookAt(cameraTargetRef.current);

      // Rotate continuous pipeline gracefully
      pipelineGroup.rotation.y = elapsedTime * 0.032;

      // Animate flowing data packets
      packetMeshes.forEach((mesh, pIdx) => {
        const pOffset = (pIdx / packetCount) * Math.PI * 2;
        const currentAngle = pOffset + elapsedTime * 0.38;
        mesh.position.x = Math.cos(currentAngle) * pipelineRadius;
        mesh.position.z = Math.sin(currentAngle) * pipelineRadius;
        mesh.position.y = Math.sin(elapsedTime * 2.5 + pIdx) * 0.35;
      });

      // Animate streaming 3D matrix code columns (falling continuously with wrap-around)
      streamMeshes.forEach(item => {
        item.mesh.position.y -= item.speed * deltaTime;
        if (item.mesh.position.y < item.resetY) {
          item.mesh.position.y = item.startY;
        }
      });

      // Floating IDE windows subtle bobbing
      ideWindowsGroup.children.forEach((child, cIdx) => {
        child.position.y += Math.sin(elapsedTime * 1.0 + cIdx * 0.8) * 0.006;
      });

      // Floating syntax tokens slow wobble
      syntaxMeshes.forEach((glyph, gIdx) => {
        glyph.position.y += Math.cos(elapsedTime * 1.2 + gIdx) * 0.005;
      });

      // Rotate station core crystal nodes
      stationMeshes.forEach((station, sIdx) => {
        const core = station.children[2];
        if (core) {
          core.rotation.y = elapsedTime * 0.7 + sIdx;
          core.rotation.x = Math.sin(elapsedTime * 0.4 + sIdx) * 0.18;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth || window.innerWidth;
      const newHeight = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  if (!webGlSupported) {
    return null;
  }

  const activeThemeObj = SOFTWARE_ENGINEERING_THEMES[cosmicTheme] || SOFTWARE_ENGINEERING_THEMES.cyan;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={containerRef} 
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Top Left: SDLC Architecture Status Indicator - ONLY in 3D Interactive Cockpit mode */}
      {is3DInteractiveOverlay && (
        <div className="absolute top-20 left-4 sm:left-8 z-30 pointer-events-auto max-w-sm animate-in fade-in slide-in-from-left-4">
          <div className="p-4 rounded-2xl bg-[#0d1527]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl text-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  SDLC 3D Cockpit
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700">
                CI/CD Green ✓
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-700/80">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Git Commit</span>
                <span className="font-bold text-cyan-300 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-cyan-400" />
                  main@d7f89c1
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Test Suite</span>
                <span className="font-bold text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  98.4% Pass
                </span>
              </div>
            </div>

            {/* Stage Pills Navigator */}
            <div className="pt-2 border-t border-slate-700/80">
              <div className="text-[10px] font-mono text-cyan-400 mb-1.5 uppercase tracking-wider font-bold">
                Select SDLC Node to Orbit
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {SDLC_STAGES.map((st, i) => (
                  <button
                    key={st.id}
                    onClick={() => focusOnStage(st, i)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold text-left transition-all cursor-pointer truncate ${
                      selectedStage?.id === st.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md ring-1 ring-cyan-300'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                    title={`${st.name}: ${st.description}`}
                  >
                    {st.phase}. {st.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Details Card */}
            {selectedStage && (
              <div className="p-3 rounded-xl bg-[#090f1d] border border-slate-700/90 space-y-1.5 text-xs animate-in fade-in">
                <div className="flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="text-cyan-300">{selectedStage.name}</span>
                  <span className="text-emerald-400 font-mono text-[10px]">✓ {selectedStage.status}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {selectedStage.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedStage.tools.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-cyan-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Right: Developer Code Theme & 3D Cockpit Toggle */}
      <div className="absolute top-20 right-4 sm:right-8 z-30 pointer-events-auto flex items-center gap-2">
        {/* Code Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-700/90 hover:border-cyan-500/50 hover:bg-[#111c34] text-slate-200 text-xs font-mono shadow-lg transition-all cursor-pointer"
            title="Switch 3D Code Theme"
          >
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-semibold">{activeThemeObj.name.split('(')[0].trim()}</span>
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-76 p-2.5 rounded-2xl bg-[#0b1222] backdrop-blur-2xl border border-slate-700 shadow-2xl space-y-1 text-xs font-mono z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-2 py-1 text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center justify-between">
                <span>3D Code Background Themes</span>
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              {(Object.keys(SOFTWARE_ENGINEERING_THEMES) as CosmicTheme[]).map(tKey => {
                const t = SOFTWARE_ENGINEERING_THEMES[tKey];
                const isSelected = cosmicTheme === tKey;
                return (
                  <button
                    key={tKey}
                    onClick={() => {
                      setCosmicTheme(tKey);
                      setShowThemePicker(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex flex-col gap-0.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/80 border border-cyan-500/60 text-cyan-200 font-bold'
                        : 'hover:bg-slate-800/70 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-white">{t.name}</span>
                      {isSelected && <span className="text-cyan-400">✓ Active</span>}
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      {t.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Camera Reset */}
        <button
          onClick={resetCamera}
          className="p-2 rounded-xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-700/90 hover:border-cyan-500/50 hover:bg-[#111c34] text-slate-300 hover:text-white shadow-lg transition-colors cursor-pointer"
          title="Reset 3D Camera to Eye-Level View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* 3D Focus / Cockpit Toggle */}
        <button
          onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all cursor-pointer shadow-lg text-xs font-mono font-bold ${
            is3DInteractiveOverlay
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/20'
              : 'bg-[#0d1527]/90 backdrop-blur-xl border-slate-700/90 hover:border-cyan-500/50 text-cyan-300 hover:text-white'
          }`}
          title={is3DInteractiveOverlay ? "Exit 3D Cockpit" : "Enter Fullscreen 3D Code Cockpit"}
        >
          {is3DInteractiveOverlay ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{is3DInteractiveOverlay ? "Dossier View" : "3D Cockpit"}</span>
        </button>
      </div>

      {/* Floating Canvas Guide Pill when maximized */}
      {is3DInteractiveOverlay && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto animate-in fade-in">
          <div className="px-5 py-2.5 rounded-full bg-[#0d1527]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl text-xs font-mono text-slate-200 flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">🖱️</span> Left Click + Drag to rotate 3D code space • Scroll to zoom • Click nodes to orbit
            </span>
            <button
              onClick={() => setIs3DInteractiveOverlay(false)}
              className="px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm transition-all"
            >
              Exit Cockpit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
