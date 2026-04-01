import { HeroBlock } from '@/components/home/HeroBlock';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <HeroBlock />
      <ProjectGrid projects={projects} />
    </>
  );
}
