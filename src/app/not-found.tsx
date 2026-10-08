import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-gutter pt-[clamp(2rem,6vw,10rem)] pb-[clamp(3rem,8vw,12rem)]">
      <h1
        className="text-fg leading-[0.84] tracking-[-0.045em]"
        style={{ fontSize: 'clamp(2.5rem, 15.4vw, 42rem)', fontWeight: 900 }}
      >
        <span className="line"><span>NOTHING</span></span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}><span>HERE.</span></span>
      </h1>
      <p className="text-body leading-[1.7] mt-[clamp(2rem,4vw,6rem)]" style={{ fontWeight: 400 }}>
        This page doesn&rsquo;t exist, or it has moved.
      </p>
      <Link href="/" className="nav-link text-body mt-[0.6em]" style={{ fontWeight: 600 }}>
        Back to the work
      </Link>
    </div>
  );
}
