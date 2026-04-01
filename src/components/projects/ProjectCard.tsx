'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { clipReveal } from '@/lib/motion';

const DIMENSIONS: Record<Project['aspectRatio'], { width: number; height: number }> = {
  portrait:  { width: 800,  height: 1067 },
  landscape: { width: 1200, height: 800  },
  square:    { width: 900,  height: 900  },
};

const PLACEHOLDER_COLORS = [
  '#1a1a1a', '#222222', '#2a2a2a', '#1f1f1f',
  '#252525', '#1c1c1c', '#202020', '#272727',
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const inViewRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(inViewRef, { once: true, amount: 0.08 });

  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  // ── 3D tilt ───────────────────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  const liftY   = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const shadow  = useTransform(
    liftY,
    [0, -12],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 24px 48px rgba(0,0,0,0.28)']
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
    liftY.set(-12);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    liftY.set(0);
  }

  const imageVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } }
    : clipReveal;

  return (
    <div ref={inViewRef}>
      <Link
        href={`/projects/${project.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-fg group"
        aria-label={`View ${project.title}`}
      >
        {/* Image */}
        <div style={{ perspective: 900 }}>
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : { rotateX, rotateY, y: liftY, boxShadow: shadow, transformStyle: 'preserve-3d' }
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="will-change-transform"
          >
            <motion.div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: `${width} / ${height}` }}
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {hasImage ? (
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  width={width}
                  height={height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div
                  style={{ backgroundColor: placeholderColor }}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                  aria-hidden
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Caption — always visible below image */}
        <div className="mt-3">
          <p className="text-sm text-fg/90 leading-snug" style={{ fontWeight: 400 }}>
            {project.title}
          </p>
          <p className="text-xs text-fg/40 mt-0.5 tracking-wide" style={{ fontWeight: 400 }}>
            {project.client}
          </p>
        </div>
      </Link>
    </div>
  );
}
