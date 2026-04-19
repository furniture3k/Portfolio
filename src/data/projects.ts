// ─── Types ────────────────────────────────────────────────────────────────────

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export type ProjectCategory =
  | 'branding' | 'web' | 'print' | 'motion' | 'strategy'
  | 'fashion' | 'graphic-design' | 'photography' | 'pattern' | 'digital';

export interface GallerySection {
  title: string;
  // Each row is 1 image (full-width) or 2 images (side-by-side)
  rows: string[][];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory[];
  description: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  aspectRatio: AspectRatio;
  toolsUsed?: string[];
  sections?: GallerySection[];
  accentColor?: string;
  tags?: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const p = (n: number) => `/images/projects/page-${String(n).padStart(2, '0')}.jpg`;

export const projects: Project[] = [
  {
    id: '01',
    slug: 'university',
    title: 'University Projects',
    client: 'Portfolio 2025',
    year: 2025,
    category: ['fashion', 'graphic-design'],
    description:
      'Three years of fashion design at STADIO — spanning menswear, street-inspired collections, digital garment creation, and graphic pattern work. From concept through to construction.',
    thumbnailUrl: p(8),
    heroImageUrl: p(8),
    aspectRatio: 'landscape',
    toolsUsed: ['Photoshop', 'Illustrator', 'Procreate', 'Pattern Making', 'Browzwear VStitcher'],
    tags: ['fashion', 'menswear', 'graphic design', 'STADIO', '2025'],
    sections: [
      {
        title: 'Form // Rest — Year 3 Final',
        rows: [
          [p(5)],
          [p(6), p(7)],
          [p(8)],
          [p(12)],
          [p(9), p(10)],
          [p(11)],
        ],
      },
      {
        title: 'Retro Nights — Year 2 Final',
        rows: [
          [p(14), p(15)],
          [p(16)],
          [p(17), p(18)],
        ],
      },
      {
        title: 'Misc Projects',
        rows: [
          [p(20), p(21)],
        ],
      },
    ],
  },

  {
    id: '02',
    slug: 'placeholder-02',
    title: 'Graphic Identity',
    client: 'Personal Project',
    year: 2024,
    category: ['branding'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
  },
  {
    id: '03',
    slug: 'placeholder-03',
    title: 'Type Poster Series',
    client: 'Editorial',
    year: 2024,
    category: ['print'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
  },
  {
    id: '04',
    slug: 'placeholder-04',
    title: 'Lookbook',
    client: 'Self-Initiated',
    year: 2023,
    category: ['fashion', 'photography'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
  },
  {
    id: '05',
    slug: 'placeholder-05',
    title: 'Pattern Study',
    client: 'STADIO',
    year: 2023,
    category: ['pattern'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
  },
  {
    id: '06',
    slug: 'placeholder-06',
    title: 'Digital Garment',
    client: 'VStitcher',
    year: 2024,
    category: ['fashion', 'digital'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
  },
  {
    id: '07',
    slug: 'placeholder-07',
    title: 'Brand Campaign',
    client: 'Client',
    year: 2024,
    category: ['graphic-design'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
  },
  {
    id: '08',
    slug: 'placeholder-08',
    title: 'Zine',
    client: 'Self-Initiated',
    year: 2023,
    category: ['print'],
    description: '',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
  },
];
