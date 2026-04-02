'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

const DIMENSIONS: Record<Project['aspectRatio'], { width: number; height: number }> = {
  portrait:  { width: 800,  height: 1000 },
  landscape: { width: 1200, height: 800  },
  square:    { width: 900,  height: 900  },
};

const PLACEHOLDER_COLORS = [
  '#1a1a1a', '#222222', '#2a2a2a', '#1f1f1f', '#252525',
  '#181818', '#202020', '#282828', '#1e1e1e', '#242424',
];

const CANVAS = { w: 2000, h: 1600 };

const SCATTER = [
  { x:  180, y:  120, width: 228 },
  { x:  520, y:  380, width: 228 },
  { x:  900, y:  100, width: 228 },
  { x: 1220, y:  420, width: 228 },
  { x:  720, y:  680, width: 228 },
  { x:  200, y:  820, width: 228 },
  { x: 1450, y:  160, width: 228 },
  { x: 1050, y:  940, width: 228 },
  { x:  420, y: 1080, width: 228 },
  { x: 1600, y:  700, width: 228 },
];

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ project, index }: { project: Project; index: number }) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <Link href={`/projects/${project.slug}`} className="block active:opacity-60 transition-opacity">
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {hasImage ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        ) : (
          <div style={{ backgroundColor: placeholderColor }} className="w-full h-full" />
        )}
      </div>
      <p className="text-[8px] tracking-[0.05em] text-fg/80 mt-1 leading-snug" style={{ fontWeight: 500 }}>
        {project.title}
      </p>
      <p className="text-[7px] tracking-[0.03em] text-fg/40 mt-0.5" style={{ fontWeight: 400 }}>
        {project.client}
      </p>
    </Link>
  );
}

// ─── Desktop floating card ────────────────────────────────────────────────────

function FloatingCard({ project, pos, index }: {
  project: Project;
  pos: { x: number; y: number; width: number };
  index: number;
}) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const [isHovered, setIsHovered] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springCfg = { stiffness: 300, damping: 28, mass: 0.5 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-7, 7]), springCfg);
  const liftY   = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const scale   = useSpring(1, { stiffness: 260, damping: 20 });
  const shadow  = useTransform(
    liftY,
    [0, -22],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 28px 56px rgba(0,0,0,0.30)']
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width  - 0.5);
    tiltY.set((e.clientY - r.top)  / r.height - 0.5);
    liftY.set(-22);
    scale.set(1.5);
    if (!isHovered) setIsHovered(true);
  }

  function onMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
    liftY.set(0);
    scale.set(1);
    setIsHovered(false);
  }

  return (
    <div style={{ position: 'absolute', left: pos.x, top: pos.y, width: pos.width, zIndex: isHovered ? 10 : 1 }}>
      <Link href={`/projects/${project.slug}`} className="block outline-none">
        <div style={{ perspective: 900 }}>
          <motion.div
            style={{ rotateX, rotateY, y: liftY, scale, transformStyle: 'preserve-3d', boxShadow: shadow }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="will-change-transform"
          >
            <div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              {hasImage ? (
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div style={{ backgroundColor: placeholderColor }} className="w-full h-full" />
              )}

              {/* Title overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '10px',
                  pointerEvents: 'none',
                }}
              >
                <p className="text-[10px] tracking-wide text-white leading-snug" style={{ fontWeight: 500 }}>
                  {project.title}
                </p>
                <p className="text-[9px] text-white/60 mt-0.5" style={{ fontWeight: 400 }}>
                  {project.client}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </div>
  );
}

// ─── ProjectGrid ──────────────────────────────────────────────────────────────

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window === 'undefined' || window.innerWidth < 768
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return <MobileGrid projects={projects} />;
  return <DesktopGrid projects={projects} />;
}

// ─── Mobile grid ──────────────────────────────────────────────────────────────

function MobileGrid({ projects }: { projects: Project[] }) {
  return (
    <div style={{ overflowX: 'clip', maxWidth: '100vw' }} className="px-3 pt-3 pb-10">
      <div className="grid grid-cols-2 gap-x-2 gap-y-4" style={{ maxWidth: '100%' }}>
        {projects.map((project, i) => (
          <MobileCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop canvas grid ──────────────────────────────────────────────────────

function DesktopGrid({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Lock body scroll — desktop navigation is mouse-only
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);

  useEffect(() => {
    if (containerSize.w === 0) return;

    const maxX = (CANVAS.w - containerSize.w) / 2;
    const maxY = (CANVAS.h - containerSize.h) / 2;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / containerSize.w  - 0.5) * 2;
      const ny = (e.clientY / containerSize.h - 0.5) * 2;
      targetX = -nx * maxX;
      targetY = -ny * maxY;
    };

    const ease = 0.055;
    const tick = () => {
      canvasX.set(canvasX.get() + (targetX - canvasX.get()) * ease);
      canvasY.set(canvasY.get() + (targetY - canvasY.get()) * ease);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [containerSize, canvasX, canvasY]);

  const offsetX = (CANVAS.w - containerSize.w) / 2;
  const offsetY = (CANVAS.h - containerSize.h) / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100svh - var(--spacing-nav-h))' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: CANVAS.w,
          height: CANVAS.h,
          left: -offsetX,
          top:  -offsetY + 150,
          x: canvasX,
          y: canvasY,
        }}
      >
        {projects.map((project, i) => (
          <FloatingCard
            key={project.id}
            project={project}
            pos={SCATTER[i % SCATTER.length]}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}
