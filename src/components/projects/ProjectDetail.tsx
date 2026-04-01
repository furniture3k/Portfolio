'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { projects } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const hasHero = Boolean(project.heroImageUrl);
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      {/* Full-bleed title section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="bg-accent px-8 md:px-12 pt-10 pb-10 md:pt-14 md:pb-14"
      >
        {/* Back link */}
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/60 hover:text-fg transition-colors duration-200 mb-10 md:mb-14"
          >
            <ArrowLeft size={12} />
            All Projects
          </Link>
        </motion.div>

        {/* Project number + category */}
        <motion.p
          variants={fadeUp}
          className="text-[10px] tracking-[0.22em] uppercase text-fg/60 mb-4"
          style={{ fontWeight: 600 }}
        >
          {String(currentIndex + 1).padStart(2, '0')} &nbsp;/&nbsp; {project.category[0].replace('-', ' ')}
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.86] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 9rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-8 mt-8 md:mt-10 text-xs tracking-[0.14em] uppercase text-fg/60"
          style={{ fontWeight: 500 }}
        >
          <span>{project.client}</span>
          <span>{project.year}</span>
          {project.toolsUsed && <span>{project.toolsUsed.join(' · ')}</span>}
        </motion.div>
      </motion.div>

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
            className="w-full bg-fg/5"
            style={{ aspectRatio: '16 / 9' }}
            aria-hidden
          />
        )}
      </div>

      {/* Description */}
      <div className="px-8 md:px-12 py-14 md:py-20 max-w-3xl">
        <p
          className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-6"
          style={{ fontWeight: 600 }}
        >
          About the project
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 border border-fg/15 text-fg/60"
                style={{ fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Gallery */}
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

      {/* Next project */}
      <div className="border-t border-fg/10 mx-8 md:mx-12" />
      <Link
        href={`/projects/${nextProject.slug}`}
        className="group flex items-center justify-between px-8 md:px-12 py-10 md:py-14 hover:bg-fg/[0.02] transition-colors duration-300"
      >
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-2" style={{ fontWeight: 600 }}>
            Next Project
          </p>
          <p
            className="text-fg leading-tight tracking-[-0.02em] group-hover:text-accent transition-colors duration-300"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 3rem)', fontWeight: 800 }}
          >
            {nextProject.title}
          </p>
        </div>
        <ArrowRight
          size={24}
          className="text-fg/30 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300"
        />
      </Link>
    </article>
  );
}
