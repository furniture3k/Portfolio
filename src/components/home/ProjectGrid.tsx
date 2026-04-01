import type { Project } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * CSS multi-column masonry grid.
 * Using `columns` (not Grid) because it fills columns naturally without JS
 * and handles varying aspect ratios without leaving gaps.
 *
 * The `group` class enables the hover-desaturation effect:
 * sibling cards dim via `group-hover:opacity-40` in ProjectCard.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-8 md:px-12 py-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 group">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
