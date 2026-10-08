import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { FitText } from '@/components/ui/FitText';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { PageRow } from '@/components/ui/PageRow';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Joshua Trow — open to full-time roles, freelance work and collaborations.',
};

const EMAIL = 'joshtrow04@gmail.com';

// Fill in your actual handles/URLs
const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
];

const AVAILABLE_FOR = ['Full-time roles', 'Freelance', 'Collaborations'];

const DISCIPLINES = [
  'Fashion Design',
  'Graphic Design',
  'Brand Identity',
  'Lookbooks & Editorials',
  'Digital Garment Creation',
  'Pattern Design',
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

export default function ContactPage() {
  return (
    <div>
      {/* ── Statement — fitted to the full width of the page ── */}
      <header className="px-gutter pt-[clamp(2rem,6vw,10rem)] pb-[clamp(2.5rem,6vw,10rem)]">
        <h1 className="text-fg">
          <FitText
            fallback="10.6vw"
            className="leading-[0.86] tracking-[-0.045em]"
            style={{ fontWeight: 900 }}
          >
            <span className="line"><span>LET&rsquo;S MAKE</span></span>
            <span className="line" style={{ '--i': 1 } as React.CSSProperties}><span>SOMETHING.</span></span>
          </FitText>
        </h1>
      </header>

      <PageRow label="Email">
        <a
          href={`mailto:${EMAIL}`}
          className="group block w-full max-w-[1400px] 2xl:max-w-[72%] text-fg"
          aria-label={`Email ${EMAIL}`}
        >
          <FitText
            fallback="4.4vw"
            className="leading-[1.05] tracking-[-0.03em] transition-opacity duration-500 group-hover:opacity-40"
            style={{ fontWeight: 700 }}
          >
            {EMAIL}
          </FitText>
        </a>
        <div className="mt-[1.4em]">
          <CopyEmail email={EMAIL} />
        </div>
      </PageRow>

      <PageRow label="Based">
        <p className="text-body leading-[1.7]" style={{ fontWeight: 400 }}>
          Johannesburg, South Africa
        </p>
      </PageRow>

      <PageRow label="Available for">
        <PlainList items={AVAILABLE_FOR} />
      </PageRow>

      <PageRow label="Disciplines">
        <PlainList items={DISCIPLINES} />
      </PageRow>

      <PageRow label="Socials">
        <ul className="list-none p-0 m-0 text-body leading-[1.7]" style={{ fontWeight: 400 }}>
          {SOCIALS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {l.label}
                <ArrowUpRight aria-hidden className="inline-block size-[0.8em] ml-[0.3em] -translate-y-[0.08em]" />
              </a>
            </li>
          ))}
        </ul>
      </PageRow>
    </div>
  );
}
