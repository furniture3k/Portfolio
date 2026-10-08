'use client';

import { useLayoutEffect, useRef } from 'react';

interface FitTextProps {
  children: React.ReactNode;
  /** Font size used before measuring (SSR / first paint) — a close vw guess avoids a jump */
  fallback: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Sizes its text so the widest line exactly fills the container's width,
 * at every viewport size.
 */
export function FitText({ children, fallback, className = '', style }: FitTextProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    let lastWidth = -1;
    const fit = (force = false) => {
      const available = box.clientWidth;
      if (!available || (!force && available === lastWidth)) return;
      lastWidth = available;
      text.style.fontSize = '100px';
      const natural = text.getBoundingClientRect().width;
      if (natural) text.style.fontSize = `${(available / natural) * 100}px`;
    };

    fit(true);
    const observer = new ResizeObserver(() => fit());
    observer.observe(box);
    // Re-measure once the webfont replaces the fallback
    document.fonts?.ready.then(() => fit(true));
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={boxRef} className="block w-full">
      <span
        ref={textRef}
        className={`inline-block w-max whitespace-nowrap ${className}`}
        style={{ fontSize: fallback, ...style }}
      >
        {children}
      </span>
    </span>
  );
}
