'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Work',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent border-b border-fg/10">

      {/* ── Mobile ── */}
      <div className="md:hidden flex items-center justify-between px-5 py-3">
        <div>
          <Link
            href="/"
            className="block text-[9px] tracking-[0.15em] uppercase font-bold hover:opacity-50 transition-opacity duration-200"
          >
            Joshua Trow
          </Link>
          <p className="text-[8px] tracking-[0.08em] text-fg/50 mt-0.5" style={{ fontWeight: 400 }}>
            fashion · graphic design
          </p>
        </div>

        <ul className="flex items-center gap-5 list-none p-0 m-0">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'text-[8px] tracking-[0.1em] uppercase transition-opacity duration-200',
                    isActive ? 'font-bold opacity-100' : 'font-medium opacity-50 hover:opacity-100',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-nav-h items-center justify-between px-8 lg:px-10">

        {/* Logo + tagline */}
        <div className="shrink-0">
          <Link
            href="/"
            className="block text-[11px] tracking-[0.2em] uppercase font-bold hover:opacity-50 transition-opacity duration-200"
          >
            Joshua Trow
          </Link>
          <p className="text-[9px] tracking-[0.1em] text-fg/45 mt-0.5" style={{ fontWeight: 400 }}>
            fashion · graphic design
          </p>
        </div>

        {/* Nav */}
        <ul className="flex items-center gap-10 list-none p-0 m-0 shrink-0">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'relative text-[10px] tracking-[0.18em] uppercase transition-opacity duration-200',
                    'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full',
                    'after:origin-left after:bg-fg after:transition-transform after:duration-300',
                    isActive
                      ? 'font-bold opacity-100 after:scale-x-100'
                      : 'font-medium opacity-50 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </header>
  );
}
