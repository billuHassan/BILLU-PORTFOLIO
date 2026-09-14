import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, CosmicTheme } from '../../types';
import { Cpu, Terminal, Eye, Compass, RotateCcw, Palette, Maximize2, Minimize2, ArrowRight, Network, Globe } from 'lucide-react';

const SOFTWARE_THEMES: Record<CosmicTheme, {
  name: string;
  tagline: string;
  coreLight: number;
  coreEmissive: number;
  coreColor: number;
  busColor: number;
  accent1: number;
  accent2: number;
  ambientLight: number;
  gridColorA: number;
  gridColorB: number;
  fogColor: number;
  uiGlow: string;
  uiBorder: string;
}> = {
  cyan: {
    name: 'Cyan Celestial Star',
    tagline: 'Luminous Azure Core & Orbital Planets',
    coreLight: 0x38bdf8,
    coreEmissive: 0x0284c7,
    coreColor: 0x0369a1,
    busColor: 0x38bdf8,
    accent1: 0x67e8f9,
    accent2: 0x818cf8,
    ambientLight: 0x07111e,
    gridColorA: 0x0284c7,
    gridColorB: 0x0f172a,
    fogColor: 0x020617,
    uiGlow: 'rgba(56, 189, 248, 0.25)',
    uiBorder: 'border-cyan-500/40',
  },
  aurora: {
    name: 'Emerald Aurora Nexus',
    tagline: 'Jade Celestial Orb & Stellar Plasma',
    coreLight: 0x34d399,
    coreEmissive: 0x059669,
    coreColor: 0x047857,
    busColor: 0x10b981,
    accent1: 0x6ee7b7,
    accent2: 0x2dd4bf,
    ambientLight: 0x021611,
    gridColorA: 0x059669,
    gridColorB: 0x064e3b,
    fogColor: 0x020f09,
    uiGlow: 'rgba(52, 211, 153, 0.25)',
    uiBorder: 'border-emerald-500/40',
  },
  solar: {
    name: 'Amber Solar Flare',
    tagline: 'Golden Sun Core & Planetary Rings',
    coreLight: 0xfbbf24,
    coreEmissive: 0xd97706,
    coreColor: 0xb45309,
    busColor: 0xf59e0b,
    accent1: 0xfde047,
    accent2: 0xf97316,
    ambientLight: 0x1a0c02,
    gridColorA: 0xd97706,
    gridColorB: 0x78350f,
    fogColor: 0x0c0502,
    uiGlow: 'rgba(251, 191, 36, 0.25)',
    uiBorder: 'border-amber-500/40',
  },
  amethyst: {
    name: 'Violet Cosmic Galaxy',
    tagline: 'Deep Amethyst Starfield & Moons',
    coreLight: 0xc084fc,
    coreEmissive: 0x9333ea,
    coreColor: 0x7e22ce,
    busColor: 0xa855f7,
    accent1: 0xe879f9,
    accent2: 0x818cf8,
    ambientLight: 0x130424,
    gridColorA: 0x9333ea,
    gridColorB: 0x4c1d95,
    fogColor: 0x08020f,
    uiGlow: 'rgba(192, 132, 252, 0.25)',
    uiBorder: 'border-purple-500/40',
  },
};

