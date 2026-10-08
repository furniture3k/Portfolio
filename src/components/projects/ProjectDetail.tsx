'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { fadeUp, staggerContainer } from '@/lib/motion';

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] leading-snug text-fg" style={{ fontWeight: 700 }}>{label}</p>
      <p className="text-[11px] leading-snug text-fg" style={{ fontWeight: 400 }}>{value}</p>
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h1 variants={fadeUp} className="text-[9px] leading-snug text-fg mb-1.5" style={{ fontWeight: 700 }}>
        {project.title}
      </motion.h1>

      <motion.div variants={fadeUp} className="space-y-4">
        <MetaBlock label="Type of work" value={project.category.map(c => c.replace('-', ' ')).join(', ')} />
        <MetaBlock label="Client" value={project.client} />
        <MetaBlock label="Year" value={String(project.year)} />
        {project.description && <MetaBlock label="Context" value={project.description} />}
        {project.toolsUsed && <MetaBlock label="Tools" value={project.toolsUsed.join(', ')} />}
      </motion.div>
    </motion.div>
  );
}

function ProjectPager({ prev, next }: { prev: Project; next: Project }) {
  const arrow = 'block p-1 text-fg/50 hover:text-fg transition-colors duration-200';
  return (
    <nav aria-label="Project navigation" className="flex items-center gap-3">
      <Link href={`/project/${prev.slug}`} aria-label={`Previous project: ${prev.title}`} className={arrow}>
        <ChevronLeft size={16} strokeWidth={1.25} />
      </Link>
      <Link href={`/project/${next.slug}`} aria-label={`Next project: ${next.title}`} className={arrow}>
        <ChevronRight size={16} strokeWidth={1.25} />
      </Link>
    </nav>
  );
}

export function ProjectDetail({ project, projects }: { project: Project; projects: Project[] }) {
  const index = projects.findIndex(p => p.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasImages = Boolean(project.heroImageUrl) || Boolean(project.sections?.length);

  return (
    <>
      {/* ── Open project: info left · images centre · pager right ── */}
      <article
        className="
          px-5 md:px-0 pt-4 md:pt-10 pb-8
          md:grid md:grid-cols-[minmax(220px,31.7%)_minmax(0,54.2%)_minmax(0,1fr)]
          md:items-start
        "
      >
        {/* Info — sticks beside the images, then scrolls away when the grid arrives */}
        <div className="flex items-start justify-between gap-6 mb-8 md:mb-0 md:block md:sticky md:top-[112px] md:pl-5 md:pr-10 lg:pr-14">
          <ProjectInfo project={project} />
          <div className="md:hidden shrink-0 -mt-1">
            <ProjectPager prev={prev} next={next} />
          </div>
        </div>

        {/* Images — one centred column, white gaps between */}
        <div className="flex flex-col gap-6 md:gap-8">
          {project.heroImageUrl && (
            <Image
              src={project.heroImageUrl}
              alt={project.title}
              width={2481}
              height={1754}
              priority
              sizes="(min-width: 768px) 54vw, 100vw"
              className="w-full block"
            />
          )}

          {project.sections?.map((section) => (
            <section key={section.title} className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-[11px] leading-snug text-fg pt-4" style={{ fontWeight: 700 }}>
                {section.title}
              </h2>

              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  className={row.length === 2 ? 'grid grid-cols-2 gap-6 md:gap-8' : 'w-full'}
                >
                  {row.map((src, ii) => (
                    <Image
                      key={ii}
                      src={src}
                      alt={`${section.title} — ${ri + 1}`}
                      width={2481}
                      height={1754}
                      sizes={row.length === 2 ? '(min-width: 768px) 27vw, 50vw' : '(min-width: 768px) 54vw, 100vw'}
                      className="w-full block"
                    />
                  ))}
                </div>
              ))}
            </section>
          ))}

          {!hasImages && (
            <div className="w-full bg-fg/5 flex items-center justify-center" style={{ aspectRatio: '4 / 3' }}>
              <span className="text-[11px] text-fg/40">Images coming soon</span>
            </div>
          )}
        </div>

        {/* Pager — top right, follows the scroll */}
        <div className="hidden md:flex justify-end sticky top-[108px] pr-6">
          <ProjectPager prev={prev} next={next} />
        </div>
      </article>

      {/* ── All work, directly underneath — the open project stays faded ── */}
      <ProjectGrid projects={projects} activeSlug={project.slug} />
    </>
  );
}
