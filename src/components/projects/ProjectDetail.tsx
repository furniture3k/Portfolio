'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';
import { fadeUp, staggerContainer } from '@/lib/motion';

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-fg" style={{ fontWeight: 700 }}>{label}</p>
      <p className="text-sm text-fg/60 mt-0.5" style={{ fontWeight: 400 }}>{value}</p>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>

      {/* ── Fixed left panel (desktop) ── */}
      <motion.aside
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        data-lenis-prevent
        className="
          hidden md:flex flex-col
          fixed top-[56px] left-0
          w-[260px] lg:w-[300px] xl:w-[340px]
          h-[calc(100vh-56px)]
          overflow-y-auto
          border-r border-fg/10
          px-7 pt-8 pb-10
          bg-bg z-10
        "
      >
        <motion.div variants={fadeUp} className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/35 hover:text-fg transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            All work
          </Link>
        </motion.div>

        {/* Project name */}
        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.92] tracking-[-0.025em] mb-8"
          style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        {/* Meta blocks — bold label, regular value, like Specht */}
        <motion.div variants={fadeUp} className="space-y-5 mb-8">
          <MetaBlock label="Type of work" value={project.category.map(c => c.replace('-', ' ')).join(', ')} />
          <MetaBlock label="Client" value={project.client} />
          <MetaBlock label="Year" value={String(project.year)} />
        </motion.div>

        {project.description && (
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-sm text-fg mb-2" style={{ fontWeight: 700 }}>Context</p>
            <p className="text-sm leading-relaxed text-fg/60" style={{ fontWeight: 400 }}>
              {project.description}
            </p>
          </motion.div>
        )}

        {project.toolsUsed && (
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-sm text-fg mb-2" style={{ fontWeight: 700 }}>Tools</p>
            <p className="text-sm text-fg/60 leading-relaxed" style={{ fontWeight: 400 }}>
              {project.toolsUsed.join(', ')}
            </p>
          </motion.div>
        )}

        {project.tags && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 mt-auto pt-6 border-t border-fg/8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.12em] uppercase px-2.5 py-1.5 border border-fg/12 text-fg/35"
                style={{ fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </motion.aside>

      {/* ── Mobile info (stacked) ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="md:hidden px-6 pt-8 pb-10 border-b border-fg/10"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/35 hover:text-fg transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            All work
          </Link>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.9] tracking-[-0.03em] mb-8"
          style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        <motion.div variants={fadeUp} className="space-y-5 mb-6">
          <MetaBlock label="Type of work" value={project.category.map(c => c.replace('-', ' ')).join(', ')} />
          <MetaBlock label="Client" value={project.client} />
          <MetaBlock label="Year" value={String(project.year)} />
        </motion.div>

        {project.description && (
          <motion.div variants={fadeUp}>
            <p className="text-sm text-fg mb-2" style={{ fontWeight: 700 }}>Context</p>
            <p className="text-sm leading-relaxed text-fg/60" style={{ fontWeight: 400 }}>{project.description}</p>
          </motion.div>
        )}
      </motion.div>

      {/* ── Scrollable images ── */}
      <div className="md:ml-[260px] lg:ml-[300px] xl:ml-[340px]">

        {project.heroImageUrl && (
          <div className="w-full">
            <Image
              src={project.heroImageUrl}
              alt={project.title}
              width={2481}
              height={1754}
              priority
              sizes="(min-width: 768px) calc(100vw - 300px), 100vw"
              className="w-full block"
            />
          </div>
        )}

        {project.sections?.map((section) => (
          <section key={section.title}>

            {/* Section label */}
            <div className="px-6 md:px-8 pt-10 pb-4 flex items-center gap-4">
              <span className="text-[9px] tracking-[0.22em] uppercase text-fg/30 shrink-0" style={{ fontWeight: 600 }}>
                {section.title}
              </span>
              <div className="flex-1 h-px bg-fg/10" />
            </div>

            {/* Image rows with visible white gaps */}
            <div className="flex flex-col gap-4 px-0">
              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  className={row.length === 2 ? 'grid grid-cols-2 gap-4' : 'w-full'}
                >
                  {row.map((src, ii) => (
                    <div key={ii} className="w-full overflow-hidden">
                      <Image
                        src={src}
                        alt={`${section.title} — ${ri + 1}`}
                        width={2481}
                        height={1754}
                        sizes={
                          row.length === 2
                            ? '(min-width: 768px) calc((100vw - 300px) / 2), 50vw'
                            : '(min-width: 768px) calc(100vw - 300px), 100vw'
                        }
                        className="w-full block"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </section>
        ))}

        <div className="px-6 md:px-8 py-12 mt-8 border-t border-fg/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/30 hover:text-fg transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            Back to all work
          </Link>
        </div>

      </div>
    </article>
  );
}
