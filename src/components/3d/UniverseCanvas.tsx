import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, CosmicTheme } from '../../types';
import { Sparkles, Eye, Compass, RotateCcw, Palette, Maximize2, Minimize2, ArrowRight } from 'lucide-react';

const THEMES: Record<CosmicTheme, {
  name: string;
  tagline: string;
  coreLight: number;
  coreEmissive: number;
  coreColor: number;
  ringColor: number;
  accent1: number;
  accent2: number;
  ambientLight: number;
  starColorA: number;
  starColorB: number;
  fogColor: number;
  nebulaHueStart: number;
  nebulaHueRange: number;
  uiGlow: string;
  uiBorder: string;
}> = {
  cyan: {
    name: 'Nebula Cyan',
    tagline: 'Deep Space Voyager',
    coreLight: 0x38bdf8,
    coreEmissive: 0x0369a1,
    coreColor: 0x0284c7,
    ringColor: 0x38bdf8,
    accent1: 0x06b6d4,
    accent2: 0x6366f1,
    ambientLight: 0x1e293b,
    starColorA: 0x38bdf8,
    starColorB: 0x818cf8,
    fogColor: 0x050814,
    nebulaHueStart: 0.52,
    nebulaHueRange: 0.15,
    uiGlow: 'rgba(56, 189, 248, 0.25)',
    uiBorder: 'border-cyan-500/40',
  },
  amethyst: {
    name: 'Cosmic Amethyst',
    tagline: 'Nebular Dream & Violet',
    coreLight: 0xc084fc,
    coreEmissive: 0x6b21a8,
    coreColor: 0x7e22ce,
    ringColor: 0xa855f7,
    accent1: 0xec4899,
    accent2: 0x8b5cf6,
    ambientLight: 0x2e1065,
    starColorA: 0xc084fc,
    starColorB: 0xf43f5e,
    fogColor: 0x0e0618,
    nebulaHueStart: 0.74,
    nebulaHueRange: 0.16,
    uiGlow: 'rgba(192, 132, 252, 0.25)',
    uiBorder: 'border-purple-500/40',
  },
  solar: {
    name: 'Supernova Gold',
    tagline: 'Solar Flare & Radiant Amber',
    coreLight: 0xfbbf24,
    coreEmissive: 0xb45309,
    coreColor: 0xd97706,
    ringColor: 0xf59e0b,
    accent1: 0xf97316,
    accent2: 0xef4444,
    ambientLight: 0x451a03,
    starColorA: 0xfbbf24,
    starColorB: 0xf87171,
    fogColor: 0x140702,
    nebulaHueStart: 0.08,
    nebulaHueRange: 0.10,
    uiGlow: 'rgba(251, 191, 36, 0.25)',
    uiBorder: 'border-amber-500/40',
  },
  aurora: {
    name: 'Emerald Aurora',
    tagline: 'Bioluminescent Exoplanet',
    coreLight: 0x34d399,
    coreEmissive: 0x047857,
    coreColor: 0x059669,
    ringColor: 0x10b981,
    accent1: 0x06b6d4,
    accent2: 0x10b981,
    ambientLight: 0x064e3b,
    starColorA: 0x34d399,
    starColorB: 0x22d3ee,
    fogColor: 0x04130f,
    nebulaHueStart: 0.40,
    nebulaHueRange: 0.15,
    uiGlow: 'rgba(52, 211, 153, 0.25)',
    uiBorder: 'border-emerald-500/40',
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
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetsMapRef = useRef<Map<THREE.Mesh, Project>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, prevMouseX: 0, prevMouseY: 0 });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 24, 65));
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 24, 65));

  // Dynamic light & material references for theme updates
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const accentLight1Ref = useRef<THREE.PointLight | null>(null);
  const accentLight2Ref = useRef<THREE.PointLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const innerCoreMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const wireCoreMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const coreRingMatRef = useRef<THREE.MeshBasicMaterial | null>(null);

  // Smooth camera repositioning on page switch
  useEffect(() => {
    if (activePage === 'universe') {
      targetCameraPosRef.current.set(0, 24, 65);
      cameraTargetRef.current.set(0, 0, 0);
    } else if (activePage === 'projects') {
      targetCameraPosRef.current.set(16, 36, 52);
      cameraTargetRef.current.set(6, 0, 0);
    } else if (activePage === 'journey') {
      targetCameraPosRef.current.set(-24, 20, 52);
      cameraTargetRef.current.set(-18, 8, -6);
    } else if (activePage === 'all') {
      targetCameraPosRef.current.set(0, 25, 68);
      cameraTargetRef.current.set(0, 0, 0);
    }
  }, [activePage]);

  // Dynamic theme update
  useEffect(() => {
    const active = THEMES[cosmicTheme] || THEMES.cyan;

    if (coreLightRef.current) coreLightRef.current.color.setHex(active.coreLight);
    if (accentLight1Ref.current) accentLight1Ref.current.color.setHex(active.accent1);
    if (accentLight2Ref.current) accentLight2Ref.current.color.setHex(active.accent2);
    if (ambientLightRef.current) ambientLightRef.current.color.setHex(active.ambientLight);

    if (innerCoreMatRef.current) {
      innerCoreMatRef.current.color.setHex(active.coreColor);
      innerCoreMatRef.current.emissive.setHex(active.coreEmissive);
    }
    if (wireCoreMatRef.current) wireCoreMatRef.current.color.setHex(active.ringColor);
    if (coreRingMatRef.current) coreRingMatRef.current.color.setHex(active.ringColor);

    if (sceneRef.current && sceneRef.current.fog) {
      (sceneRef.current.fog as THREE.FogExp2).color.setHex(active.fogColor);
    }
  }, [cosmicTheme]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL availability
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
    const curTheme = THEMES[cosmicTheme] || THEMES.cyan;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(curTheme.fogColor, 0.007);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1200);
    camera.position.set(0, 24, 65);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Dynamic Cosmic Lights
    const ambientLight = new THREE.AmbientLight(curTheme.ambientLight, 2.0);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const coreLight = new THREE.PointLight(curTheme.coreLight, 4.0, 110);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);
    coreLightRef.current = coreLight;

    const accentLight1 = new THREE.PointLight(curTheme.accent1, 2.8, 90);
    accentLight1.position.set(35, 25, 20);
    scene.add(accentLight1);
    accentLight1Ref.current = accentLight1;

    const accentLight2 = new THREE.PointLight(curTheme.accent2, 2.5, 90);
    accentLight2.position.set(-35, -15, -20);
    scene.add(accentLight2);
    accentLight2Ref.current = accentLight2;

    // 5. Deep Cosmic Multi-Spectral Starfield
    const starCount = 4200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cStarA = new THREE.Color(curTheme.starColorA);
    const cStarB = new THREE.Color(curTheme.starColorB);
    const cStarWhite = new THREE.Color(0xffffff);
    const cStarGold = new THREE.Color(0xffdf80);

    for (let i = 0; i < starCount; i++) {
      const radius = 90 + Math.random() * 320;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const mixed = r > 0.65 ? cStarA : r > 0.4 ? cStarB : r > 0.15 ? cStarWhite : cStarGold;
      starColors[i * 3] = mixed.r;
      starColors[i * 3 + 1] = mixed.g;
      starColors[i * 3 + 2] = mixed.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Volumetric Nebula Clouds
    const nebulaCount = 800;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const rad = 25 + Math.random() * 75;
      const angle = Math.random() * Math.PI * 2;
      const heightSpread = (Math.random() - 0.5) * 22;

      nebulaPositions[i * 3] = Math.cos(angle) * rad;
      nebulaPositions[i * 3 + 1] = heightSpread;
      nebulaPositions[i * 3 + 2] = Math.sin(angle) * rad;

      const hue = curTheme.nebulaHueStart + Math.random() * curTheme.nebulaHueRange;
      const pColor = new THREE.Color().setHSL(hue, 0.85, 0.62);
      nebulaColors[i * 3] = pColor.r;
      nebulaColors[i * 3 + 1] = pColor.g;
      nebulaColors[i * 3 + 2] = pColor.b;
    }

    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // 7. Identity Stellar Core (Bilal Hassan Mussa)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glowing Core
    const innerCoreGeo = new THREE.IcosahedronGeometry(3.8, 3);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: curTheme.coreColor,
      roughness: 0.15,
      metalness: 0.85,
      emissive: curTheme.coreEmissive,
      emissiveIntensity: 0.75,
    });
    innerCoreMatRef.current = innerCoreMat;
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // Wireframe Geometric Corona
    const wireCoreGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: curTheme.ringColor,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    wireCoreMatRef.current = wireCoreMat;
    const wireCore = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    coreGroup.add(wireCore);

    // Dual Glowing Equatorial Energy Rings
    const coreRingGeo1 = new THREE.RingGeometry(5.4, 5.9, 64);
    const coreRingMat1 = new THREE.MeshBasicMaterial({
      color: curTheme.ringColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    coreRingMatRef.current = coreRingMat1;
    const coreRing1 = new THREE.Mesh(coreRingGeo1, coreRingMat1);
    coreRing1.rotation.x = Math.PI / 2;
    coreGroup.add(coreRing1);

    const coreRingGeo2 = new THREE.RingGeometry(6.2, 6.5, 64);
    const coreRingMat2 = new THREE.MeshBasicMaterial({
      color: curTheme.accent1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const coreRing2 = new THREE.Mesh(coreRingGeo2, coreRingMat2);
    coreRing2.rotation.x = Math.PI / 2.3;
    coreRing2.rotation.y = Math.PI / 6;
    coreGroup.add(coreRing2);

    // 8. Project Celestial Planetary Belts
    const planetsMap = new Map<THREE.Mesh, Project>();
    planetsMapRef.current = planetsMap;
    const planetMeshes: { mesh: THREE.Mesh; orbitGroup: THREE.Group; speed: number; ringMesh?: THREE.Mesh }[] = [];

    const activeProjects = data.projects.filter(p => p.published);
    activeProjects.forEach((proj, idx) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const orbitRadius = 16 + idx * 9;

      // Orbit guide ring
      const orbitPathGeo = new THREE.BufferGeometry();
      const points = [];
      for (let a = 0; a <= 72; a++) {
        const theta = (a / 72) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
      }
      orbitPathGeo.setFromPoints(points);
      const orbitPathMat = new THREE.LineBasicMaterial({
        color: curTheme.ringColor,
        transparent: true,
        opacity: 0.28
      });
      const orbitLine = new THREE.Line(orbitPathGeo, orbitPathMat);
      scene.add(orbitLine);

      // Planet Mesh
      const colorHex = proj.color ? parseInt(proj.color.replace('#', '0x'), 16) : curTheme.coreLight;
      const planetGeo = new THREE.SphereGeometry(2.1, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.25,
        metalness: 0.7,
        emissive: colorHex,
        emissiveIntensity: 0.45,
      });

      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      const initialAngle = (idx / activeProjects.length) * Math.PI * 2;
      planetMesh.position.set(
        Math.cos(initialAngle) * orbitRadius,
        (idx % 2 === 0 ? 1 : -1) * 2.5,
        Math.sin(initialAngle) * orbitRadius
      );

      // Atmospheric Rings for planet
      const ringGeo = new THREE.RingGeometry(2.8, 3.4, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.4;
      planetMesh.add(ringMesh);

      orbitGroup.add(planetMesh);
      planetsMap.set(planetMesh, proj);

      planetMeshes.push({
        mesh: planetMesh,
        orbitGroup,
        speed: 0.0032 - idx * 0.0005,
        ringMesh
      });
    });

    // 9. Skills Constellation Cluster
    const skillClusterGroup = new THREE.Group();
    skillClusterGroup.position.set(-26, 16, -18);
    scene.add(skillClusterGroup);

    const featuredSkills = data.skills.filter(s => s.featured).slice(0, 10);
    const skillNodes: THREE.Vector3[] = [];

    featuredSkills.forEach((_, sIdx) => {
      const phi = Math.acos(-1 + (2 * sIdx) / featuredSkills.length);
      const theta = Math.sqrt(featuredSkills.length * Math.PI) * phi;
      const r = 9;
      const pos = new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      skillNodes.push(pos);

      const nodeGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: curTheme.accent1,
        emissive: curTheme.accent1,
        emissiveIntensity: 0.6
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      skillClusterGroup.add(nodeMesh);
    });

    if (skillNodes.length > 1) {
      const linePositions: number[] = [];
      for (let i = 0; i < skillNodes.length; i++) {
        for (let j = i + 1; j < skillNodes.length; j++) {
          if (skillNodes[i].distanceTo(skillNodes[j]) < 10) {
            linePositions.push(skillNodes[i].x, skillNodes[i].y, skillNodes[i].z);
            linePositions.push(skillNodes[j].x, skillNodes[j].y, skillNodes[j].z);
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: curTheme.accent2, transparent: true, opacity: 0.45 });
      const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
      skillClusterGroup.add(constellationLines);
    }

    // 10. Pointer & Raycasting Events
    const raycaster = new THREE.Raycaster();
    const mouseNormalized = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormalized.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalized.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.prevMouseX;
        const deltaY = e.clientY - mouseRef.current.prevMouseY;
        mouseRef.current.targetX += deltaX * 0.005;
        mouseRef.current.targetY = Math.max(-0.6, Math.min(0.6, mouseRef.current.targetY - deltaY * 0.003));
      }

      mouseRef.current.prevMouseX = e.clientX;
      mouseRef.current.prevMouseY = e.clientY;
    };

    const onPointerDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.prevMouseX = e.clientX;
      mouseRef.current.prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      mouseRef.current.isDown = false;
    };

    const onClick = () => {
      if (!cameraRef.current) return;
      raycaster.setFromCamera(mouseNormalized, cameraRef.current);
      const meshesToTest = Array.from(planetsMap.keys());
      const intersects = raycaster.intersectObjects(meshesToTest, false);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = planetsMap.get(hitMesh);
        if (matched) {
          setSelectedProject(matched);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);

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

    // 11. Animation Loop with THREE.Timer (eliminating THREE.Clock deprecation)
    let animationFrameId: number;
    const timer = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update();
      const delta = timer.getDelta();
      const elapsed = timer.getElapsed();

      // Rotate Identity Core
      coreGroup.rotation.y += delta * 0.35;
      wireCore.rotation.x += delta * 0.25;
      coreRing1.rotation.z += delta * 0.18;
      coreRing2.rotation.y += delta * 0.12;

      // Pulse Core
      const pulse = Math.sin(elapsed * 2.2) * 0.07 + 1;
      innerCore.scale.set(pulse, pulse, pulse);

      // Starfield subtle drift
      starField.rotation.y += delta * 0.015;
      nebula.rotation.y += delta * 0.022;

      // Rotate Skills constellation
      skillClusterGroup.rotation.y += delta * 0.06;

      // Rotate Orbit Groups for Projects
      planetMeshes.forEach(item => {
        item.orbitGroup.rotation.y += item.speed;
        item.mesh.rotation.y += delta * 0.9;
      });

      // Camera lerp & damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      currentCameraPosRef.current.lerp(targetCameraPosRef.current, 0.045);
      camera.position.x = currentCameraPosRef.current.x + Math.sin(mouseRef.current.x) * 16;
      camera.position.y = currentCameraPosRef.current.y + mouseRef.current.y * 12;
      camera.position.z = currentCameraPosRef.current.z + Math.cos(mouseRef.current.x) * 9;
      camera.lookAt(cameraTargetRef.current);

      // Raycast hover check
      raycaster.setFromCamera(mouseNormalized, camera);
      const meshesToTest = Array.from(planetsMap.keys());
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = planetsMap.get(hitMesh);
        if (matched) {
          setHoveredProject(matched);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredProject(null);
        container.style.cursor = 'grab';
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);

      // Dispose scene resources
      scene.traverse(obj => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach(m => m.dispose());
          else mat.dispose();
        }
      });
      renderer.dispose();
    };
  }, [data.projects, data.skills, setSelectedProject]);

  const resetCamera = () => {
    targetCameraPosRef.current.set(0, 24, 65);
    cameraTargetRef.current.set(0, 0, 0);
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  const activeThemeMeta = THEMES[cosmicTheme] || THEMES.cyan;

  if (!webGlSupported) {
    return (
      <div id="universe-canvas-fallback" className="w-full h-full min-h-[420px] flex flex-col items-center justify-center bg-slate-950 p-6 text-center text-slate-300">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-display">WebGL 3D Accelerated Universe</h3>
        <p className="max-w-md text-sm text-slate-400 mb-6">
          Your browser or display device is operating in standard mode. Switch to standard 2D view for optimal performance.
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

  // When in interactive overlay mode, canvas is fixed full-screen with full pointer events
  // When in normal page mode, canvas sits as a fixed cosmic backdrop behind all 3 pages
  return (
    <div
      id="universe-canvas-container"
      className={`fixed inset-0 w-full h-full transition-opacity duration-700 ${
        is3DInteractiveOverlay
          ? 'z-40 pointer-events-auto bg-slate-950/90 backdrop-blur-xs'
          : 'z-0 pointer-events-none opacity-85'
      }`}
    >
      {/* 3D WebGL Canvas container */}
      <div ref={containerRef} className={`w-full h-full ${is3DInteractiveOverlay ? 'pointer-events-auto' : 'pointer-events-none'}`} />

      {/* Cosmic HUD Controls (Visible when in full interactive mode OR hovering hero) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-50">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/70 text-xs font-mono text-slate-200 pointer-events-auto shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1" />
          <span className="font-semibold text-white">Digital Universe</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400">{activeThemeMeta.name}</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Cosmic Palette Picker */}
          <div className="relative">
            <button
              id="btn-cosmic-palette-toggle"
              onClick={() => setShowThemePicker(!showThemePicker)}
              title="Cosmic Colour Palettes"
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md text-xs flex items-center gap-1.5 shadow-lg transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline font-mono">Palette</span>
            </button>

            {showThemePicker && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-700 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Cosmic Color Themes
                </div>
                {(Object.keys(THEMES) as CosmicTheme[]).map(thKey => {
                  const th = THEMES[thKey];
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
                          ? 'bg-cyan-500/20 text-white font-bold border border-cyan-500/40'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/40"
                          style={{ backgroundColor: `#${th.coreLight.toString(16).padStart(6, '0')}` }}
                        />
                        <span>{th.name}</span>
                      </div>
                      {isSelected && <span className="text-[10px] text-cyan-400 font-mono">Active</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset Camera */}
          <button
            id="btn-reset-universe-camera"
            onClick={resetCamera}
            title="Reset Camera View"
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors backdrop-blur-md text-xs flex items-center gap-1.5 shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Reset</span>
          </button>

          {/* Toggle Interactive 3D Sandbox Mode */}
          <button
            id="btn-toggle-3d-orbit-mode"
            onClick={() => setIs3DInteractiveOverlay(!is3DInteractiveOverlay)}
            title={is3DInteractiveOverlay ? "Close 3D Orbit Mode" : "Enter Interactive 3D Orbit Sandbox"}
            className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 shadow-lg ${
              is3DInteractiveOverlay
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900/90 text-cyan-300 border-cyan-500/40 hover:bg-slate-800'
            }`}
          >
            {is3DInteractiveOverlay ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{is3DInteractiveOverlay ? 'Exit 3D Flight' : '3D Flight Mode'}</span>
          </button>

          {/* 2D Mode Switch */}
          <button
            id="btn-switch-to-2d-mode"
            onClick={() => {
              setViewMode('2d');
              setIs3DInteractiveOverlay(false);
            }}
            title="Switch to 2D standard portfolio layout"
            className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 transition-colors backdrop-blur-md text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">2D View</span>
          </button>
        </div>
      </div>

      {/* Interactive Hover HUD Card (for inspecting celestial project bodies) */}
      {hoveredProject && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-4 shadow-2xl max-w-sm w-88 text-left ring-1 ring-cyan-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {hoveredProject.category}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Click Planet to Open</span>
            </div>
            <h4 className="text-base font-bold text-white font-display mb-1">{hoveredProject.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-2 mb-3">{hoveredProject.tagline || hoveredProject.description}</p>
            <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-800">
              <span className="text-slate-400 text-[11px] font-mono">{hoveredProject.technologies.slice(0, 3).join(' • ')}</span>
              <button
                onClick={() => setSelectedProject(hoveredProject)}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-xs"
              >
                <span>Inspect Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Mode Guidance Indicator */}
      {is3DInteractiveOverlay && !hoveredProject && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-slate-300 text-xs font-mono bg-slate-950/85 px-4 py-2 rounded-full border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 shadow-2xl z-50">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Click & Drag to Orbit • Click Celestial Bodies to Inspect Projects • Press Exit to Return</span>
        </div>
      )}
    </div>
  );
};
