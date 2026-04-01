// ─── Types ────────────────────────────────────────────────────────────────────

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export type ProjectCategory =
  | 'branding'
  | 'web'
  | 'print'
  | 'motion'
  | 'strategy'
  | 'fashion'
  | 'graphic-design'
  | 'photography';

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory[];
  description: string;
  /** Path relative to /public, e.g. /images/projects/xxx-thumb.jpg — leave empty string for placeholder */
  thumbnailUrl: string;
  /** Full-bleed hero image path */
  heroImageUrl: string;
  /** Controls masonry card dimensions: portrait=800×1067, landscape=1200×800, square=900×900 */
  aspectRatio: AspectRatio;
  /** Optional: tools / software used */
  toolsUsed?: string[];
  /** Optional: additional gallery images for the detail page */
  gallery?: string[];
  /** Optional: per-project accent hex for detail page accents */
  accentColor?: string;
  /** Optional: keyword tags */
  tags?: string[];
}

// ─── Placeholder Data ─────────────────────────────────────────────────────────
// Replace thumbnailUrl / heroImageUrl with real paths once images are added to /public/images/projects/
// Aspect ratio order is intentionally mixed to create natural masonry stagger.

export const projects: Project[] = [
  {
    id: '01',
    slug: 'spring-collection-lookbook',
    title: 'Spring Collection Lookbook',
    client: 'Self-directed',
    year: 2024,
    category: ['fashion', 'photography'],
    description:
      'An editorial lookbook exploring silhouette and texture for a spring capsule collection. Shot on medium format, styled and art-directed independently.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Capture One', 'Adobe Photoshop', 'InDesign'],
    tags: ['editorial', 'lookbook', 'fashion photography'],
  },
  {
    id: '02',
    slug: 'identity-system-nova',
    title: 'Identity System — Nova',
    client: 'Nova Studio',
    year: 2024,
    category: ['branding', 'graphic-design'],
    description:
      'A complete visual identity for an emerging architecture practice. Mark, wordmark, type system, and print collateral designed to communicate precision and restraint.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Figma', 'Adobe Illustrator', 'InDesign'],
    accentColor: '#E8E0D5',
    tags: ['identity', 'branding', 'print'],
  },
  {
    id: '03',
    slug: 'texture-study-series',
    title: 'Texture Study Series',
    client: 'Self-directed',
    year: 2023,
    category: ['photography', 'graphic-design'],
    description:
      'A series of macro studies exploring surface, material, and light. Originally conceived as a reference archive, developed into a limited-run zine.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
    toolsUsed: ['Capture One', 'Adobe Photoshop'],
    tags: ['photography', 'zine', 'editorial'],
  },
  {
    id: '04',
    slug: 'campaign-sundown',
    title: 'Campaign — Sundown',
    client: 'Sundown Apparel',
    year: 2024,
    category: ['fashion', 'photography'],
    description:
      'Seasonal campaign imagery for an independent apparel brand. Creative direction, styling, and photography across two shoot days.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Capture One', 'Adobe Photoshop', 'Lightroom'],
    tags: ['campaign', 'apparel', 'art direction'],
  },
  {
    id: '05',
    slug: 'packaging-cedar',
    title: 'Packaging Design — Cedar',
    client: 'Cedar Goods',
    year: 2023,
    category: ['branding', 'print', 'graphic-design'],
    description:
      'Packaging system for a small-batch wellness brand. Label hierarchy, material selection, and print specification across six SKUs.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Adobe Illustrator', 'InDesign', 'Figma'],
    accentColor: '#C8B89A',
    tags: ['packaging', 'print', 'brand'],
  },
  {
    id: '06',
    slug: 'poster-series-urban-grid',
    title: 'Poster Series — Urban Grid',
    client: 'Self-directed',
    year: 2023,
    category: ['graphic-design', 'print'],
    description:
      'A six-part poster series responding to urban infrastructure as abstract visual form. Silkscreen printed in two-color runs.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Adobe Illustrator', 'Risograph printing'],
    tags: ['poster', 'print', 'typography'],
  },
  {
    id: '07',
    slug: 'web-design-alto',
    title: 'Web Design — Alto',
    client: 'Alto Creative',
    year: 2024,
    category: ['web', 'branding'],
    description:
      'Website design and front-end development for a boutique creative agency. Full design system, responsive layout, and motion language.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Figma', 'Next.js', 'Framer Motion'],
    accentColor: '#1A1A2E',
    tags: ['web', 'ux', 'front-end'],
  },
  {
    id: '08',
    slug: 'editorial-layout-drift',
    title: 'Editorial Layout — Drift',
    client: 'Drift Magazine',
    year: 2023,
    category: ['graphic-design', 'print'],
    description:
      'Art direction and layout design for a quarterly print journal covering culture, craft, and place. Six feature spreads and cover design.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
    toolsUsed: ['InDesign', 'Adobe Illustrator'],
    tags: ['editorial', 'magazine', 'layout'],
  },
];
