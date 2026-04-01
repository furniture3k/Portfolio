const ITEMS = [
  'Fashion Design',
  'Digital Creation',
  'Pattern Making',
  'Browzwear VStitcher',
  'Industrial Futurism',
  'STADIO School of Fashion',
  'Available for Commissions',
  'South Africa',
  'Garment Construction',
  'Surface Pattern Design',
];

const SEPARATOR = '—';

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className="w-full border-y border-fg/10 overflow-hidden py-3 select-none">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-4 text-[11px] tracking-[0.2em] uppercase text-fg/50"
            style={{ fontWeight: 500 }}
          >
            {item}
            <span className="text-accent opacity-80">{SEPARATOR}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
