import { HeroBlock } from '@/components/home/HeroBlock';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <HeroBlock />
      <MarqueeStrip />
      <ProjectGrid projects={projects} />
    </>
  );
}
