import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CountUp } from "./CountUp";

// ─── Animation Timeline ──────────────────────────────────────────────────────
// Phase 0→1s: appear
// Phase 1→2.5s: front cover opens
// Phase 2.5→8s: pages flip one by one
// Phase 8→9.5s: front cover closes
// Phase 9.5→12s: pause, then loop restart

const NUM_PAGES = 16;
const LOOP_DURATION = 12;

const PAGE_TEXTS = [
  "Chapter 1\n\nThe Beginning",
  "It was a dark and\nstormy night...",
  "The wind howled\nthrough the trees",
  "A lone figure\nstood at the edge",
  "Looking out into\nthe abyss",
  "What lies beyond\nthe horizon?",
  "The truth is rarely\npure",
  "And never simple",
  "But we must keep\nsearching",
  "For the light\nin the darkness",
  "Every story has\na beginning",
  "And every journey\nhas an end",
  "But the journey\nitself is",
  "What truly matters\nin the end",
  "To be continued...",
  "The End",
];

function getPhaseProgress(t: number) {
  const looped = t % LOOP_DURATION;
  return {
    // 0→1 = cover opens, 1=fully open
    coverOpen: Math.min(Math.max((looped - 1) / 1.5, 0), 1),
    // 0→1 for each page (staggered)
    pageFlips: Array.from({ length: NUM_PAGES }, (_, i) => {
      const start = 2.5 + (i / NUM_PAGES) * 5.5;
      return Math.min(Math.max((looped - start) / 0.6, 0), 1);
    }),
    // 0→1 = cover closes
    coverClose: Math.min(Math.max((looped - 9.5) / 1.2, 0), 1),
  };
}

// Ease in-out cubic
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── 3D Book ─────────────────────────────────────────────────────────────────
function Book({ elapsedRef }: { elapsedRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const frontCover = useRef<THREE.Group>(null);
  const pageGroupRefs = useRef<THREE.Group[]>([]);

  const W = 2.2, H = 3.2, D = 0.4;
  const pageThick = 0.014;

  // ── Materials ────────────────────────────────────────────────────────────
  const coverMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1e1b4b",   // deep indigo — matches website primary
    roughness: 0.25,
    metalness: 0.15,
  }), []);

  const spineAccentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#7c3aed",   // violet-600
    roughness: 0.2,
    metalness: 0.5,
    emissive: new THREE.Color("#4c1d95"),
    emissiveIntensity: 0.3,
  }), []);

  const pageMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f8f7ff",
    roughness: 0.95,
    metalness: 0,
    side: THREE.DoubleSide,
  }), []);

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#a78bfa",   // violet-400
    roughness: 0.1,
    metalness: 0.8,
    emissive: new THREE.Color("#7c3aed"),
    emissiveIntensity: 0.2,
  }), []);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    const { coverOpen, pageFlips, coverClose } = getPhaseProgress(elapsedRef.current);

    // Subtle idle rotation
    if (group.current) {
      group.current.rotation.y = Math.sin(elapsedRef.current * 0.4) * 0.08;
      group.current.position.y = Math.sin(elapsedRef.current * 0.6) * 0.06;
    }

    // Front cover: open then close
    if (frontCover.current) {
      const openAmt = easeInOut(coverOpen) * (1 - easeInOut(coverClose));
      frontCover.current.rotation.y = THREE.MathUtils.lerp(
        0,
        -Math.PI * 0.94,
        openAmt
      );
    }

    // Pages
    pageGroupRefs.current.forEach((pg, i) => {
      if (!pg) return;
      const flip = easeInOut(pageFlips[i]) * (1 - easeInOut(coverClose));
      pg.rotation.y = THREE.MathUtils.lerp(0, -Math.PI * 0.88 + i * 0.02, flip);
    });
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.18, -0.25, 0]}>
      {/* ── Back Cover ── */}
      <mesh position={[W / 2, 0, -D / 2]} castShadow receiveShadow material={coverMat}>
        <boxGeometry args={[W, H, 0.035]} />
      </mesh>

      {/* ── Spine ── */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow material={coverMat}>
        <boxGeometry args={[0.05, H, D]} />
      </mesh>
      {/* Spine accent strip */}
      <mesh position={[0.026, 0, 0]} material={spineAccentMat}>
        <boxGeometry args={[0.008, H * 0.85, D * 0.6]} />
      </mesh>

      {/* ── Pages ── */}
      {Array.from({ length: NUM_PAGES }).map((_, i) => {
        const z = -D / 2 + 0.04 + (i * (D - 0.08)) / NUM_PAGES;
        const shade = 245 - i * 4;
        return (
          <group
            key={i}
            ref={(el) => { if (el) pageGroupRefs.current[i] = el; }}
            position={[0, 0, z]}
          >
            <mesh
              position={[W / 2 - 0.02, 0, 0]}
              // Removed castShadow and receiveShadow here drastically improves performance (fixes scrolling jitter!)
              material={pageMat}
            >
              <boxGeometry args={[W - 0.05, H - 0.06, pageThick]} />
            </mesh>
            {/* Page Content */}
            <Text
              position={[W / 2 - 0.02, 0, pageThick / 2 + 0.001]}
              fontSize={0.16}
              color="#334155"
              maxWidth={W - 0.4}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.002}
              outlineColor="#ffffff"
            >
              {PAGE_TEXTS[i] || ""}
            </Text>
            {/* Text on the back of the page too! */}
            <Text
              position={[W / 2 - 0.02, 0, -pageThick / 2 - 0.001]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.16}
              color="#334155"
              maxWidth={W - 0.4}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
            >
              {(i > 0 && PAGE_TEXTS[i - 1]) || ""}
            </Text>
          </group>
        );
      })}

      {/* ── Front Cover (hinged at spine=x:0) ── */}
      <group ref={frontCover} position={[0, 0, D / 2]}>
        {/* Main cover board */}
        <mesh position={[W / 2, 0, 0]} castShadow receiveShadow material={coverMat}>
          <boxGeometry args={[W, H, 0.035]} />
        </mesh>
        {/* Metallic title block */}
        <mesh position={[W / 2, 0.4, 0.018]} material={goldMat}>
          <boxGeometry args={[W * 0.62, 0.22, 0.002]} />
        </mesh>
        {/* Decorative lines */}
        <mesh position={[W / 2, 0.1, 0.018]} material={goldMat}>
          <boxGeometry args={[W * 0.55, 0.008, 0.002]} />
        </mesh>
        <mesh position={[W / 2, -0.05, 0.018]} material={goldMat}>
          <boxGeometry args={[W * 0.55, 0.008, 0.002]} />
        </mesh>
        {/* Author line */}
        <mesh position={[W / 2, -0.9, 0.018]} material={goldMat}>
          <boxGeometry args={[W * 0.4, 0.1, 0.002]} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene({ elapsedRef }: { elapsedRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.9} color="#e0d9ff" />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
      <directionalLight position={[-6, 2, -4]} intensity={0.4} color="#818cf8" />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#a78bfa" />
      <Environment preset="city" />

      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.15}>
        <Book elapsedRef={elapsedRef} />
      </Float>

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={5}
        color="#4c1d95"
        resolution={512} // low resolution for perf
        frames={1}       // bake instantly to avoid computing every frame
      />
    </>
  );
}

