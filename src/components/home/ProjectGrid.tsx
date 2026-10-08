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

// Mirrors the .work-grid column breakpoints in globals.css
const SIZES =
  '(min-width: 3400px) 13vw, (min-width: 2560px) 15vw, (min-width: 1920px) 17vw, ' +
  '(min-width: 1200px) 20vw, (min-width: 900px) 25vw, (min-width: 640px) 34vw, 50vw';

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  preload,
  isActive,
  animate,
}: {
  project: Project;
  index: number;
  preload?: boolean;
  isActive?: boolean;
  animate?: boolean;
}) {
  const { width, height } = DIMENSIONS[project.aspectRatio];
  const hasImage = Boolean(project.thumbnailUrl);
  const placeholderColor = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <Link
      href={`/project/${project.slug}`}
      aria-label={`View ${project.title}`}
      aria-current={isActive ? 'page' : undefined}
      // The custom cursor picks this up and carries the title
      data-cursor={project.title}
      // The open project stays faded in the grid; everything else fades on hover
      className={isActive ? 'tile is-active' : 'tile'}
    >
      <div
        className={animate ? 'tile-frame unmask' : 'tile-frame'}
        style={{ aspectRatio: `${width} / ${height}`, '--i': Math.min(index, 18) } as React.CSSProperties}
      >
        <div className={animate ? 'settle w-full h-full' : 'w-full h-full'}>
          {hasImage ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              width={width}
              height={height}
              preload={preload}
              sizes={SIZES}
              className="tile-media object-cover"
            />
          ) : (
            <div style={{ backgroundColor: placeholderColor }} className="tile-media" />
          )}
        </div>
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
  // The load-in only plays where the grid is the page (home) — under an open
  // project it sits below the fold and would animate unseen.
  const animate = !activeSlug;

  return (
    <div className="work-grid">
      {projects.map((project, i) => (
        <div key={project.id}>
          <ProjectCard
            project={project}
            index={i}
            preload={!activeSlug && i === 0}
            isActive={project.slug === activeSlug}
            animate={animate}
          />
        </div>
      ))}
    </div>
  );
}
