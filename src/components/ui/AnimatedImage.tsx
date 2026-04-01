'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { clipReveal } from '@/lib/motion';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * next/image wrapped in a Framer Motion clip-path reveal.
 * Triggers once when the element enters the viewport.
 */
export function AnimatedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const variants = shouldReduceMotion
    ? {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : clipReveal;

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        className="w-full h-auto object-cover"
        style={shouldReduceMotion ? undefined : { transform: 'scale(1)' }}
      />
    </motion.div>
  );
}
