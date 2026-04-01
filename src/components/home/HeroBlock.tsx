'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function HeroBlock() {
  return (
    <section className="bg-accent w-full px-8 md:px-12 pt-12 pb-10 md:pt-16 md:pb-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-between min-h-[38vh] md:min-h-[44vh]"
      >
        {/* Display name — fills the viewport width */}
        <motion.h1
          variants={fadeUp}
          className="font-bold leading-[0.9] tracking-tight text-fg"
          style={{ fontSize: 'clamp(4.5rem, 11vw, 13rem)' }}
        >
          Joshua Trow
        </motion.h1>

        {/* Tagline — bottom left */}
        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base font-normal text-fg/80 max-w-sm leading-snug mt-6"
        >
          Fashion &amp; graphic design.<br />
          Concept to execution.
        </motion.p>
      </motion.div>
    </section>
  );
}
