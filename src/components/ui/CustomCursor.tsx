'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 40 };
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 22 });

  const isHoveringRef = useRef(false);
  const ringScaleMotion = useMotionValue(1);
  const ringScale = useSpring(ringScaleMotion, { stiffness: 300, damping: 25 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function onEnter(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        isHoveringRef.current = true;
        ringScaleMotion.set(1.8);
      }
    }

    function onLeave(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        isHoveringRef.current = false;
        ringScaleMotion.set(1);
      }
    }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [cursorX, cursorY, ringScaleMotion]);

  return (
    <>
      {/* Dot — follows exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--fg)',
        }}
      />

      {/* Ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--fg)',
          opacity: 0.4,
        }}
      />
    </>
  );
}
