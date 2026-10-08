import type { Metadata } from 'next';
import Link from 'next/link';
import { PageRow } from '@/components/ui/PageRow';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Fashion design graduate working across garment construction, digital design and graphic work. Based in Johannesburg.',
};

const SKILLS = [
  'Trend Research',
  'Concept Development',
  'Garment Construction',
  'Pattern Design',
  'Technical Drawing',
  'Presentation Boards & Lookbooks',
];

const SOFTWARE = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Browzwear VStitcher',
  'Procreate',
];

const EDUCATION = [
  {
    degree: 'BA Fashion Design',
    institution: 'STADIO School of Fashion',
    period: '2023 – 2025',
    note: 'Distinction in Fashion Technology, Garment Construction, Pattern Design, and Computer Literacy and Design',
  },
];

function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 text-body leading-[1.7]" style={{ fontWeight: 400 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <article>
      {/* ── Name ── */}
      <header className="px-gutter pt-[clamp(2rem,6vw,10rem)] pb-[clamp(2.5rem,6vw,10rem)]">
        <h1
          className="text-fg leading-[0.84] tracking-[-0.045em]"
          style={{ fontSize: 'clamp(2.5rem, 15.4vw, 42rem)', fontWeight: 900 }}
        >
          <span className="line"><span>JOSHUA</span></span>
          <span className="line" style={{ '--i': 1 } as React.CSSProperties}><span>TROW</span></span>
        </h1>
      </header>

      <PageRow label="Profile">
        <p
          className="text-lead leading-[1.18] tracking-[-0.02em] max-w-[34ch]"
          style={{ fontWeight: 400 }}
        >
          Fashion design graduate with a strong technical foundation in garment construction,
          digital design, and trend forecasting — balancing considered silhouettes with urban,
          edgy elements to create deliberate, evolving work.
        </p>
        <p
          className="text-body leading-relaxed text-fg/60 max-w-[58ch] mt-[1.6em]"
          style={{ fontWeight: 300 }}
        >
          My practice moves between physical making and digital tools — spanning garment
          construction, surface pattern design, digital fashion, and illustration with equal comfort.
        </p>
      </PageRow>

      <PageRow label="Skills">
        <PlainList items={SKILLS} />
      </PageRow>

      <PageRow label="Software">
        <PlainList items={SOFTWARE} />
      </PageRow>

      <PageRow label="Education">
        {EDUCATION.map((e) => (
          <div key={e.degree} className="text-body leading-[1.7] max-w-[58ch]">
            <p style={{ fontWeight: 600 }}>{e.degree}</p>
            <p style={{ fontWeight: 400 }}>
              {e.institution}, <span className="whitespace-nowrap">{e.period}</span>
            </p>
            {e.note && (
              <p className="text-fg/60 mt-[1em] leading-relaxed" style={{ fontWeight: 300 }}>
                {e.note}
              </p>
            )}
          </div>
        ))}
      </PageRow>

      <PageRow label="Availability">
        <p className="text-body leading-[1.7] max-w-[58ch]" style={{ fontWeight: 400 }}>
          Open to full-time roles, freelance commissions, and creative collaborations.
        </p>
        <Link
          href="/contact"
          className="nav-link text-body mt-[1em]"
          style={{ fontWeight: 600 }}
        >
          Get in touch
        </Link>
      </PageRow>
    </article>
  );
}
