import type { Variants } from 'framer-motion';

// ─── Shared Easings ──────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT   = [0.76, 0, 0.24, 1] as const;

// ─── Shared Variants ─────────────────────────────────────────────────────────

/** Fade + slide up — used for text blocks, hero labels */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Staggered container — wraps fadeUp children */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Clip-path bottom-to-top image reveal with subtle scale */
export const clipReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    scale: 1.08,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 0.9, ease: EASE_IN_OUT },
  },
};

/** Page enter — used in template.tsx */
export const pageEnter: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};
