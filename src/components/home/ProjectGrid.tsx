'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
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

const CARD_WIDTH = 228;
const CELL_W     = 420;
const CELL_H     = 360;

// Deterministic pseudo-random 0–1 from seed
function sr(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

interface CardPos { x: number; y: number; width: number }

function buildLayout(count: number): { canvas: { w: number; h: number }; positions: CardPos[] } {
  if (count === 0) return { canvas: { w: 800, h: 600 }, positions: [] };

  const cols = Math.max(1, Math.round(Math.sqrt(count * 1.4)));
  const rows = Math.ceil(count / cols);

  const canvas = { w: cols * CELL_W + 160, h: rows * CELL_H + 160 };

  const positions = Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jx  = (sr(i * 2)     - 0.5) * (CELL_W - CARD_WIDTH) * 0.7;
    const jy  = (sr(i * 2 + 1) - 0.5) * CELL_H * 0.4;
    return {
      x:     80 + col * CELL_W + CELL_W / 2 - CARD_WIDTH / 2 + jx,
      y:     80 + row * CELL_H + jy,
      width: CARD_WIDTH,
    };
  });

  return { canvas, positions };
}

// ─── FloatingCard ─────────────────────────────────────────────────────────────

interface FloatingCardProps {
  project: Project;
  pos: typeof SCATTER[number];
  index: number;
}

function FloatingCard({ project, pos, index }: FloatingCardProps) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springCfg = { stiffness: 300, damping: 28, mass: 0.5 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-7, 7]), springCfg);
  const liftY   = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const scale   = useSpring(1, { stiffness: 260, damping: 20 });
  const shadow  = useTransform(
    liftY,
    [0, -18],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 24px 48px rgba(0,0,0,0.28)']
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width  - 0.5);
    tiltY.set((e.clientY - r.top)  / r.height - 0.5);
    liftY.set(-22);
    scale.set(1.75);
  }

  function onMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
    liftY.set(0);
    scale.set(1);
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: pos.width,
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block outline-none group">
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
            </div>
          </motion.div>
        </div>

        <div className="mt-2">
          <p className="text-[10px] tracking-wide text-fg/80" style={{ fontWeight: 400 }}>
            {project.title}
          </p>
          <p className="text-[9px] text-fg/40 mt-0.5" style={{ fontWeight: 400 }}>
            {project.client}
          </p>
        </div>
      </Link>
    </div>
  );
}

// ─── ProjectGrid ──────────────────────────────────────────────────────────────

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { canvas: CANVAS, positions: SCATTER } = buildLayout(projects.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

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
      // Normalize mouse to -1..1 from center of screen
      const nx = (e.clientX / containerSize.w  - 0.5) * 2;
      const ny = (e.clientY / containerSize.h - 0.5) * 2;
      // Mouse right → canvas slides left to reveal right content
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

  // Center the canvas in the container, then offset by mouse-driven canvasX/Y
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
          top:  -offsetY,
          x: canvasX,
          y: canvasY,
        }}
      >
        {projects.map((project, i) => (
          <FloatingCard
            key={project.id}
            project={project}
            pos={SCATTER[i]}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}
