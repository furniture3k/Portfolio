'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLenis } from '@/components/layout/SmoothScrollProvider';
import { EASE_IN_OUT } from '@/lib/motion';

export interface ZoomedImage {
  /** Shared with the thumbnail's layoutId so the sheet grows out of its place on the page */
  id: string;
  src: string;
  alt: string;
}

// Portfolio sheets are A-series landscape
const SHEET_RATIO = 2481 / 1754;

/**
 * Full-viewport view of one sheet. Mount inside <AnimatePresence> — the image
 * travels from, and back to, its thumbnail.
 */
export function Lightbox({ image, onClose }: { image: ZoomedImage; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const instance = lenis.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;

    instance?.stop();
    if (!instance) document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Single control — keep focus on it
      if (e.key === 'Tab') e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      instance?.start();
      if (!instance) document.documentElement.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [lenis, onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      data-lenis-prevent
      data-cursor="Close"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 bg-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      <motion.div
        layoutId={image.id}
        transition={{ duration: 0.75, ease: EASE_IN_OUT }}
        className="relative"
        style={{
          aspectRatio: SHEET_RATIO,
          width: `min(100vw - 2 * var(--gutter), (100dvh - 2 * var(--gutter)) * ${SHEET_RATIO})`,
        }}
      >
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
      </motion.div>

      {/* Positioned by the wrapper — .nav-link sets its own position for the underline */}
      <motion.div
        className="absolute right-gutter text-nav tracking-[-0.01em] mix-blend-difference text-white"
        style={{ top: 'calc(var(--nav-h) * 0.36)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <button ref={closeRef} type="button" onClick={onClose} className="nav-link">
          Close
        </button>
      </motion.div>
    </div>,
    document.body
  );
}
