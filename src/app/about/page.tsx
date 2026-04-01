'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

const TECHNICAL_SKILLS = [
  'Photoshop',
  'Illustrator',
  'Procreate',
  'Pattern Making',
  'Browzwear VStitcher',
];

const SOFT_SKILLS = [
  'Adaptability',
  'Focused',
  'Deadline-Driven',
  'Creative',
  'Detail-Oriented',
];

export default function AboutPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="px-8 md:px-12 pt-12 md:pt-16 pb-12"
    >
      {/* Display headline */}
      <motion.h1
        variants={fadeUp}
        className="leading-[0.88] tracking-[-0.03em] text-fg"
        style={{ fontSize: 'clamp(3rem, 8vw, 10rem)', fontWeight: 900 }}
      >
        Joshua<br />Trow
      </motion.h1>

      {/* Education / origin line */}
      <motion.p
        variants={fadeUp}
        className="mt-4 text-xs tracking-[0.14em] uppercase text-fg/40"
        style={{ fontWeight: 500 }}
      >
        South Africa &nbsp;/&nbsp; STADIO School of Fashion
      </motion.p>

      {/* Bio + skills grid */}
      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* Left — bio */}
        <motion.div variants={fadeUp} className="space-y-5">
          <p className="text-base md:text-lg leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            I am a fashion design graduate focused on modern, experimental design.
            My work balances simple silhouettes and technical construction with function,
            incorporating urban, edgy elements to create deliberate, evolving garments.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            My practice spans garment construction, digital fashion, surface pattern
            design, and illustration — moving between physical and digital making
            with equal comfort.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            Available for commissions, collaborations, and select freelance projects.
          </p>
        </motion.div>

        {/* Right — skills */}
        <motion.div variants={fadeUp} className="space-y-8">
          {/* Technical */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-fg/40 mb-3" style={{ fontWeight: 600 }}>
              Technical Skills
            </p>
            <ul className="space-y-2">
              {TECHNICAL_SKILLS.map((s) => (
                <li
                  key={s}
                  className="text-sm md:text-base font-medium border-b border-fg/10 pb-2 last:border-0"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Soft */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-fg/40 mb-3" style={{ fontWeight: 600 }}>
              Approach
            </p>
            <ul className="space-y-2">
              {SOFT_SKILLS.map((s) => (
                <li
                  key={s}
                  className="text-sm md:text-base font-medium border-b border-fg/10 pb-2 last:border-0"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
