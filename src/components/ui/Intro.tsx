'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Runs before first paint: marks the intro as seen for the rest of the session
 * so it only ever plays on the first page a visitor lands on.
 */
export const INTRO_SCRIPT = `try{if(sessionStorage.getItem('jt-intro')){document.documentElement.dataset.intro='seen'}else{sessionStorage.setItem('jt-intro','1')}}catch(e){}`;

/**
 * When to stop making page-load animations wait for the curtain, in ms.
 * Flipping the flag retimes every animation that reads --intro-delay, so it
 * must happen after the slowest first-load animation has finished (the last
 * grid tile settles at ~3.9s) — any earlier and in-flight reveals snap to
 * their end state.
 */
const INTRO_SETTLED_MS = 4500;

function markIntroSeen() {
  document.documentElement.dataset.intro = 'seen';
}

/**
 * First-visit curtain — a field of accent green carrying the name, which
 * lifts to uncover the work. The animation itself is pure CSS (see .intro in
 * globals.css) so it starts before hydration.
 */
export function Intro() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    const t = setTimeout(markIntroSeen, INTRO_SETTLED_MS);
    return () => clearTimeout(t);
  }, []);

  // Navigating away early: the first page's animations are gone, and the next
  // page shouldn't wait for a curtain that has already lifted
  useEffect(() => {
    if (pathname !== firstPath.current) markIntroSeen();
  }, [pathname]);

  return (
    <div className="intro" aria-hidden>
      <div className="intro-meta">
        <span>Portfolio</span>
        <span>Johannesburg, ZA</span>
      </div>
      <div className="intro-name">
        <span className="line"><span>JOSHUA</span></span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}><span>TROW</span></span>
      </div>
    </div>
  );
}
