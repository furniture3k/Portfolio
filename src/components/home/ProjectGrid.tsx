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

function ProjectCard({
  project,
  index,
  priority,
  isActive,
}: {
  project: Project;
  index: number;
  priority?: boolean;
  isActive?: boolean;
}) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <Link
      href={`/project/${project.slug}`}
      aria-label={`View ${project.title}`}
      aria-current={isActive ? 'page' : undefined}
      title={project.title}
      // The open project stays faded in the grid; everything else fades on hover
      className={[
        'block transition-opacity duration-300',
        isActive ? 'opacity-30' : 'opacity-100 hover:opacity-30',
      ].join(' ')}
    >
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {hasImage ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            width={width}
            height={height}
            priority={priority}
            sizes="(min-width: 768px) 20vw, 50vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <div style={{ backgroundColor: placeholderColor }} className="w-full h-full" />
        )}
      </div>
    </Link>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function ProjectGrid({
  projects,
  activeSlug,
}: {
  projects: Project[];
  activeSlug?: string;
}) {
  return (
    <div className="columns-2 md:columns-5" style={{ columnGap: 0 }}>
      {projects.map((project, i) => (
        <div key={project.id} style={{ breakInside: 'avoid' }}>
          <ProjectCard
            project={project}
            index={i}
            priority={!activeSlug && i === 0}
            isActive={project.slug === activeSlug}
          />
        </div>
      ))}
    </div>
  );
}
