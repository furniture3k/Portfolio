'use client';

import { motion } from 'framer-motion';
import { pageEnter } from '@/lib/motion';

/**
 * template.tsx remounts on every navigation in Next.js App Router,
 * giving Framer Motion a fresh mount for each page transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageEnter}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
