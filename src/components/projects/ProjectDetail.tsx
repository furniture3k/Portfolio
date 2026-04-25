'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>

      {/* ── Fixed left panel (desktop only) ── */}
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
        {/* Back */}
        <motion.div variants={fadeUp} className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-fg/35 hover:text-fg transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            All work
          </Link>
        </motion.div>

        {/* Title */}
        <motion.p
          variants={fadeUp}
          className="text-[9px] tracking-[0.22em] uppercase text-fg/30 mb-3"
          style={{ fontWeight: 600 }}
        >
          {project.category.map(c => c.replace('-', ' ')).join(' · ')}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.9] tracking-[-0.03em] mb-8"
          style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        {/* Meta */}
        <motion.div variants={fadeUp} className="border-t border-fg/10 pt-6 space-y-5 mb-8">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year',   value: String(project.year) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] tracking-[0.18em] uppercase text-fg/30 mb-1" style={{ fontWeight: 600 }}>
                {label}
              </p>
              <p className="text-sm text-fg/70" style={{ fontWeight: 400 }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        {project.description && (
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-[9px] tracking-[0.18em] uppercase text-fg/30 mb-3" style={{ fontWeight: 600 }}>
              Context
            </p>
            <p className="text-sm leading-relaxed text-fg/60" style={{ fontWeight: 300 }}>
              {project.description}
            </p>
          </motion.div>
        )}

        {/* Tools */}
        {project.toolsUsed && (
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-[9px] tracking-[0.18em] uppercase text-fg/30 mb-3" style={{ fontWeight: 600 }}>
              Tools
            </p>
            <p className="text-sm text-fg/55 leading-relaxed" style={{ fontWeight: 300 }}>
              {project.toolsUsed.join(', ')}
            </p>
          </motion.div>
        )}

        {/* Tags */}
        {project.tags && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 mt-auto pt-6">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[8px] tracking-[0.14em] uppercase px-2.5 py-1.5 border border-fg/10 text-fg/30"
                style={{ fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </motion.aside>

      {/* ── Mobile info (stacked, not fixed) ── */}
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

        <motion.p variants={fadeUp} className="text-[9px] tracking-[0.22em] uppercase text-fg/30 mb-3" style={{ fontWeight: 600 }}>
          {project.category.map(c => c.replace('-', ' ')).join(' · ')}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.9] tracking-[-0.03em] mb-6"
          style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 900 }}
        >
          {project.title}
        </motion.h1>

        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 mb-6 pt-5 border-t border-fg/10">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year',   value: String(project.year) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] tracking-[0.18em] uppercase text-fg/30 mb-1" style={{ fontWeight: 600 }}>{label}</p>
              <p className="text-sm text-fg/70" style={{ fontWeight: 400 }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {project.description && (
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-fg/55" style={{ fontWeight: 300 }}>
            {project.description}
          </motion.p>
        )}
      </motion.div>

      {/* ── Scrollable images — offset by sidebar width on desktop ── */}
      <div className="md:ml-[260px] lg:ml-[300px] xl:ml-[340px]">

        {/* Hero */}
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

        {/* Gallery sections */}
        {project.sections?.map((section) => (
          <section key={section.title} className="mt-px">

            {/* Section label */}
            <div className="px-6 md:px-8 py-5 border-t border-fg/10 flex items-center gap-4">
              <span className="text-[9px] tracking-[0.24em] uppercase text-fg/30 shrink-0" style={{ fontWeight: 600 }}>
                {section.title}
              </span>
              <div className="flex-1 h-px bg-fg/8" />
            </div>

            {/* Rows with spacing between */}
            <div className="flex flex-col gap-px">
              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  className={row.length === 2 ? 'grid grid-cols-2 gap-px' : 'w-full'}
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

        {/* Footer */}
        <div className="px-6 md:px-8 py-10 border-t border-fg/10">
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