export function Hero3D() {
  const elapsedRef = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(cursorX, springConfig);
  const mouseY = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates to -1 to 1 based on window size
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    cursorX.set(x);
    cursorY.set(y);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden bg-background flex items-center"
    >
      {/* ── Background glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ x: useTransform(mouseX, [-1, 1], [-50, 50]), y: useTransform(mouseY, [-1, 1], [-50, 50]) }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ x: useTransform(mouseX, [-1, 1], [50, -50]), y: useTransform(mouseY, [-1, 1], [50, -50]) }}
          className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ x: useTransform(mouseX, [-1, 1], [-20, 20]), y: useTransform(mouseY, [-1, 1], [20, -20]) }}
          className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-indigo-500/8 rounded-full blur-[80px]" 
        />
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm px-4 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
              <span className="text-sm font-semibold text-violet-300">
                Over 10,000 curated books
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground mb-6"
            >
              Discover your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                next story.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Explore thousands of hand-curated books across every genre.
              From timeless classics to the latest releases — your perfect
              read is waiting.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="/books"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                Explore Library <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-primary/5 backdrop-blur-sm px-7 py-3.5 text-base font-semibold text-foreground hover:bg-primary/10 hover:border-violet-400/50 transition-all"
              >
                <BookOpen className="h-5 w-5 text-violet-400" /> Browse Genres
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex gap-8"
            >
              <div className="flex flex-col items-center">
                <CountUp prefix="" suffix="K+" to={10} className="text-2xl font-extrabold text-foreground" />
                <span className="text-xs text-muted-foreground mt-0.5">Books</span>
              </div>
              <div className="flex flex-col items-center">
                <CountUp prefix="" suffix="K+" to={50} className="text-2xl font-extrabold text-foreground" />
                <span className="text-xs text-muted-foreground mt-0.5">Readers</span>
              </div>
              <div className="flex flex-col items-center">
                <CountUp prefix="" suffix="★" to={4.9} decimals={1} className="text-2xl font-extrabold text-foreground" />
                <span className="text-xs text-muted-foreground mt-0.5">Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative h-[480px] sm:h-[560px] w-full"
          >
            {/* Glow ring behind canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-violet-600/15 blur-3xl" />
            </div>

            <Canvas
              dpr={[1, 1.5]} // restricts pixel ratio for massively better performance on 4k/retina screens
              shadows
              camera={{ position: [0, 0, 7.5], fov: 38 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
            >
              <Scene elapsedRef={elapsedRef} />
            </Canvas>

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/5 border border-primary/10 backdrop-blur-md rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-medium text-foreground/70">Live 3D preview — pages auto-flip</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
