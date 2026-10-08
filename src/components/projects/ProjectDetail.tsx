'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { Lightbox, type ZoomedImage } from '@/components/projects/Lightbox';
import { RevealImage } from '@/components/ui/Reveal';
import { useLenis } from '@/components/layout/SmoothScrollProvider';

const sectionId = (i: number) => `section-${i + 1}`;

function MetaBlock({ label, value, i }: { label: string; value: string; i: number }) {
  return (
    <div className="line" style={{ '--i': i } as React.CSSProperties}>
      <span>
        <span className="block" style={{ fontWeight: 700 }}>{label}</span>
        <span className="block" style={{ fontWeight: 400 }}>{value}</span>
      </span>
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  const meta = [
    { label: 'Type of work', value: project.category.map(c => c.replace('-', ' ')).join(', ') },
    { label: 'Client', value: project.client },
    { label: 'Year', value: String(project.year) },
    ...(project.description ? [{ label: 'Context', value: project.description }] : []),
    ...(project.toolsUsed ? [{ label: 'Tools', value: project.toolsUsed.join(', ') }] : []),
  ];

  return (
    <div className="text-meta leading-snug text-fg max-w-[46ch]">
      <h1 className="line mb-[1.1em]" style={{ fontWeight: 700 }}>
        <span>{project.title}</span>
      </h1>
      <div className="space-y-[1.1em]">
        {meta.map((m, i) => (
          <MetaBlock key={m.label} label={m.label} value={m.value} i={i + 1} />
        ))}
      </div>
    </div>
  );
}

/** Jump list for the project's sections — follows the scroll on desktop */
function SectionNav({ titles }: { titles: string[] }) {
  const lenis = useLenis();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A band across the upper-middle of the viewport decides which section is "current"
      { rootMargin: '-35% 0px -55% 0px' }
    );
    titles.forEach((_, i) => {
      const el = document.getElementById(sectionId(i));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [titles]);

  function jump(i: number) {
    const el = document.getElementById(sectionId(i));
    if (!el) return;
    const offset = -parseFloat(getComputedStyle(el).scrollMarginTop || '0');
    if (lenis.current) lenis.current.scrollTo(el, { offset, duration: 1.4 });
    else el.scrollIntoView({ block: 'start' });
  }

  return (
    <nav aria-label="Project sections" className="chrome-enter hidden md:block mt-[2.6em] text-meta leading-snug">
      <ul className="list-none p-0 m-0 space-y-[0.35em]">
        {titles.map((title, i) => (
          <li key={title}>
            <button
              type="button"
              onClick={() => jump(i)}
              aria-current={active === i ? 'true' : undefined}
              className={[
                'text-left transition-opacity duration-500 hover:opacity-100',
                active === i ? 'opacity-100' : 'opacity-35',
              ].join(' ')}
              style={{ fontWeight: active === i ? 700 : 400 }}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProjectPager({ prev, next }: { prev: Project; next: Project }) {
  const arrow = 'block p-1 text-fg/50 hover:text-fg transition-colors duration-200';
  return (
    <nav aria-label="Project navigation" className="chrome-enter flex items-center gap-3">
      <Link
        href={`/project/${prev.slug}`}
        aria-label={`Previous project: ${prev.title}`}
        data-cursor={prev.title}
        className={arrow}
      >
        <ChevronLeft className="size-[1.45em]" strokeWidth={1.25} />
      </Link>
      <Link
        href={`/project/${next.slug}`}
        aria-label={`Next project: ${next.title}`}
        data-cursor={next.title}
        className={arrow}
      >
        <ChevronRight className="size-[1.45em]" strokeWidth={1.25} />
      </Link>
    </nav>
  );
}

/** One portfolio sheet — reveals on scroll, zooms to full screen on click */
function Sheet({
  image,
  sizes,
  preload,
  onZoom,
}: {
  image: ZoomedImage;
  sizes: string;
  preload?: boolean;
  onZoom: (image: ZoomedImage) => void;
}) {
  const picture = (
    <motion.button
      type="button"
      layoutId={image.id}
      onClick={() => onZoom(image)}
      data-cursor="Zoom"
      aria-label={`Zoom in: ${image.alt}`}
      className="block w-full bg-fg/5"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={2481}
        height={1754}
        preload={preload}
        sizes={sizes}
        className="w-full h-auto block"
      />
    </motion.button>
  );

  // The first sheet is the LCP — it reveals with CSS so it never waits on hydration
  if (preload) {
    return (
      <div className="unmask overflow-hidden">
        <div className="settle">{picture}</div>
      </div>
    );
  }
  return <RevealImage>{picture}</RevealImage>;
}

export function ProjectDetail({ project, projects }: { project: Project; projects: Project[] }) {
  const index = projects.findIndex(p => p.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasImages = Boolean(project.heroImageUrl) || Boolean(project.sections?.length);

  const [zoomed, setZoomed] = useState<ZoomedImage | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);

  const FULL = '(min-width: 768px) 54vw, 100vw';
  const HALF = '(min-width: 768px) 27vw, 50vw';

  return (
    <>
      {/* ── Open project: info left · images centre · pager right ── */}
      <article
        className="
          px-gutter md:px-0 pt-4 md:pt-10 pb-8 md:pb-[4vw] text-meta
          md:grid md:grid-cols-[minmax(220px,31.7%)_minmax(0,54.2%)_minmax(0,1fr)]
          md:items-start
        "
      >
        {/* Info — sticks beside the images, then scrolls away when the grid arrives */}
        <div
          className="
            flex items-start justify-between gap-6 mb-8 md:mb-0 md:block
            md:pl-gutter md:pr-10 lg:pr-14
            md:[@media(min-height:560px)]:sticky md:top-[calc(var(--nav-h)+2.5rem)]
          "
        >
          <div>
            <ProjectInfo project={project} />
            {project.sections && project.sections.length > 1 && (
              <SectionNav titles={project.sections.map(s => s.title)} />
            )}
          </div>
          <div className="md:hidden shrink-0 -mt-1">
            <ProjectPager prev={prev} next={next} />
          </div>
        </div>

        {/* Images — one centred column, white gaps between */}
        <div className="flex flex-col gap-[clamp(1rem,1.7vw,4rem)]">
          {project.heroImageUrl && (
            <Sheet
              image={{ id: 'sheet-hero', src: project.heroImageUrl, alt: project.title }}
              sizes={FULL}
              preload
              onZoom={setZoomed}
            />
          )}

          {project.sections?.map((section, si) => (
            <section
              key={section.title}
              id={sectionId(si)}
              data-index={si}
              className="flex flex-col gap-[clamp(1rem,1.7vw,4rem)] scroll-mt-[calc(var(--nav-h)+1rem)]"
            >
              <h2 className="leading-snug text-fg pt-[1.4em]" style={{ fontWeight: 700 }}>
                {section.title}
              </h2>

              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  className={row.length === 2 ? 'grid grid-cols-2 gap-[clamp(1rem,1.7vw,4rem)]' : 'w-full'}
                >
                  {row.map((src, ii) => (
                    <Sheet
                      key={ii}
                      image={{
                        id: `sheet-${si}-${ri}-${ii}`,
                        src,
                        alt: `${section.title}, sheet ${ri + 1}${row.length === 2 ? (ii === 0 ? 'a' : 'b') : ''}`,
                      }}
                      sizes={row.length === 2 ? HALF : FULL}
                      onZoom={setZoomed}
                    />
                  ))}
                </div>
              ))}
            </section>
          ))}

          {!hasImages && (
            <div className="unmask w-full bg-fg/5 flex items-center justify-center" style={{ aspectRatio: '4 / 3' }}>
              <span className="text-fg/40">Images coming soon</span>
            </div>
          )}
        </div>

        {/* Pager — top right, follows the scroll */}
        <div className="hidden md:flex justify-end sticky top-[calc(var(--nav-h)+2.25rem)] pr-gutter">
          <ProjectPager prev={prev} next={next} />
        </div>
      </article>

      <AnimatePresence>
        {zoomed && <Lightbox key="lightbox" image={zoomed} onClose={closeZoom} />}
      </AnimatePresence>

      {/* ── All work, directly underneath — the open project stays faded ── */}
      <ProjectGrid projects={projects} activeSlug={project.slug} />
    </>
  );
}
