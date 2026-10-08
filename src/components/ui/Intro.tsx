'use client';

import { useEffect } from 'react';

/**
 * Runs before first paint: marks the intro as seen for the rest of the session
 * so it only ever plays on the first page a visitor lands on.
 */
export const INTRO_SCRIPT = `try{if(sessionStorage.getItem('jt-intro')){document.documentElement.dataset.intro='seen'}else{sessionStorage.setItem('jt-intro','1')}}catch(e){}`;

/** How long the curtain takes to play out, in ms (matches globals.css) */
const INTRO_MS = 2100;

/**
 * First-visit curtain — a field of accent green carrying the name, which
 * lifts to uncover the work. The animation itself is pure CSS (see .intro in
 * globals.css) so it starts before hydration.
 */
export function Intro() {
  useEffect(() => {
    // Once it has played, later client-side navigations shouldn't wait for it
    const t = setTimeout(() => {
      document.documentElement.dataset.intro = 'seen';
    }, INTRO_MS);
    return () => clearTimeout(t);
  }, []);

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
