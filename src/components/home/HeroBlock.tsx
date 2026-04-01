'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { useScrambleText } from '@/hooks/useScrambleText';

export function HeroBlock() {
  const line1 = useScrambleText('JOSHUA', 100);
  const line2 = useScrambleText('TROW', 400);

  return (
    <section className="bg-accent w-full px-6 md:px-10 pt-8 pb-8 md:pt-12 md:pb-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col min-h-[40vh] md:min-h-[46vh]"
      >
        {/* Top row — small labels anchored to top corners */}
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-auto">
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-fg/60"
            style={{ fontWeight: 500 }}
          >
            Portfolio
          </span>
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-fg/60"
            style={{ fontWeight: 500 }}
          >
            2024—25
          </span>
        </motion.div>

        {/* Display name with scramble effect */}
        <motion.h1
          variants={fadeUp}
          className="text-fg leading-[0.86] tracking-[-0.04em] mt-6"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 11rem)', fontWeight: 900 }}
        >
          {line1}<br />{line2}
        </motion.h1>

        {/* Bottom row — tagline left, discipline right */}
        <motion.div
          variants={fadeUp}
          className="flex items-end justify-between mt-8 md:mt-10"
        >
          <p
            className="text-sm text-fg/60 leading-snug"
            style={{ fontWeight: 300 }}
          >
            Fashion &amp; graphic design.<br />
            Concept to execution.
          </p>
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-fg/60 text-right hidden sm:block"
            style={{ fontWeight: 500 }}
          >
            Available for<br />commissions
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