export const UniverseCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    data,
    setSelectedProject,
    setViewMode,
    activePage,
    cosmicTheme,
    setCosmicTheme,
    is3DInteractiveOverlay,
    setIs3DInteractiveOverlay
  } = usePortfolio();

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const hoveredProjectRef = useRef<Project | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const projectsMapRef = useRef<Map<THREE.Object3D, Project>>(new Map());
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    prevMouseX: 0,
    prevMouseY: 0,
    hasMovedSignificantly: false,
    downX: 0,
    downY: 0
  });

  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 22, 60));
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 22, 60));

  // Dynamic light & material references for live theme tuning
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const accentLight1Ref = useRef<THREE.PointLight | null>(null);
  const accentLight2Ref = useRef<THREE.PointLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const chipCoreMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const busRingMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  // Smooth camera positions per section
  useEffect(() => {
    if (activePage === 'universe') {
      targetCameraPosRef.current.set(0, 22, 60);
      cameraTargetRef.current.set(0, 0, 0);
    } else if (activePage === 'projects') {
      targetCameraPosRef.current.set(15, 30, 48);
      cameraTargetRef.current.set(6, 0, 0);
    } else if (activePage === 'journey') {
      targetCameraPosRef.current.set(-20, 18, 48);
      cameraTargetRef.current.set(-14, 4, -4);
    } else if (activePage === 'all') {
      targetCameraPosRef.current.set(0, 24, 64);
      cameraTargetRef.current.set(0, 0, 0);
    }
  }, [activePage]);

  // Dynamic theme update
  useEffect(() => {
    const active = SOFTWARE_THEMES[cosmicTheme] || SOFTWARE_THEMES.cyan;

    if (coreLightRef.current) coreLightRef.current.color.setHex(active.coreLight);
    if (accentLight1Ref.current) accentLight1Ref.current.color.setHex(active.accent1);
    if (accentLight2Ref.current) accentLight2Ref.current.color.setHex(active.accent2);
    if (ambientLightRef.current) ambientLightRef.current.color.setHex(active.ambientLight);

    if (chipCoreMatRef.current) {
      chipCoreMatRef.current.color.setHex(active.coreColor);
      chipCoreMatRef.current.emissive.setHex(active.coreEmissive);
    }
    if (busRingMatRef.current) busRingMatRef.current.color.setHex(active.busColor);

    if (sceneRef.current && sceneRef.current.fog) {
      (sceneRef.current.fog as THREE.FogExp2).color.setHex(active.fogColor);
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

    // 1. Scene & Deep Dark Software Matrix Fog
    const curTheme = SOFTWARE_THEMES[cosmicTheme] || SOFTWARE_THEMES.cyan;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(curTheme.fogColor, 0.0095);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 22, 60);
    cameraRef.current = camera;

    // 3. Renderer with clean anti-aliasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(curTheme.ambientLight, 1.8);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(curTheme.coreLight, 4.5, 95);
    coreLight.position.set(0, 4, 0);
    coreLightRef.current = coreLight;
    scene.add(coreLight);

    const accentLight1 = new THREE.PointLight(curTheme.accent1, 2.8, 80);
    accentLight1.position.set(30, 20, 25);
    accentLight1Ref.current = accentLight1;
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(curTheme.accent2, 2.5, 80);
    accentLight2.position.set(-30, 15, -25);
    accentLight2Ref.current = accentLight2;
    scene.add(accentLight2);

    // 5. Celestial Spatial Coordinate Rings & Meridian Network (Replaces flat box grid)
    const celestialGround = new THREE.Group();
    celestialGround.position.y = -14;
    scene.add(celestialGround);

    const ringRadii = [22, 40, 60, 80];
    ringRadii.forEach(r => {
      const ringGeo = new THREE.TorusGeometry(r, 0.07, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: curTheme.gridColorA,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      celestialGround.add(ringMesh);
    });

    // Radial Meridian lines connecting spatial rings
    const meridianPoints: number[] = [];
    const meridianCount = 12;
    for (let m = 0; m < meridianCount; m++) {
      const ang = (m / meridianCount) * Math.PI * 2;
      const x1 = Math.cos(ang) * 12;
      const z1 = Math.sin(ang) * 12;
      const x2 = Math.cos(ang) * 82;
      const z2 = Math.sin(ang) * 82;
      meridianPoints.push(x1, 0, z1, x2, 0, z2);
    }
    const meridianGeo = new THREE.BufferGeometry();
    meridianGeo.setAttribute('position', new THREE.Float32BufferAttribute(meridianPoints, 3));
    const meridianMat = new THREE.LineBasicMaterial({
      color: curTheme.gridColorB,
      transparent: true,
      opacity: 0.3,
    });
    const meridianLines = new THREE.LineSegments(meridianGeo, meridianMat);
    celestialGround.add(meridianLines);

    // 6. Cyber Matrix Binary Dust (Subtle, non-distracting background particles)
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cAccent = new THREE.Color(curTheme.accent1);
    const cMuted = new THREE.Color(0x334155);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 180;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 70 + 5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 180;

      const mixed = Math.random() > 0.6 ? cAccent : cMuted;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const matrixDust = new THREE.Points(particleGeo, particleMat);
    scene.add(matrixDust);

    // 7. Central Real 3D Celestial Gyro-Sphere (No boxes!)
    const kernelGroup = new THREE.Group();
    scene.add(kernelGroup);

    // Radiant Central Star / Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(3.2, 48, 48);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: curTheme.coreColor,
      roughness: 0.15,
      metalness: 0.85,
      emissive: curTheme.coreEmissive,
      emissiveIntensity: 0.95,
    });
    chipCoreMatRef.current = coreSphereMat;
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    kernelGroup.add(coreSphere);

    // Translucent Atmosphere Energy Shell
    const auraGeo = new THREE.SphereGeometry(3.8, 32, 32);
    const auraMat = new THREE.MeshBasicMaterial({
      color: curTheme.coreLight,
      transparent: true,
      opacity: 0.22,
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    kernelGroup.add(auraMesh);

    // Crystalline Geodesic Icosahedron Cage
    const cageGeo = new THREE.IcosahedronGeometry(4.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: curTheme.accent1,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    kernelGroup.add(cageMesh);

    // Gyroscopic Ring 1 (X-Z Equatorial Plane)
    const ringGeo1 = new THREE.TorusGeometry(5.8, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: curTheme.busColor,
      transparent: true,
      opacity: 0.65,
    });
    busRingMatRef.current = ringMat1;
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    kernelGroup.add(ring1);

    // Gyroscopic Ring 2 (Inclined 45° Pitch)
    const ringGeo2 = new THREE.TorusGeometry(7.2, 0.08, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: curTheme.accent1,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    kernelGroup.add(ring2);

    // Gyroscopic Ring 3 (Inclined 65° Yaw)
    const ringGeo3 = new THREE.TorusGeometry(8.6, 0.08, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: curTheme.accent2,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 4;
    kernelGroup.add(ring3);

    // Small Plasma Quantum Beads on Ring 1
    const beadGeo = new THREE.SphereGeometry(0.28, 12, 12);
    const beadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const beadMesh1 = new THREE.Mesh(beadGeo, beadMat);
    const beadMesh2 = new THREE.Mesh(beadGeo, beadMat);
    ring1.add(beadMesh1);
    ring1.add(beadMesh2);
    beadMesh1.position.set(5.8, 0, 0);
    beadMesh2.position.set(-5.8, 0, 0);

    // 8. Distributed Celestial Planetary Nodes (Real 3D Spheres - Projects)
    const projectsMap = new Map<THREE.Object3D, Project>();
    projectsMapRef.current = projectsMap;

    const microserviceNodes: {
      group: THREE.Group;
      mesh: THREE.Mesh;
      ringMesh: THREE.Mesh;
      moonMesh: THREE.Mesh;
      conduitLine: THREE.Line;
      packet: THREE.Mesh;
      packetProgress: number;
      packetSpeed: number;
      basePos: THREE.Vector3;
      radius: number;
      angle: number;
      orbitSpeed: number;
      moonAngle: number;
    }[] = [];

    const activeProjects = data.projects.filter(p => p.published);
    activeProjects.forEach((proj, idx) => {
      const radius = 18 + idx * 7.5;
      const angle = (idx / activeProjects.length) * Math.PI * 2;
      const height = (idx % 2 === 0 ? 1 : -1) * (2.2 + (idx % 3) * 1.3);
      const basePos = new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius);

      // Celestial Node Group
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(basePos);
      scene.add(nodeGroup);

      // Real 3D Celestial Planetary Sphere (NO BOXES!)
      const colorHex = proj.color ? parseInt(proj.color.replace('#', '0x'), 16) : curTheme.coreLight;
      const planetGeo = new THREE.SphereGeometry(1.85, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.25,
        metalness: 0.75,
        emissive: colorHex,
        emissiveIntensity: 0.6,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      nodeGroup.add(planetMesh);

      // Planetary Orbital Ring
      const planetRingGeo = new THREE.RingGeometry(2.35, 2.9, 48);
      const planetRingMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const planetRingMesh = new THREE.Mesh(planetRingGeo, planetRingMat);
      planetRingMesh.rotation.x = Math.PI / 2.5;
      nodeGroup.add(planetRingMesh);

      // Soft Atmosphere Aura Sphere
      const planetAuraGeo = new THREE.SphereGeometry(2.25, 24, 24);
      const planetAuraMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.2,
      });
      const planetAuraMesh = new THREE.Mesh(planetAuraGeo, planetAuraMat);
      nodeGroup.add(planetAuraMesh);

      // Satellite Moonlet Orbiting around the Planet
      const moonGeo = new THREE.SphereGeometry(0.38, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: colorHex,
        emissiveIntensity: 0.8,
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(3.4, 0.4, 0);
      nodeGroup.add(moonMesh);

      // Map planetMesh and nodeGroup for raycasting and tap-to-open
      projectsMap.set(planetMesh, proj);
      projectsMap.set(planetRingMesh, proj);
      projectsMap.set(planetAuraMesh, proj);

      // Fiber Data Bus Conduit connecting Central Celestial Core to this Planetary Node
      const conduitPoints = [new THREE.Vector3(0, 0, 0), basePos];
      const conduitGeo = new THREE.BufferGeometry().setFromPoints(conduitPoints);
      const conduitMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.35,
      });
      const conduitLine = new THREE.Line(conduitGeo, conduitMat);
      scene.add(conduitLine);

      // Pulsing White-Hot Energy Packet travelling on the conduit
      const packetGeo = new THREE.SphereGeometry(0.38, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      scene.add(packetMesh);

      microserviceNodes.push({
        group: nodeGroup,
        mesh: planetMesh,
        ringMesh: planetRingMesh,
        moonMesh,
        conduitLine,
        packet: packetMesh,
        packetProgress: Math.random(),
        packetSpeed: 0.004 + (idx % 3) * 0.002,
        basePos,
        radius,
        angle,
        orbitSpeed: 0.0016 - idx * 0.0002,
        moonAngle: Math.random() * Math.PI * 2,
      });
    });

    // 9. Logic & Dependency Constellation (Skills Graph)
    const skillCluster = new THREE.Group();
    skillCluster.position.set(-25, 12, -18);
    scene.add(skillCluster);

    const featuredSkills = data.skills.filter(s => s.featured).slice(0, 10);
    const skillPoints: THREE.Vector3[] = [];

    featuredSkills.forEach((_, sIdx) => {
      const phi = Math.acos(-1 + (2 * sIdx) / featuredSkills.length);
      const theta = Math.sqrt(featuredSkills.length * Math.PI) * phi;
      const r = 8.5;
      const pos = new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      skillPoints.push(pos);

      const nodeGeo = new THREE.OctahedronGeometry(0.55, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: curTheme.accent1,
        emissive: curTheme.accent1,
        emissiveIntensity: 0.7,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      skillCluster.add(nodeMesh);
    });

    if (skillPoints.length > 1) {
      const linePositions: number[] = [];
      for (let i = 0; i < skillPoints.length; i++) {
        for (let j = i + 1; j < skillPoints.length; j++) {
          if (skillPoints[i].distanceTo(skillPoints[j]) < 9) {
            linePositions.push(skillPoints[i].x, skillPoints[i].y, skillPoints[i].z);
            linePositions.push(skillPoints[j].x, skillPoints[j].y, skillPoints[j].z);
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: curTheme.accent2, transparent: true, opacity: 0.35 });
      const networkLines = new THREE.LineSegments(lineGeo, lineMat);
      skillCluster.add(networkLines);
    }

    // 10. Pointer & Raycasting Events (Reliable Tap & Click for Desktop and Mobile Touch)
    const raycaster = new THREE.Raycaster();
    const mouseNormalized = new THREE.Vector2();

    const getRaycastHit = (clientX: number, clientY: number): Project | null => {
      if (!cameraRef.current) return null;
      const rect = container.getBoundingClientRect();
      mouseNormalized.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalized.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNormalized, cameraRef.current);

      const testableObjects = Array.from(projectsMap.keys());
      const intersects = raycaster.intersectObjects(testableObjects, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        return projectsMap.get(hit) || null;
      }
      return null;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormalized.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalized.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.prevMouseX;
        const deltaY = e.clientY - mouseRef.current.prevMouseY;
        if (Math.abs(e.clientX - mouseRef.current.downX) > 4 || Math.abs(e.clientY - mouseRef.current.downY) > 4) {
          mouseRef.current.hasMovedSignificantly = true;
        }
        mouseRef.current.targetX += deltaX * 0.005;
        mouseRef.current.targetY = Math.max(-0.6, Math.min(0.6, mouseRef.current.targetY - deltaY * 0.003));
      }

      mouseRef.current.prevMouseX = e.clientX;
      mouseRef.current.prevMouseY = e.clientY;

      // Hover test
      const hit = getRaycastHit(e.clientX, e.clientY);
      hoveredProjectRef.current = hit;
      setHoveredProject(hit);
    };

    const onPointerDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.downX = e.clientX;
      mouseRef.current.downY = e.clientY;
      mouseRef.current.prevMouseX = e.clientX;
      mouseRef.current.prevMouseY = e.clientY;
      mouseRef.current.hasMovedSignificantly = false;
    };

    const onPointerUp = (e: MouseEvent) => {
      mouseRef.current.isDown = false;
      // If user simply tapped/clicked without a big drag, inspect object or hovered explanation
      if (!mouseRef.current.hasMovedSignificantly) {
        const hit = getRaycastHit(e.clientX, e.clientY);
        const targetToOpen = hit || hoveredProjectRef.current;
        if (targetToOpen) {
          setSelectedProject(targetToOpen);
        }
      }
    };

    // Touch handlers for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        mouseRef.current.isDown = true;
        mouseRef.current.downX = t.clientX;
        mouseRef.current.downY = t.clientY;
        mouseRef.current.prevMouseX = t.clientX;
        mouseRef.current.prevMouseY = t.clientY;
        mouseRef.current.hasMovedSignificantly = false;

        const hit = getRaycastHit(t.clientX, t.clientY);
        if (hit) {
          hoveredProjectRef.current = hit;
          setHoveredProject(hit);
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && mouseRef.current.isDown) {
        const t = e.touches[0];
        const deltaX = t.clientX - mouseRef.current.prevMouseX;
        const deltaY = t.clientY - mouseRef.current.prevMouseY;
        if (Math.abs(t.clientX - mouseRef.current.downX) > 6 || Math.abs(t.clientY - mouseRef.current.downY) > 6) {
          mouseRef.current.hasMovedSignificantly = true;
        }
        mouseRef.current.targetX += deltaX * 0.006;
        mouseRef.current.targetY = Math.max(-0.6, Math.min(0.6, mouseRef.current.targetY - deltaY * 0.004));
        mouseRef.current.prevMouseX = t.clientX;
        mouseRef.current.prevMouseY = t.clientY;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      mouseRef.current.isDown = false;
      if (!mouseRef.current.hasMovedSignificantly && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const hit = getRaycastHit(t.clientX, t.clientY);
        const targetToOpen = hit || hoveredProjectRef.current;
        if (targetToOpen) {
          setSelectedProject(targetToOpen);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth && newHeight && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 11. Animation Loop with THREE.Timer
    let animationFrameId: number;
    const timer = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update();
      const delta = timer.getDelta();
      const elapsed = timer.getElapsed();

      // Celestial Gyroscope Oscillations & Precession
      kernelGroup.rotation.y += delta * 0.2;
      cageMesh.rotation.x += delta * 0.15;
      cageMesh.rotation.y -= delta * 0.12;
      ring1.rotation.z += delta * 0.4;
      ring2.rotation.y += delta * 0.35;
      ring3.rotation.x += delta * 0.3;

      // Pulse Central Celestial Star Luminescence
      const starGlow = 0.8 + Math.sin(elapsed * 2.5) * 0.3;
      if (chipCoreMatRef.current) {
        chipCoreMatRef.current.emissiveIntensity = starGlow;
      }
      auraMesh.scale.setScalar(1.0 + Math.sin(elapsed * 1.8) * 0.04);

      // Animate Distributed Planetary Nodes & Moonlets
      microserviceNodes.forEach(node => {
        // Orbit around Kernel
        node.angle += node.orbitSpeed;
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;
        node.group.position.x = x;
        node.group.position.z = z;

        // Self rotation of planet and ring
        node.mesh.rotation.y += delta * 0.7;
        node.ringMesh.rotation.z += delta * 0.4;

        // Orbit Moonlet around the Planet
        node.moonAngle += delta * 2.2;
        node.moonMesh.position.set(
          Math.cos(node.moonAngle) * 3.4,
          Math.sin(node.moonAngle * 0.5) * 0.7,
          Math.sin(node.moonAngle) * 3.4
        );

        // Update data bus conduit lines to match new positions
        const conduitPos = node.conduitLine.geometry.attributes.position as THREE.BufferAttribute;
        conduitPos.setXYZ(1, x, node.group.position.y, z);
        conduitPos.needsUpdate = true;

        // Packet traversal along bus line
        node.packetProgress += node.packetSpeed;
        if (node.packetProgress > 1) node.packetProgress = 0;
        const packetX = x * node.packetProgress;
        const packetY = node.group.position.y * node.packetProgress;
        const packetZ = z * node.packetProgress;
        node.packet.position.set(packetX, packetY, packetZ);
      });

      // Slowly rotate celestial coordinate rings on horizon
      celestialGround.rotation.y += delta * 0.03;

      // Animate Skills Constellation
      skillCluster.rotation.y += delta * 0.15;

      // Gentle matrix dust drifting
      matrixDust.rotation.y += delta * 0.02;

      // Orbit camera interpolation with damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      currentCameraPosRef.current.lerp(targetCameraPosRef.current, 0.05);

      const camRadius = currentCameraPosRef.current.length();
      const currentTheta = Math.atan2(currentCameraPosRef.current.x, currentCameraPosRef.current.z) + mouseRef.current.x;
      const currentPhi = Math.acos(Math.max(-1, Math.min(1, currentCameraPosRef.current.y / camRadius))) + mouseRef.current.y;

      camera.position.x = camRadius * Math.sin(currentPhi) * Math.sin(currentTheta);
      camera.position.y = camRadius * Math.cos(currentPhi);
      camera.position.z = camRadius * Math.sin(currentPhi) * Math.cos(currentTheta);

      camera.lookAt(cameraTargetRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [cosmicTheme, data.projects, data.skills, setSelectedProject]);

  const resetCamera = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    cameraTargetRef.current.set(0, 0, 0);
  };

  const activeThemeMeta = SOFTWARE_THEMES[cosmicTheme] || SOFTWARE_THEMES.cyan;

  if (!webGlSupported) {
    return (
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-center p-6 bg-slate-950 text-center font-mono">
        <Cpu className="w-12 h-12 text-cyan-400 mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">3D Hardware Acceleration Offline</h3>
        <p className="text-xs text-slate-400 max-w-sm mb-4">
          WebGL context is inactive or restricted. You can seamlessly explore all software engineering systems in 2D mode.
        </p>
        <button
          onClick={() => setViewMode('2d')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors"
        >
          Switch to Standard 2D View
        </button>
      </div>
    );
  }

  // When in interactive overlay mode, canvas is high priority full-screen with full orbit controls.
  // In standard view, canvas sits as a rich celestial 3D backdrop (opacity-70) perfectly aligned with font colors & translucent cards!
  return (
    <div
      id="software-canvas-container"
      className={`fixed inset-0 w-full h-full transition-opacity duration-700 ${
        is3DInteractiveOverlay
          ? 'z-40 pointer-events-auto bg-slate-950/95 backdrop-blur-sm'
          : 'z-0 pointer-events-none opacity-70 sm:opacity-75'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className={`w-full h-full ${is3DInteractiveOverlay ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
      />

      {/* 3D Celestial Universe HUD Controls (Top Bar) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-50">
        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 text-xs font-mono text-slate-100 pointer-events-auto shadow-2xl">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white">3D Celestial Universe</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">{activeThemeMeta.name}</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Theme Palette Switcher */}
          <div className="relative">
            <button
              id="btn-tech-palette-toggle"
              onClick={() => setShowThemePicker(!showThemePicker)}
              title="Select 3D Celestial Theme"
              className="p-2 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md text-xs flex items-center gap-1.5 shadow-xl transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline font-mono">Theme</span>
            </button>

            {showThemePicker && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/98 border border-slate-700 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  3D Celestial Themes
                </div>
                {(Object.keys(SOFTWARE_THEMES) as CosmicTheme[]).map(thKey => {
                  const th = SOFTWARE_THEMES[thKey];
                  const isSelected = cosmicTheme === thKey;
                  return (
                    <button
                      key={thKey}
                      onClick={() => {
                        setCosmicTheme(thKey);
                        setShowThemePicker(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 text-white font-bold border border-cyan-500/50'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white/40"
                          style={{ backgroundColor: `#${th.coreLight.toString(16).padStart(6, '0')}` }}
                        />
                        <div>
                          <div className="font-semibold">{th.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{th.tagline}</div>
                        </div>
                      </div>
                      {isSelected && <span className="text-[10px] text-cyan-400 font-mono font-bold">Active</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset View */}
          <button
            id="btn-reset-arch-camera"
            onClick={resetCamera}
            title="Reset Architecture View"
            className="p-2 rounded-xl bg-slate-950/75 hover:bg-slate-900/80 text-slate-200 hover:text-white border border-slate-700/60 transition-colors backdrop-blur-xl text-xs flex items-center gap-1.5 shadow-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Reset</span>
          </button>

          {/* Toggle Interactive 3D Orbit Flight Mode */}
          <button
            id="btn-toggle-3d-orbit-mode"
            onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
            title={is3DInteractiveOverlay ? "Exit 3D Interactive Mode" : "Enter Fullscreen 3D Interactive Architecture Mode"}
            className={`px-3 py-2 rounded-xl text-xs font-mono border backdrop-blur-xl transition-all flex items-center gap-1.5 shadow-xl ${
              is3DInteractiveOverlay
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-950/75 text-cyan-300 border-cyan-500/40 hover:bg-slate-900/80'
            }`}
          >
            {is3DInteractiveOverlay ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{is3DInteractiveOverlay ? 'Exit 3D Sandbox' : 'Interactive 3D Sandbox'}</span>
          </button>

          {/* 2D Mode Switch */}
          <button
            id="btn-switch-to-2d-mode"
            onClick={() => {
              setViewMode('2d');
              setIs3DInteractiveOverlay(false);
            }}
            title="Switch to 2D view"
            className="px-3 py-2 rounded-xl bg-slate-950/75 hover:bg-slate-900/80 text-slate-200 hover:text-cyan-400 border border-slate-700/60 transition-colors backdrop-blur-xl text-xs flex items-center gap-1.5 shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">2D View</span>
          </button>
        </div>
      </div>

      {/* Interactive System Telemetry HUD Card (Tapping opens the project dossier!) */}
      {hoveredProject && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <div
            onClick={() => setSelectedProject(hoveredProject)}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setSelectedProject(hoveredProject);
            }}
            className="cursor-pointer bg-slate-950/75 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-sm w-88 text-left ring-1 ring-cyan-400/30 hover:border-cyan-400 hover:ring-cyan-400/60 transition-all group active:scale-98"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {hoveredProject.category}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-semibold flex items-center gap-1 group-hover:text-cyan-300">
                <span>Tap to Open Full Spec</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-display mb-1 group-hover:text-cyan-300 transition-colors">
              {hoveredProject.title}
            </h4>
            <p className="text-xs text-slate-200 line-clamp-2 mb-3 leading-relaxed">
              {hoveredProject.tagline || hoveredProject.description}
            </p>
            <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-800/80">
              <span className="text-slate-300 text-[11px] font-mono">
                {hoveredProject.technologies.slice(0, 3).join(' • ')}
              </span>
              <span className="text-emerald-400 text-[11px] font-mono font-bold">
                {hoveredProject.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Guidance Pill in Full Interactive Mode */}
      {is3DInteractiveOverlay && !hoveredProject && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-slate-100 text-xs font-mono bg-slate-950/75 px-4 py-2 rounded-full border border-cyan-500/40 backdrop-blur-xl flex items-center gap-2 shadow-2xl z-50">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Tap any Planetary Node to open its complete engineering dossier</span>
        </div>
      )}
    </div>
  );
};
