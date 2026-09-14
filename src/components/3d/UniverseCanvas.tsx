import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, CosmicTheme } from '../../types';
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
  ArrowRight,
  Boxes,
  ShieldCheck,
  Cloud,
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
    description: 'System requirement analysis, UML/C4 modeling, distributed architectural specs & agile sprints.',
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
    description: 'TypeScript, React 18, C++, Python, modular clean architecture, Git feature branching & peer reviews.',
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
    description: 'Vite/esbuild bundling, Docker multi-stage containerization, tree-shaking & dependency audit.',
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
    description: 'Automated Vitest/Jest unit suites, integration tests, static typing verification & vulnerability scanning.',
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
    description: 'Automated CI/CD pipelines, Google Cloud Run, Kubernetes pods, zero-downtime blue-green deployments.',
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
    description: 'Real-time telemetry, APM log analytics, IT governance controls, response time monitoring & audit trails.',
    status: 'OPTIMAL',
    tools: ['Datadog', 'Prometheus', 'Cloud Logging', 'Audit Trails'],
    metrics: 'Latency < 16ms | 99.99% Uptime',
    color: 'text-purple-600',
    colorHex: 0x9333ea,
    iconName: 'Activity'
  }
];

const LIGHT_SOFTWARE_THEMES: Record<CosmicTheme, {
  name: string;
  tagline: string;
  bgHex: number;
  fogHex: number;
  gridA: number;
  gridB: number;
  ambientLight: number;
  pipelineColor: number;
  accent1: number;
  accent2: number;
  cardBg: string;
  uiBorder: string;
  uiBadge: string;
}> = {
  cyan: {
    name: 'VS Modern Light (TypeScript)',
    tagline: 'Modern Light Developer Console & TypeScript Architecture',
    bgHex: 0xf8fafc,
    fogHex: 0xf8fafc,
    gridA: 0xcbd5e1,
    gridB: 0xe2e8f0,
    ambientLight: 0xffffff,
    pipelineColor: 0x0284c7,
    accent1: 0x0ea5e9,
    accent2: 0x4f46e5,
    cardBg: 'bg-white/90',
    uiBorder: 'border-slate-200',
    uiBadge: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  aurora: {
    name: 'CI/CD Pipeline Green',
    tagline: 'Automated Testing, Quality Assurance & 98.4% Green CI',
    bgHex: 0xf0fdf4,
    fogHex: 0xf0fdf4,
    gridA: 0xa7f3d0,
    gridB: 0xd1fae5,
    ambientLight: 0xffffff,
    pipelineColor: 0x059669,
    accent1: 0x10b981,
    accent2: 0x0d9488,
    cardBg: 'bg-white/90',
    uiBorder: 'border-emerald-200',
    uiBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  solar: {
    name: 'Architecture Blueprint',
    tagline: 'Axcelasia IT Advisory, Security Audit & Systems Design',
    bgHex: 0xfffbeb,
    fogHex: 0xfffbeb,
    gridA: 0xfde68a,
    gridB: 0xfef3c7,
    ambientLight: 0xffffff,
    pipelineColor: 0xd97706,
    accent1: 0xf59e0b,
    accent2: 0xe11d48,
    cardBg: 'bg-white/90',
    uiBorder: 'border-amber-200',
    uiBadge: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  amethyst: {
    name: 'Microservices & Mesh',
    tagline: 'Distributed Service Topology & Event-Driven Architecture',
    bgHex: 0xfaf5ff,
    fogHex: 0xfaf5ff,
    gridA: 0xddd6fe,
    gridB: 0xede9fe,
    ambientLight: 0xffffff,
    pipelineColor: 0x7c3aed,
    accent1: 0x9333ea,
    accent2: 0x2563eb,
    cardBg: 'bg-white/90',
    uiBorder: 'border-purple-200',
    uiBadge: 'bg-purple-50 text-purple-700 border-purple-200'
  }
};

// Helper: Create a high-res canvas texture for code snippets & labels
function createCodeCanvasTexture(text: string, subtext: string, color: string, bgColor = 'rgba(255,255,255,0.92)'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Rounded Card Background
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 144, 16);
    ctx.fill();

    // Border
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Small dot indicator
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(36, 46, 7, 0, Math.PI * 2);
    ctx.fill();

    // Title / Code
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(text, 56, 52);

    // Subtext
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(subtext, 32, 106);
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

  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 26, 52));
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 26, 52));

  // Dynamic light & material references
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const pipelineTorusMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

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

    cameraTargetRef.current.set(stageX, 2, stageZ);
    targetCameraPosRef.current.set(stageX * 1.5, 14, stageZ * 1.5 + 16);
  };

  const resetCamera = () => {
    setSelectedStage(null);
    cameraTargetRef.current.set(0, 0, 0);
    targetCameraPosRef.current.set(0, 26, 52);
  };

  // Adjust camera target on page tab change
  useEffect(() => {
    if (activePage === 'universe') {
      targetCameraPosRef.current.set(0, 26, 52);
      cameraTargetRef.current.set(0, 0, 0);
    } else if (activePage === 'projects') {
      targetCameraPosRef.current.set(16, 22, 42);
      cameraTargetRef.current.set(8, 0, 0);
    } else if (activePage === 'sdlc') {
      targetCameraPosRef.current.set(0, 36, 44);
      cameraTargetRef.current.set(0, 0, 0);
    } else if (activePage === 'journey') {
      targetCameraPosRef.current.set(-18, 20, 44);
      cameraTargetRef.current.set(-10, 0, 0);
    } else {
      targetCameraPosRef.current.set(0, 26, 54);
      cameraTargetRef.current.set(0, 0, 0);
    }
  }, [activePage]);

  // Handle theme changes
  useEffect(() => {
    const theme = LIGHT_SOFTWARE_THEMES[cosmicTheme] || LIGHT_SOFTWARE_THEMES.cyan;
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
  }, [cosmicTheme]);

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

    const curTheme = LIGHT_SOFTWARE_THEMES[cosmicTheme] || LIGHT_SOFTWARE_THEMES.cyan;

    // 1. Scene & Light Background (NOT BLACK!)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(curTheme.bgHex);
    scene.fog = new THREE.FogExp2(curTheme.fogHex, 0.0075);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.copy(currentCameraPosRef.current);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(20, 40, 20);
    dirLightRef.current = dirLight;
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    softFillLight.position.set(-20, 20, -20);
    scene.add(softFillLight);

    // 5. Software Engineering Blueprint Ground Grid
    const gridHelper = new THREE.GridHelper(140, 70, curTheme.gridA, curTheme.gridB);
    gridHelper.position.y = -10;
    gridHelperRef.current = gridHelper;
    scene.add(gridHelper);

    // 6. SDLC CONTINUOUS LIFECYCLE RING (The Core Software Engineering Pipeline)
    const pipelineRadius = 24;
    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    // Continuous circular pipeline track
    const trackGeo = new THREE.TorusGeometry(pipelineRadius, 0.22, 16, 120);
    const trackMat = new THREE.MeshStandardMaterial({
      color: curTheme.pipelineColor,
      roughness: 0.2,
      metalness: 0.6,
      emissive: curTheme.pipelineColor,
      emissiveIntensity: 0.25
    });
    pipelineTorusMatRef.current = trackMat;
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.rotation.x = Math.PI / 2;
    pipelineGroup.add(trackMesh);

    // Outer subtle guide ring
    const guideRingGeo = new THREE.TorusGeometry(pipelineRadius + 2, 0.04, 8, 100);
    const guideRingMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.4 });
    const guideRing = new THREE.Mesh(guideRingGeo, guideRingMat);
    guideRing.rotation.x = Math.PI / 2;
    pipelineGroup.add(guideRing);

    // 7. SDLC STAGE STATIONS (6 Stages: Plan, Code, Build, Test, Deploy, Monitor)
    const stationMeshes: THREE.Group[] = [];

    SDLC_STAGES.forEach((stage, idx) => {
      const angle = (idx / SDLC_STAGES.length) * Math.PI * 2;
      const x = Math.cos(angle) * pipelineRadius;
      const z = Math.sin(angle) * pipelineRadius;

      const stationGroup = new THREE.Group();
      stationGroup.position.set(x, 0, z);

      // Base Pedestal (Layered architectural cylinder)
      const baseGeo = new THREE.CylinderGeometry(2.4, 2.8, 0.6, 24);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.2
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      stationGroup.add(baseMesh);

      // Stage Indicator Ring
      const ringGeo = new THREE.TorusGeometry(2.3, 0.12, 12, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: stage.colorHex });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.35;
      stationGroup.add(ringMesh);

      // Stage Core Node (Geometrical icon representation)
      let coreGeo: THREE.BufferGeometry;
      if (idx === 0) coreGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4); // Plan (Cubic Blueprint)
      else if (idx === 1) coreGeo = new THREE.OctahedronGeometry(1.2); // Code (Algorithm Diamond)
      else if (idx === 2) coreGeo = new THREE.DodecahedronGeometry(1.1); // Build (Container Node)
      else if (idx === 3) coreGeo = new THREE.IcosahedronGeometry(1.1); // Test (Verification Crystal)
      else if (idx === 4) coreGeo = new THREE.CylinderGeometry(1.1, 1.1, 1.3, 16); // Deploy (Cloud Pod)
      else coreGeo = new THREE.TorusGeometry(1.0, 0.35, 12, 24); // Monitor (Telemetry Ring)

      const coreMat = new THREE.MeshStandardMaterial({
        color: stage.colorHex,
        roughness: 0.2,
        metalness: 0.5,
        emissive: stage.colorHex,
        emissiveIntensity: 0.2
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = 1.6;
      stationGroup.add(coreMesh);

      // Floating Stage Label Billboard
      const labelTexture = createCodeCanvasTexture(
        `${stage.phase}. ${stage.name}`,
        `Status: ${stage.status} • ${stage.tools[0]}`,
        stage.colorHex === 0x059669 ? '#059669' : '#0284c7'
      );
      const spriteMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(0, 4.2, 0);
      sprite.scale.set(7.5, 2.4, 1);
      stationGroup.add(sprite);

      pipelineGroup.add(stationGroup);
      stationMeshes.push(stationGroup);
    });

    // 8. DATA PACKETS FLOWING THROUGH SDLC PIPELINE
    const packetCount = 14;
    const packetGroup = new THREE.Group();
    scene.add(packetGroup);

    const packetGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
    const packetMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      packetGroup.add(pMesh);
      packetMeshes.push(pMesh);
    }

    // 9. ANIMATED FLOATING CODE PANELS & GIT TERMINALS
    const codeSnippets = [
      { code: 'git commit -m "feat: microservices mesh"', sub: 'main@d7f89c1 • Bilal Hassan Mussa' },
      { code: 'const pipeline = new SDLCContinuousPipeline()', sub: 'TypeScript • Automated CI/CD' },
      { code: 'docker build -t app:v2.4 --target=production', sub: 'Containerization • Multi-stage' },
      { code: 'assert.strictEqual(coverage, 98.4%) // Green', sub: 'Vitest Unit Suite • Passing ✓' },
      { code: 'kubectl apply -f k8s/cluster-ingress.yaml', sub: 'Cloud Deploy • Zero-Downtime' },
      { code: 'SELECT latency_ms FROM telemetry_logs LIMIT 1', sub: 'Prometheus APM • Latency < 16ms' },
      { code: 'interface ArchitectureGovAudit { ... }', sub: 'Axcelasia IT Advisory Standards' },
      { code: 'git push origin release/v2.4.0 --tags', sub: 'Semantic Versioning • Stable Tag' }
    ];

    const codePanelsGroup = new THREE.Group();
    scene.add(codePanelsGroup);

    codeSnippets.forEach((snip, sIdx) => {
      const texture = createCodeCanvasTexture(snip.code, snip.sub, '#0284c7');
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.85 });
      const sprite = new THREE.Sprite(spriteMat);

      // Distribute in 3D developer workspace space
      const sAngle = (sIdx / codeSnippets.length) * Math.PI * 2;
      const sRadius = 38 + (sIdx % 2) * 12;
      const sx = Math.cos(sAngle) * sRadius;
      const sz = Math.sin(sAngle) * sRadius;
      const sy = 4 + (sIdx % 4) * 3;

      sprite.position.set(sx, sy, sz);
      sprite.scale.set(9.5, 3.0, 1);
      codePanelsGroup.add(sprite);
    });

    // 10. GIT BRANCH & COMMIT TREE DAG (Subtle branches on the side)
    const gitDagGroup = new THREE.Group();
    gitDagGroup.position.set(-28, -6, -14);
    scene.add(gitDagGroup);

    const gitLineMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.5 });
    const gitPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(6, 2, 0),
      new THREE.Vector3(12, 2, 0),
      new THREE.Vector3(18, 0, 0),
      new THREE.Vector3(24, 0, 0)
    ];
    const gitGeo = new THREE.BufferGeometry().setFromPoints(gitPoints);
    const gitLine = new THREE.Line(gitGeo, gitLineMat);
    gitDagGroup.add(gitLine);

    // Git Commit Nodes
    const commitGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const commitMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    gitPoints.forEach(pt => {
      const commitNode = new THREE.Mesh(commitGeo, commitMat);
      commitNode.position.copy(pt);
      gitDagGroup.add(commitNode);
    });

    // 11. Mouse interaction handlers
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
      targetCameraPosRef.current.y = Math.max(8, Math.min(50, targetCameraPosRef.current.y + deltaY * 0.08));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      targetCameraPosRef.current.z = Math.max(25, Math.min(90, targetCameraPosRef.current.z + e.deltaY * 0.03));
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: true });

    // 12. Main Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera motion
      currentCameraPosRef.current.x += (targetCameraPosRef.current.x + mouseRef.current.targetX - currentCameraPosRef.current.x) * 0.05;
      currentCameraPosRef.current.y += (targetCameraPosRef.current.y + mouseRef.current.targetY - currentCameraPosRef.current.y) * 0.05;
      currentCameraPosRef.current.z += (targetCameraPosRef.current.z - currentCameraPosRef.current.z) * 0.05;

      camera.position.copy(currentCameraPosRef.current);
      camera.lookAt(cameraTargetRef.current);

      // Rotate pipeline slightly for continuous feeling of live execution
      pipelineGroup.rotation.y = elapsedTime * 0.035;

      // Animate data packets traversing the SDLC pipeline
      packetMeshes.forEach((mesh, pIdx) => {
        const pOffset = (pIdx / packetCount) * Math.PI * 2;
        const currentAngle = pOffset + elapsedTime * 0.35;
        mesh.position.x = Math.cos(currentAngle) * pipelineRadius;
        mesh.position.z = Math.sin(currentAngle) * pipelineRadius;
        mesh.position.y = 0.5 + Math.sin(elapsedTime * 2 + pIdx) * 0.3;
      });

      // Animate floating code panels gently
      codePanelsGroup.children.forEach((child, cIdx) => {
        child.position.y += Math.sin(elapsedTime * 1.2 + cIdx) * 0.005;
      });

      // Animate stage station core geometries
      stationMeshes.forEach((station, sIdx) => {
        const core = station.children[2]; // core mesh
        if (core) {
          core.rotation.y = elapsedTime * 0.8 + sIdx;
          core.rotation.x = Math.sin(elapsedTime * 0.5 + sIdx) * 0.2;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
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

  const activeThemeObj = LIGHT_SOFTWARE_THEMES[cosmicTheme] || LIGHT_SOFTWARE_THEMES.cyan;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={containerRef} 
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Top Left: SDLC Architecture Status Indicator */}
      <div className="absolute top-20 left-4 sm:left-8 z-20 pointer-events-auto max-w-sm">
        <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm text-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wide">
                SDLC Continuous Pipeline
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              CI/CD Green
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-100">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Commit Hash</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-sky-600" />
                main@d7f89c1
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Test Coverage</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                98.4% Passed
              </span>
            </div>
          </div>

          {/* Quick Stage Pills Navigator */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">
              Interactive SDLC Lifecycle
            </div>
            <div className="grid grid-cols-3 gap-1">
              {SDLC_STAGES.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => focusOnStage(st, i)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold text-left transition-all cursor-pointer truncate ${
                    selectedStage?.id === st.id
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
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
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs animate-in fade-in">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span>{selectedStage.name}</span>
                <span className="text-emerald-600 font-mono text-[10px]">✓ {selectedStage.status}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {selectedStage.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedStage.tools.map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Right: Developer Theme & Orbit HUD Controls */}
      <div className="absolute top-20 right-4 sm:right-8 z-20 pointer-events-auto flex items-center gap-2">
        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:bg-white text-slate-700 text-xs font-mono shadow-sm transition-all cursor-pointer"
            title="Switch Developer Theme"
          >
            <Palette className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">{activeThemeObj.name}</span>
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white backdrop-blur-2xl border border-slate-200 shadow-xl space-y-1 text-xs font-mono z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400">
                Select Light Developer Theme
              </div>
              {(Object.keys(LIGHT_SOFTWARE_THEMES) as CosmicTheme[]).map(tKey => {
                const t = LIGHT_SOFTWARE_THEMES[tKey];
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
                        ? 'bg-sky-50 border border-sky-200 text-sky-950 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{t.name}</span>
                      {isSelected && <span className="text-sky-600">✓ Active</span>}
                    </div>
                    <span className="text-[10px] text-slate-500 font-sans font-normal">
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
          className="p-2 rounded-xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-sm transition-colors cursor-pointer"
          title="Reset Architecture View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* 3D Focus Toggle */}
        <button
          onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
          className={`p-2 rounded-xl border transition-all cursor-pointer shadow-sm ${
            is3DInteractiveOverlay
              ? 'bg-sky-600 text-white border-sky-600 font-bold'
              : 'bg-white/90 backdrop-blur-xl border-slate-200/90 text-slate-600 hover:text-slate-900'
          }`}
          title={is3DInteractiveOverlay ? "Return to Content Mode" : "Maximize SDLC Architecture Canvas"}
        >
          {is3DInteractiveOverlay ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Canvas Guide Pill when maximized */}
      {is3DInteractiveOverlay && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto animate-in fade-in">
          <div className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-lg text-xs font-mono text-slate-700 flex items-center gap-3">
            <span>🖱️ Drag to rotate view • Scroll to zoom • Click stages to inspect</span>
            <button
              onClick={() => setIs3DInteractiveOverlay(false)}
              className="px-3 py-1 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
