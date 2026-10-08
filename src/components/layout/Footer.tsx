'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FitText } from '@/components/ui/FitText';
import { useLenis } from '@/components/layout/SmoothScrollProvider';
import { EASE_OUT_EXPO } from '@/lib/motion';

const EMAIL = 'joshtrow04@gmail.com';
const WORDMARK = 'JOSHUA TROW';

function useJohannesburgTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Johannesburg',
      hour: '2-digit',
      minute: '2-digit',
    });
    const tick = () => setTime(format.format(new Date()));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return time;
}

export function Footer() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const time = useJohannesburgTime();

  function toTop() {
    if (lenis.current) lenis.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <footer id="footer" className="site-footer bg-accent text-fg px-gutter pb-gutter overflow-hidden">
      <div
        className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        style={{ paddingTop: 'clamp(3.5rem, 9vw, 14rem)', paddingBottom: 'clamp(2.5rem, 6vw, 9rem)' }}
      >
        <p
          className="text-lead leading-[1.15] tracking-[-0.02em] max-w-[22ch]"
          style={{ fontWeight: 400 }}
        >
          Open to full-time roles, freelance work and collaborations.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="nav-link self-start sm:self-auto text-nav tracking-[-0.01em] font-medium"
        >
          {EMAIL}
        </a>
      </div>

      {/* Wordmark — fitted edge to edge, letters rise as the footer arrives */}
      <motion.div
        aria-hidden
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.04 }}
        className="select-none"
      >
        <FitText
          fallback="10.2vw"
          className="overflow-hidden leading-[0.8] tracking-[-0.045em]"
          // right padding: the negative tracking would otherwise let the mask shave the last letter
          style={{ fontWeight: 900, paddingBlock: '0.03em', paddingRight: '0.05em' }}
        >
          {WORDMARK.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { y: '105%' },
                visible: { y: 0, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </FitText>
      </motion.div>

      <div
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-meta"
        style={{ fontWeight: 500, paddingTop: 'clamp(1.25rem, 2.4vw, 4rem)' }}
      >
        <span>&copy; {new Date().getFullYear()} Joshua Trow</span>
        <span className="tabular-nums">
          Johannesburg{time && `, ${time}`}
        </span>
        <button type="button" onClick={toTop} className="nav-link">
          Back to top
        </button>
      </div>
    </footer>
  );
}
