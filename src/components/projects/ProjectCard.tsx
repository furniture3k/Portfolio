'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { clipReveal, fadeUp } from '@/lib/motion';

// Pixel dimensions per aspect ratio — drives next/image width & height props
const DIMENSIONS: Record<Project['aspectRatio'], { width: number; height: number }> = {
  portrait:  { width: 800,  height: 1067 },
  landscape: { width: 1200, height: 800  },
  square:    { width: 900,  height: 900  },
};

// Placeholder background colours cycle for empty thumbnails
const PLACEHOLDER_COLORS = [
  '#E8E8E8', '#D4D4D4', '#C8C8C8', '#BEBEBE',
  '#B4B4B4', '#ABABAB', '#A0A0A0', '#979797',
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const imageVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } }
    : clipReveal;

  return (
    <div ref={ref} className="break-inside-avoid mb-3">
      <Link
        href={`/projects/${project.slug}`}
        className="group/card block outline-none focus-visible:ring-2 focus-visible:ring-fg"
        aria-label={`View ${project.title}`}
      >
        {/* Image / placeholder */}
        <motion.div
          className="overflow-hidden"
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover/card:scale-[1.02]"
            />
          ) : (
            // Placeholder rectangle — preserves aspect ratio without a real image
            <div
              style={{
                backgroundColor: placeholderColor,
                aspectRatio: `${width} / ${height}`,
              }}
              className="w-full transition-transform duration-700 group-hover/card:scale-[1.02]"
              aria-hidden
            />
          )}
        </motion.div>

        {/* Meta — client + title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-2 px-0.5"
        >
          <p className="text-xs tracking-widest uppercase text-fg/50 font-medium">
            {project.client}
          </p>
          <h2 className="text-base font-semibold leading-snug mt-0.5">
            {project.title}
          </h2>
        </motion.div>
      </Link>
    </div>
  );
}
