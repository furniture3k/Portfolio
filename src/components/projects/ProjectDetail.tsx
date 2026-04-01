'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface ProjectDetailProps {
  project: Project;
}

const PLACEHOLDER_COLOR = '#E8E8E8';

export function ProjectDetail({ project }: ProjectDetailProps) {
  const hasHero = Boolean(project.heroImageUrl);

  return (
    <article>
      {/* Back navigation */}
      <div className="px-8 md:px-12 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm tracking-wider uppercase font-medium text-fg/60 hover:text-fg transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>
      </div>

      {/* Hero image */}
      <div className="w-full">
        {hasHero ? (
          <AnimatedImage
            src={project.heroImageUrl}
            alt={`${project.title} hero`}
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="w-full"
          />
        ) : (
          <div
            className="w-full"
            style={{ backgroundColor: PLACEHOLDER_COLOR, aspectRatio: '16 / 9' }}
            aria-hidden
          />
        )}
      </div>

      {/* Project info */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="px-8 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
      >
        {/* Left — title + metadata */}
        <div>
          <motion.h1
            variants={fadeUp}
            className="font-bold leading-tight tracking-tight text-fg"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            {project.title}
          </motion.h1>

          <motion.dl variants={fadeUp} className="mt-8 space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="text-fg/40 tracking-wider uppercase font-medium w-20 shrink-0">Client</dt>
              <dd className="font-medium">{project.client}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-fg/40 tracking-wider uppercase font-medium w-20 shrink-0">Year</dt>
              <dd className="font-medium">{project.year}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-fg/40 tracking-wider uppercase font-medium w-20 shrink-0">Type</dt>
              <dd className="font-medium capitalize">{project.category.join(', ')}</dd>
            </div>
            {project.toolsUsed && project.toolsUsed.length > 0 && (
              <div className="flex gap-4">
                <dt className="text-fg/40 tracking-wider uppercase font-medium w-20 shrink-0">Tools</dt>
                <dd className="font-medium">{project.toolsUsed.join(', ')}</dd>
              </div>
            )}
          </motion.dl>
        </div>

        {/* Right — description */}
        <motion.div variants={fadeUp}>
          <p className="text-base md:text-lg leading-relaxed text-fg/80">
            {project.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Gallery — additional images */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="px-8 md:px-12 pb-12 space-y-3">
          {project.gallery.map((src, i) => (
            <AnimatedImage
              key={i}
              src={src}
              alt={`${project.title} gallery image ${i + 1}`}
              width={1920}
              height={1280}
              sizes="(max-width: 1024px) 100vw, 90vw"
              className="w-full"
            />
          ))}
        </div>
      )}
    </article>
  );
}
