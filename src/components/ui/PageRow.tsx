import { Reveal, Rule } from '@/components/ui/Reveal';

/**
 * A ruled row on the text pages: bold label in the left column, content on
 * the right. Shares the project page's column split so every page hangs off
 * the same vertical line.
 */
export function PageRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-gutter">
      <Rule />
      <Reveal
        className="
          grid grid-cols-1 gap-y-5 py-[clamp(2.25rem,5vw,8rem)]
          md:grid-cols-[minmax(220px,31.7%)_minmax(0,1fr)]
        "
      >
        <h2 className="text-meta leading-snug" style={{ fontWeight: 700 }}>
          {label}
        </h2>
        <div>{children}</div>
      </Reveal>
    </section>
  );
}
