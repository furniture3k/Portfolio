'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SPRING = { stiffness: 500, damping: 36, mass: 0.6 };

/**
 * A dot that inverts whatever it passes over. It swells over anything
 * clickable, and over elements with a `data-cursor="…"` attribute it turns
 * into a green tag carrying that text (project titles, "Zoom", "Close").
 */
export function CustomCursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine)');
  const pathname = usePathname();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  // Whatever was under the cursor is gone after a navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setLabel(null);
    setInteractive(false);
  }

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      setLabel(target?.closest('[data-cursor]')?.getAttribute('data-cursor') ?? null);
      setInteractive(Boolean(target?.closest('a, button, [role="button"]')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const dotScale = !visible || label ? 0 : interactive ? 4.5 : 1;

  return (
    <>
      {/* Dot — its own fixed layer so the difference blend reaches the page */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[10001] pointer-events-none"
        style={{ x: sx, y: sy, mixBlendMode: 'difference' }}
      >
        <motion.div
          className="rounded-full bg-white"
          style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
          animate={{ scale: dotScale }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        />
      </motion.div>

      {/* Tag */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[10001] pointer-events-none"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="origin-top-left whitespace-nowrap bg-accent text-fg px-2.5 py-1.5 text-[11px] leading-none"
          style={{ fontWeight: 600, marginLeft: 14, marginTop: 14 }}
          initial={false}
          animate={{
            scale: visible && label ? 1 : 0,
            opacity: visible && label ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        >
          {label ?? ' '}
        </motion.div>
      </motion.div>
    </>
  );
}
