'use client';

import { motion } from 'framer-motion';
import type { Metadata } from 'next';
import { fadeUp, staggerContainer } from '@/lib/motion';

// Note: metadata export must be in a server component.
// Move to a separate layout.tsx in /about/ if SEO is needed later.

const DISCIPLINES = [
  'Fashion Design',
  'Editorial Photography',
  'Graphic Design',
  'Brand Identity',
  'Art Direction',
  'Print Design',
  'Web Design',
  'Typography',
];

export default function AboutPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="px-8 md:px-12 pt-12 md:pt-16"
    >
      {/* Display headline */}
      <motion.h1
        variants={fadeUp}
        className="font-bold leading-[0.92] tracking-tight text-fg"
        style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}
      >
        Joshua<br />Trow
      </motion.h1>

      {/* Two-column layout */}
      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12">
        {/* Left — bio */}
        <motion.div variants={fadeUp} className="space-y-5">
          <p className="text-base md:text-lg leading-relaxed text-fg/80">
            I'm a multi-disciplinary creative based in — working across
            fashion, graphic design, branding, and photography.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-fg/80">
            My practice moves between the physical and digital: from garment
            construction and editorial shoots to visual identities and print
            systems. I'm drawn to work that has a clear point of view and an
            honest relationship with its materials.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-fg/80">
            Available for commissions, collaborations, and select freelance
            projects.
          </p>
        </motion.div>

        {/* Right — disciplines */}
        <motion.div variants={fadeUp}>
          <p className="text-xs tracking-widest uppercase font-medium text-fg/40 mb-4">
            Disciplines
          </p>
          <ul className="space-y-2">
            {DISCIPLINES.map((d) => (
              <li key={d} className="text-base md:text-lg font-medium border-b border-fg/10 pb-2 last:border-0">
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
