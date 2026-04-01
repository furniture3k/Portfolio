'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { useScrambleText } from '@/hooks/useScrambleText';

const EMAIL = 'joshtrow04@gmail.com';

export default function ContactPage() {
  const line1 = useScrambleText('OPEN TO', 100);
  const line2 = useScrambleText('WORK.', 400);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="px-8 md:px-12 pt-12 md:pt-16 pb-12 min-h-[60vh] flex flex-col justify-between"
    >
      {/* Display headline */}
      <motion.h1
        variants={fadeUp}
        className="font-bold leading-[0.92] tracking-tight text-fg"
        style={{ fontSize: 'clamp(3.5rem, 7vw, 9rem)' }}
      >
        {line1}<br />{line2}
      </motion.h1>

      {/* Email as large display link */}
      <motion.div variants={fadeUp} className="mt-12 md:mt-0">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block font-semibold text-fg hover:text-accent transition-colors duration-300 leading-none tracking-tight break-all"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4rem)' }}
        >
          {EMAIL}
        </a>
      </motion.div>

      {/* Availability note */}
      <motion.p
        variants={fadeUp}
        className="mt-10 text-sm text-fg/50 tracking-wider uppercase font-medium"
      >
        Available for commissions &amp; collaborations
      </motion.p>
    </motion.div>
  );
}
