'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp } from '@/lib/motion';

const STEPS = [
  {
    number: '01',
    heading: 'Research & Brief',
    body: 'Every project starts with understanding the context — the audience, the market, the history of the problem. I ask a lot of questions before I make anything.',
  },
  {
    number: '02',
    heading: 'Concept Development',
    body: 'From research comes a core concept: a point of view that every subsequent decision can be tested against. I develop multiple directions before narrowing.',
  },
  {
    number: '03',
    heading: 'Design & Craft',
    body: 'This is where the work happens. Iterative, hands-on, and detail-oriented — whether that\'s in a pattern, a typeface, a photoshoot, or a layout.',
  },
  {
    number: '04',
    heading: 'Refinement',
    body: 'I believe in the edit. Getting something right means stripping back anything that doesn\'t serve the idea. The final 20% is often the most important.',
  },
  {
    number: '05',
    heading: 'Delivery & Beyond',
    body: 'Finished work is delivered with care — correct files, clear documentation, and a handoff that makes the work easy to live with and build on.',
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-fg/10 py-10 md:py-14 grid grid-cols-1 md:grid-cols-[auto_1fr_2fr] gap-6 md:gap-12 items-start"
    >
      {/* Large decorative number */}
      <span
        className="font-bold leading-none tracking-tight text-accent select-none"
        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-bold self-center">{step.heading}</h2>

      {/* Body */}
      <p className="text-base md:text-lg leading-relaxed text-fg/70">{step.body}</p>
    </motion.div>
  );
}

export default function ProcessPage() {
  return (
    <div className="px-8 md:px-12 pt-12 md:pt-16 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-bold leading-[0.92] tracking-tight text-fg"
        style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
      >
        Process
      </motion.h1>

      <div className="mt-14 md:mt-20">
        {STEPS.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} />
        ))}
        <div className="border-t border-fg/10" />
      </div>
    </div>
  );
}
