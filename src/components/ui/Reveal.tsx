'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE_IN_OUT, EASE_OUT_EXPO } from '@/lib/motion';

const VIEWPORT = { once: true, margin: '0px 0px -8% 0px' } as const;

/** Content that eases in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Hairline that draws itself from the left as it enters view. */
export function Rule({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`h-px bg-fg/15 origin-left ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE_IN_OUT }}
    />
  );
}

/** Image wrapper that unmasks bottom-to-top while the picture settles from a slight zoom. */
export function RevealImage({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Observe an unclipped wrapper — a fully clipped element never reports as in view
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="overflow-hidden"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: inView ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: 1.1, ease: EASE_IN_OUT }}
      >
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: inView ? 1 : 1.18 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
