import type { Project } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Editorial two-column layout inspired by Bōjka Studio.
 * Items are smaller (30–55% page width), always showing caption below.
 * Rows alternate between left-narrow/right-wide and left-wide/right-narrow
 * so the layout feels scattered without being broken.
 */
const LAYOUT: { sm: string; lg: string }[] = [
  // Row 1 — narrow left, wider right
  { sm: 'col-span-6',              lg: 'col-start-1 col-span-4'  },
  { sm: 'col-span-6',              lg: 'col-start-6 col-span-7'  },

  // Row 2 — wider left, narrow pushed right
  { sm: 'col-span-6',              lg: 'col-start-1 col-span-6'  },
  { sm: 'col-span-6',              lg: 'col-start-8 col-span-4'  },

  // Row 3 — inset left, medium right
  { sm: 'col-span-6',              lg: 'col-start-2 col-span-4'  },
  { sm: 'col-span-6',              lg: 'col-start-7 col-span-5'  },

  // Row 4 — medium left, narrow right edge
  { sm: 'col-span-6',              lg: 'col-start-1 col-span-5'  },
  { sm: 'col-span-6',              lg: 'col-start-8 col-span-4'  },

  // Row 5 — narrow left, wide right
  { sm: 'col-span-6',              lg: 'col-start-2 col-span-3'  },
  { sm: 'col-span-6',              lg: 'col-start-6 col-span-6'  },
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-8 md:px-14 py-16 md:py-24">
      <div className="grid grid-cols-12 gap-x-4 gap-y-16 md:gap-y-24">
        {projects.map((project, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <div key={project.id} className={`col-span-6 ${layout.lg}`}>
              <ProjectCard project={project} index={index} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
