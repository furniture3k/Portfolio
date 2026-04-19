'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';

const SKILLS = [
  'Trend Research',
  'Concept Development',
  'Garment Construction',
  'Pattern Design',
  'Technical Drawing',
  'Presentation Boards & Lookbooks',
];

const SOFTWARE = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Browzwear VStitcher',
  'Procreate',
];

const EDUCATION = [
  {
    degree: 'BA Fashion Design',
    institution: 'STADIO School of Fashion',
    period: '2023 – 2025',
    note: 'Distinction in Fashion Technology, Garment Construction, Pattern Design, and Computer Literacy and Design',
  },
];

export default function AboutPage() {
  return (
    <motion.article
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="pb-32"
    >
      {/* ── Header bar ── */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between px-6 md:px-10 py-8 border-b border-fg/10"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold">About</span>
        <span className="hidden sm:block text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">
          Johannesburg, ZA &mdash; Available for work
        </span>
        <span className="sm:hidden text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">JHB, ZA</span>
      </motion.div>

      {/* ── Name hero ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20">
        <p
          className="text-[10px] tracking-[0.22em] uppercase text-fg/35 mb-7"
          style={{ fontWeight: 600 }}
        >
          Fashion Designer · Graphic Designer · Creative
        </p>
        <h1
          className="text-fg leading-[0.86] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(4.5rem, 13vw, 15rem)', fontWeight: 900 }}
        >
          JOSHUA
          <br />
          TROW
        </h1>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Bio ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-16 md:py-20 max-w-3xl">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
          Profile
        </p>
        <p
          className="text-xl md:text-2xl leading-snug text-fg/85 tracking-[-0.015em]"
          style={{ fontWeight: 300 }}
        >
          Fashion design graduate with a strong technical foundation in garment construction,
          digital design, and trend forecasting — balancing considered silhouettes with urban,
          edgy elements to create deliberate, evolving work.
        </p>
        <p
          className="text-base md:text-lg leading-relaxed text-fg/50 mt-6"
          style={{ fontWeight: 300 }}
        >
          My practice moves between physical making and digital tools — spanning garment
          construction, surface pattern design, digital fashion, and illustration with equal comfort.
        </p>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Skills + Software ── */}
      <motion.div
        variants={fadeUp}
        className="px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-16"
      >
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
            Skills
          </p>
          <ul>
            {SKILLS.map((s, i) => (
              <li
                key={s}
                className="flex items-baseline gap-5 border-b border-fg/10 py-4 last:border-0"
              >
                <span className="text-[9px] text-fg/20 tabular-nums shrink-0" style={{ fontWeight: 500 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-fg/80" style={{ fontWeight: 400 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
            Software
          </p>
          <ul>
            {SOFTWARE.map((s, i) => (
              <li
                key={s}
                className="flex items-baseline gap-5 border-b border-fg/10 py-4 last:border-0"
              >
                <span className="text-[9px] text-fg/20 tabular-nums shrink-0" style={{ fontWeight: 500 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-fg/80" style={{ fontWeight: 400 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Education ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-16 md:py-20">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
          Education
        </p>
        {EDUCATION.map((e) => (
          <div
            key={e.degree}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-20 py-6 border-b border-fg/10 last:border-0"
          >
            <div>
              <p className="text-base text-fg/90 tracking-[-0.01em]" style={{ fontWeight: 600 }}>
                {e.degree}
              </p>
              <p className="text-xs text-fg/45 mt-1" style={{ fontWeight: 400 }}>{e.institution}</p>
              {e.note && (
                <p className="text-xs text-fg/30 mt-4 max-w-lg leading-relaxed" style={{ fontWeight: 300 }}>
                  {e.note}
                </p>
              )}
            </div>
            <p
              className="text-[10px] tracking-[0.15em] uppercase text-fg/30 md:text-right shrink-0 mt-0.5"
              style={{ fontWeight: 500 }}
            >
              {e.period}
            </p>
          </div>
        ))}
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── CTA ── */}
      <motion.div
        variants={fadeUp}
        className="px-6 md:px-10 py-16 md:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
      >
        <p className="text-sm text-fg/45 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
          Open to full-time roles, freelance commissions, and creative collaborations.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-fg border border-fg/20 px-6 py-3.5 hover:bg-fg hover:text-bg transition-colors duration-200 shrink-0"
        >
          Get in touch
          <ArrowUpRight size={10} />
        </Link>
      </motion.div>
    </motion.article>
  );
}
