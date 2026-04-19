'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="pb-32">

      {/* ── Header ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="px-6 md:px-10 pt-8 pb-12 md:pt-12 md:pb-16"
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/50 hover:text-fg transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={11} />
            Back
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-4"
          style={{ fontWeight: 600 }}
        >
          {project.category.map(c => c.replace('-', ' ')).join(' · ')}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.88] tracking-[-0.03em] mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 10rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-6 text-[10px] tracking-[0.18em] uppercase text-fg/40 mb-10"
          style={{ fontWeight: 500 }}
        >
          <span>{project.client}</span>
          <span>{project.year}</span>
          {project.toolsUsed && <span>{project.toolsUsed.join(' · ')}</span>}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg leading-relaxed text-fg/70 max-w-2xl"
          style={{ fontWeight: 300 }}
        >
          {project.description}
        </motion.p>

        {project.tags && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.16em] uppercase px-3 py-1.5 border border-fg/12 text-fg/50"
                style={{ fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ── Hero image ── */}
      <div className="w-full mb-2">
        <Image
          src={project.heroImageUrl}
          alt={project.title}
          width={2481}
          height={1754}
          priority
          sizes="100vw"
          className="w-full"
        />
      </div>

      {/* ── Gallery sections ── */}
      {project.sections?.map((section) => (
        <section key={section.title} className="mt-16 md:mt-24">

          {/* Section label */}
          <div className="px-6 md:px-10 mb-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-fg/10" />
            <span className="text-[9px] tracking-[0.24em] uppercase text-fg/40 shrink-0" style={{ fontWeight: 600 }}>
              {section.title}
            </span>
            <div className="flex-1 h-px bg-fg/10" />
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-1">
            {section.rows.map((row, ri) => (
              <div
                key={ri}
                className={row.length === 2 ? 'grid grid-cols-2 gap-1' : 'w-full'}
              >
                {row.map((src, ii) => (
                  <div key={ii} className="w-full overflow-hidden">
                    <Image
                      src={src}
                      alt={`${section.title} — ${ri + 1}`}
                      width={2481}
                      height={1754}
                      sizes={row.length === 2 ? '50vw' : '100vw'}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── Footer back link ── */}
      <div className="px-6 md:px-10 mt-24 pt-10 border-t border-fg/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/40 hover:text-fg transition-colors duration-200"
        >
          <ArrowLeft size={11} />
          Back to all work
        </Link>
      </div>

    </article>
  );
}
