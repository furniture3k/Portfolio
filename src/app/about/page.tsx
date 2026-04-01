'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { useScrambleText } from '@/hooks/useScrambleText';

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
  const line1 = useScrambleText('JOSHUA', 100);
  const line2 = useScrambleText('TROW', 400);

  return (
    <article>
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="px-8 md:px-12 pt-10 pb-10 md:pt-14 md:pb-14"
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] tracking-[0.22em] uppercase text-fg/60 mb-4"
          style={{ fontWeight: 600 }}
        >
          About &nbsp;/&nbsp; Designer
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.86] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3.5rem, 7vw, 9rem)', fontWeight: 900 }}
        >
          {line1}<br />{line2}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-8 mt-8 md:mt-10 text-xs tracking-[0.14em] uppercase text-fg/60"
          style={{ fontWeight: 500 }}
        >
          <span>Johannesburg, South Africa</span>
          <span>STADIO School of Fashion</span>
          <span>Available for commissions</span>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-fg/10 mx-8 md:mx-12" />

      {/* Bio */}
      <div className="px-8 md:px-12 py-14 md:py-20 max-w-3xl">
        <p
          className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-6"
          style={{ fontWeight: 600 }}
        >
          Profile
        </p>
        <div className="space-y-5">
          <p className="text-lg md:text-xl leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            Fashion design graduate with a strong technical foundation in garment construction,
            digital design, and trend forecasting. My work balances considered silhouettes and
            precise construction with function — incorporating urban, edgy elements to create
            deliberate, evolving garments.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-fg/80" style={{ fontWeight: 300 }}>
            My practice spans garment construction, digital fashion, surface pattern design,
            and illustration — moving between physical and digital making with equal comfort.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-fg/10 mx-8 md:mx-12" />

      {/* Skills */}
      <div className="px-8 md:px-12 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-6"
            style={{ fontWeight: 600 }}
          >
            Design Skills
          </p>
          <ul>
            {DESIGN_SKILLS.map((s) => (
              <li
                key={s}
                className="text-sm md:text-base font-medium text-fg/80 border-b border-fg/10 py-3 last:border-0"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-6"
            style={{ fontWeight: 600 }}
          >
            Software
          </p>
          <ul>
            {SOFTWARE_SKILLS.map((s) => (
              <li
                key={s}
                className="text-sm md:text-base font-medium text-fg/80 border-b border-fg/10 py-3 last:border-0"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-fg/10 mx-8 md:mx-12" />

      {/* Education */}
      <div className="px-8 md:px-12 py-14 md:py-20">
        <p
          className="text-[10px] tracking-[0.22em] uppercase text-fg/40 mb-8"
          style={{ fontWeight: 600 }}
        >
          Education
        </p>
        <div className="space-y-0">
          {EDUCATION.map((e) => (
            <div
              key={e.degree}
              className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-fg/10 py-6 last:border-0 gap-2 md:gap-8"
            >
              <div>
                <p className="text-base font-semibold text-fg/90 tracking-[-0.01em]">{e.degree}</p>
                <p className="text-sm text-fg/50 mt-0.5" style={{ fontWeight: 400 }}>{e.institution}</p>
                {e.note && (
                  <p className="text-xs text-fg/40 mt-2 max-w-sm leading-relaxed" style={{ fontWeight: 400 }}>
                    {e.note}
                  </p>
                )}
              </div>
              <p
                className="text-xs tracking-[0.14em] uppercase text-fg/40 md:text-right shrink-0"
                style={{ fontWeight: 500 }}
              >
                {e.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
