'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

const EMAIL = 'joshtrow04@gmail.com';

export default function ContactPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Page header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between px-6 md:px-10 py-8 border-b border-fg/10"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold">Contact</span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-fg/40 font-medium">
          Open to work
        </span>
      </motion.div>

      {/* Email */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-5" style={{ fontWeight: 600 }}>
          Get in touch
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="text-fg font-semibold leading-none tracking-tight hover:opacity-40 transition-opacity duration-200 break-all"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
        >
          {EMAIL}
        </a>
      </motion.div>

      <div className="border-t border-fg/10 mx-6 md:mx-10" />

      {/* Availability */}
      <motion.div variants={fadeUp} className="px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] tracking-[0.2em] uppercase text-fg/40 mb-5" style={{ fontWeight: 600 }}>
          Availability
        </p>
        <p className="text-sm text-fg/80 leading-relaxed" style={{ fontWeight: 300 }}>
          Available for freelance commissions, collaborations, and full-time opportunities
          in fashion design, graphic design, and digital product creation.
        </p>
      </motion.div>
    </motion.div>
  );
}
