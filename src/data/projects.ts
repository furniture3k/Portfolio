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
  | 'photography'
  | 'pattern'
  | 'digital';

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory[];
  description: string;
  /** Path relative to /public — leave empty string until images are added */
  thumbnailUrl: string;
  heroImageUrl: string;
  /** Controls card dimensions: portrait=800×1067, landscape=1200×800, square=900×900 */
  aspectRatio: AspectRatio;
  toolsUsed?: string[];
  gallery?: string[];
  accentColor?: string;
  tags?: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────
// Images left empty — add paths once photos are dropped into /public/images/projects/

export const projects: Project[] = [
  {
    id: '01',
    slug: 'form-rest',
    title: 'Form // Rest',
    client: 'STADIO — Year 3 Final',
    year: 2025,
    category: ['fashion'],
    description:
      'This project explores WGSN S/S 26 Extra Ordinary through the lens of Industrial Futurism. The collection balances utilitarian function with refined minimalism — a contemporary wardrobe designed for a progressive, design-aware consumer navigating everyday life in an industrialised future.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Photoshop', 'Illustrator', 'Procreate', 'Pattern Making'],
    gallery: [],
    tags: ['industrial futurism', 'menswear', 'utilitarian', 'SS26'],
  },
  {
    id: '02',
    slug: 'retro-nights',
    title: 'Retro Nights',
    client: 'STADIO — Year 2 Final',
    year: 2024,
    category: ['fashion'],
    description:
      'This project investigates local South African street style as a form of cultural identity and expression. Drawing from urban youth culture, the collection translates diverse street influences into a contemporary capsule range. A strong emphasis is placed on sustainability, with 60–70% of each look constructed using upcycled Levi\'s denim.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Photoshop', 'Illustrator', 'Procreate', 'Pattern Making'],
    tags: ['street style', 'south africa', 'upcycled denim', 'sustainability'],
  },
  {
    id: '03',
    slug: 'retro-nights-construction',
    title: 'Retro Nights — Construction',
    client: 'STADIO — Year 2 Final',
    year: 2024,
    category: ['fashion'],
    description:
      'WIP documentation of the Retro Nights collection construction process. Patchwork denim panels in electric blue and chartreuse yellow, developed from upcycled Levi\'s jeans. Each panel was hand-cut and assembled to form the geometric diamond structures across all four looks.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Pattern Making', 'Photoshop'],
    tags: ['construction', 'patchwork', 'denim', 'process'],
  },
  {
    id: '04',
    slug: 'playful-paradox',
    title: 'Playful Paradox',
    client: 'STADIO — Pattern Creation',
    year: 2024,
    category: ['pattern', 'graphic-design'],
    description:
      'Pattern creation based on the Women\'s S/S 26 Playful Paradox Patterns trend report by WGSN. Three colourways — teal, red, and orange — each applied to garment illustrations to demonstrate placement and repeat.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
    toolsUsed: ['Illustrator', 'Photoshop'],
    tags: ['pattern', 'WGSN', 'SS26', 'womenswear'],
  },
  {
    id: '05',
    slug: 'digital-product-creation',
    title: 'Life Is Better in Pyjamas',
    client: 'STADIO — Digital Product Creation',
    year: 2024,
    category: ['digital', 'fashion'],
    description:
      'Using Browzwear VStitcher, a two-piece pyjama set was digitally designed — consisting of a crop top and wide-leg pants. The final outcome includes three colourways (yellow, teal, pink), featuring a floral placement pattern on the pants and a graphic on the front of the top.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Browzwear VStitcher', 'Illustrator', 'Photoshop'],
    tags: ['3D garment', 'digital fashion', 'VStitcher', 'pyjamas'],
  },
  {
    id: '06',
    slug: 'surface-tension',
    title: 'Surface Tension',
    client: 'STADIO — Graphic Design',
    year: 2025,
    category: ['graphic-design', 'branding'],
    description: 'A typographic identity system exploring tension between negative space and form.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
    toolsUsed: ['Illustrator', 'Photoshop'],
    tags: ['typography', 'identity', 'branding'],
  },
  {
    id: '07',
    slug: 'cold-press',
    title: 'Cold Press',
    client: 'Personal',
    year: 2025,
    category: ['photography'],
    description: 'A personal photography series documenting texture, material, and light in everyday industrial spaces.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Lightroom', 'Photoshop'],
    tags: ['photography', 'texture', 'industrial'],
  },
  {
    id: '08',
    slug: 'year-one-collection',
    title: 'Year One Collection',
    client: 'STADIO — Year 1 Final',
    year: 2023,
    category: ['fashion'],
    description: 'First full collection exploring volume, silhouette, and construction fundamentals.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'portrait',
    toolsUsed: ['Pattern Making', 'Procreate'],
    tags: ['womenswear', 'volume', 'silhouette'],
  },
  {
    id: '09',
    slug: 'flat-sketches',
    title: 'Technical Flat Sketches',
    client: 'STADIO — Technical Drawing',
    year: 2024,
    category: ['fashion', 'graphic-design'],
    description: 'A collection of technical flat sketches across multiple briefs, demonstrating garment construction knowledge and detail.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'landscape',
    toolsUsed: ['Illustrator'],
    tags: ['technical drawing', 'flats', 'construction'],
  },
  {
    id: '10',
    slug: 'mood-systems',
    title: 'Mood Systems',
    client: 'Personal',
    year: 2025,
    category: ['graphic-design'],
    description: 'Experimental moodboarding as a design tool — colour, texture, and narrative assembled into visual systems.',
    thumbnailUrl: '',
    heroImageUrl: '',
    aspectRatio: 'square',
    toolsUsed: ['Photoshop', 'Illustrator'],
    tags: ['moodboard', 'colour', 'concept'],
  },
];
