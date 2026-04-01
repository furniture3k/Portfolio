import { ProjectGrid } from '@/components/home/ProjectGrid';
import { projects } from '@/data/projects';

export default function HomePage() {
  return <ProjectGrid projects={projects} />;
}
