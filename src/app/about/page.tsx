'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

const DESIGN_SKILLS = [
  'Trend Research',
  'Concept Development',
  'Garment Construction',
  'Pattern Design',
  'Technical Drawing',
  'Presentation Boards & Lookbooks',
];

const SOFTWARE_SKILLS = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Browzwear VStitcher',
  'Computer Aided Design',
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
    >
      {/* Page header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between px-6 md:px-10 py-8 border-b border-fg/10"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold">About</span>
        <span className="hidden sm:block text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">
          Johannesburg, ZA &mdash; Available for commissions
        </span>
        <span className="sm:hidden text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">
          JHB, ZA
        </span>
      </motion.div>

      {/* Bio */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-12 md:py-16 max-w-2xl">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-5" style={{ fontWeight: 600 }}>
          Profile
        </p>
        <div className="space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            Fashion design graduate with a strong technical foundation in garment construction,
            digital design, and trend forecasting. My work balances considered silhouettes and
            precise construction with function — incorporating urban, edgy elements to create
            deliberate, evolving garments.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            My practice spans garment construction, digital fashion, surface pattern design,
            and illustration — moving between physical and digital making with equal comfort.
          </p>
        </div>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* Skills */}
      <motion.div
        variants={fadeUp}
        className="px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-5" style={{ fontWeight: 600 }}>
            Design Skills
          </p>
          <ul>
            {DESIGN_SKILLS.map((s) => (
              <li
                key={s}
                className="text-sm text-fg/80 border-b border-fg/10 py-3 last:border-0"
                style={{ fontWeight: 400 }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-5" style={{ fontWeight: 600 }}>
            Software
          </p>
          <ul>
            {SOFTWARE_SKILLS.map((s) => (
              <li
                key={s}
                className="text-sm text-fg/80 border-b border-fg/10 py-3 last:border-0"
                style={{ fontWeight: 400 }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* Education */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-6" style={{ fontWeight: 600 }}>
          Education
        </p>
        {EDUCATION.map((e) => (
          <div
            key={e.degree}
            className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-fg/10 py-5 last:border-0 gap-2 md:gap-8"
          >
            <div>
              <p className="text-sm font-semibold text-fg/90 tracking-[-0.01em]">{e.degree}</p>
              <p className="text-xs text-fg/50 mt-0.5" style={{ fontWeight: 400 }}>{e.institution}</p>
              {e.note && (
                <p className="text-xs text-fg/40 mt-2 max-w-sm leading-relaxed" style={{ fontWeight: 400 }}>
                  {e.note}
                </p>
              )}
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-fg/40 md:text-right shrink-0" style={{ fontWeight: 500 }}>
              {e.period}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.article>
  );
}
