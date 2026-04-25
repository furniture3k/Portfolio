'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

const DIMENSIONS: Record<Project['aspectRatio'], { width: number; height: number }> = {
  portrait:  { width: 800,  height: 1000 },
  landscape: { width: 1200, height: 800  },
  square:    { width: 900,  height: 900  },
};

const PLACEHOLDER_COLORS = [
  '#1a1a1a', '#222222', '#2a2a2a', '#1f1f1f', '#252525',
  '#181818', '#202020', '#282828', '#1e1e1e', '#242424',
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index, priority }: { project: Project; index: number; priority?: boolean }) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/project/${project.slug}`}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {hasImage ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-full object-cover"
          />
        ) : (
          <div style={{ backgroundColor: placeholderColor }} className="w-full h-full" />
        )}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '10px', pointerEvents: 'none',
          }}
        >
          <p className="text-[10px] tracking-wide text-white leading-snug" style={{ fontWeight: 500 }}>
            {project.title}
          </p>
          <p className="text-[9px] text-white/60 mt-0.5" style={{ fontWeight: 400 }}>
            {project.client}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="columns-2 md:columns-5" style={{ columnGap: 3, padding: 3 }}>
      {projects.map((project, i) => (
        <div key={project.id} style={{ breakInside: 'avoid', marginBottom: 3 }}>
          <ProjectCard project={project} index={i} priority={i === 0} />
        </div>
      ))}
    </div>
  );
}
