'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';

const EMAIL = 'joshtrow04@gmail.com';

// Fill in your actual handles/URLs
const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
];

const DISCIPLINES = [
  'Fashion Design',
  'Graphic Design',
  'Brand Identity',
  'Lookbooks & Editorials',
  'Digital Garment Creation',
  'Pattern Design',
];

export default function ContactPage() {
  return (
    <motion.div
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
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold">Contact</span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">
          Open to work
        </span>
      </motion.div>

      {/* ── Statement ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20">
        <h1
          className="text-fg leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 13rem)', fontWeight: 900 }}
        >
          LET'S MAKE
          <br />
          SOMETHING.
        </h1>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Email ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-16 md:py-20">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
          Email
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-end gap-3 text-fg hover:opacity-40 transition-opacity duration-300 break-all"
          style={{
            fontSize: 'clamp(1.4rem, 3.2vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {EMAIL}
          <ArrowUpRight
            size={28}
            className="mb-1 shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
          />
        </a>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Info grid ── */}
      <motion.div
        variants={fadeUp}
        className="px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-3 gap-12"
      >
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-6" style={{ fontWeight: 600 }}>
            Based
          </p>
          <p className="text-sm text-fg/80" style={{ fontWeight: 400 }}>Johannesburg</p>
          <p className="text-sm text-fg/35 mt-0.5" style={{ fontWeight: 300 }}>South Africa</p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-6" style={{ fontWeight: 600 }}>
            Available for
          </p>
          <ul className="space-y-2.5">
            {['Full-time roles', 'Freelance', 'Collaborations'].map((s) => (
              <li key={s} className="text-sm text-fg/80" style={{ fontWeight: 400 }}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-6" style={{ fontWeight: 600 }}>
            Socials
          </p>
          <ul className="space-y-3">
            {SOCIALS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-fg/80 hover:text-fg transition-colors duration-200"
                  style={{ fontWeight: 400 }}
                >
                  {l.label}
                  <ArrowUpRight
                    size={10}
                    className="opacity-25 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* ── Disciplines ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-16 md:py-20">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-8" style={{ fontWeight: 600 }}>
          Disciplines
        </p>
        <div className="flex flex-wrap gap-2">
          {DISCIPLINES.map((s) => (
            <span
              key={s}
              className="text-[10px] tracking-[0.14em] uppercase text-fg/50 border border-fg/12 px-4 py-2.5"
              style={{ fontWeight: 500 }}
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
