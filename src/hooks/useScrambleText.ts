'use client';

import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useScrambleText(target: string, delay = 0) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    let frame: number;
    let iteration = 0;
    const totalChars = target.replace(/ /g, '').length;
    const startTime = performance.now() + delay;

    function tick(now: number) {
      if (now < startTime) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTime;
      const settled = Math.floor(elapsed / 55);

      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            // count non-space chars up to this point
            const nonSpaceBefore = target.slice(0, i).replace(/ /g, '').length;
            if (nonSpaceBefore < settled) return char;
            return randomChar();
          })
          .join('')
      );

      if (settled < totalChars) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, delay]);

  return display;
}
