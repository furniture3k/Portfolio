'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Projects', href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent border-b border-fg/10">

      {/* ── Mobile layout: two-row stacked header ── */}
      <div className="md:hidden flex flex-col items-center justify-center py-2 px-3 gap-1.5">
        <Link
          href="/"
          className="text-[8px] tracking-[0.15em] uppercase font-bold hover:opacity-40 transition-opacity duration-200 whitespace-nowrap"
        >
          Joshua Trow
        </Link>

        <ul className="flex items-center gap-4 list-none p-0 m-0">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'relative text-[8px] tracking-[0.1em] uppercase',
                    'transition-opacity duration-200',
                    'after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full',
                    'after:origin-left after:bg-fg after:transition-transform after:duration-300',
                    isActive
                      ? 'after:scale-x-100 font-bold opacity-100'
                      : 'font-medium opacity-60 after:scale-x-0',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Desktop layout: original single-row header ── */}
      <div className="hidden md:flex h-nav-h items-center justify-between px-10">
        <Link
          href="/"
          className="text-[11px] tracking-[0.2em] uppercase font-bold hover:opacity-40 transition-opacity duration-200 shrink-0"
        >
          Joshua Trow
        </Link>

        <ul className="flex items-center gap-14 list-none p-0 m-0 shrink-0">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'relative text-[11px] tracking-[0.2em] uppercase',
                    'transition-opacity duration-200 hover:opacity-40',
                    'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full',
                    'after:origin-left after:bg-fg after:transition-transform after:duration-300',
                    isActive
                      ? 'after:scale-x-100 font-bold opacity-100'
                      : 'font-medium opacity-60 after:scale-x-0 hover:after:scale-x-100 hover:opacity-100',
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
