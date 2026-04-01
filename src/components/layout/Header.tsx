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
    <header className="sticky top-0 z-50 h-nav-h bg-accent border-b border-fg/10">
      <div className="flex h-full items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-[11px] tracking-[0.2em] uppercase font-bold hover:opacity-40 transition-opacity duration-200"
        >
          Joshua Trow
        </Link>

        <ul className="flex items-center gap-8 md:gap-14 list-none p-0 m-0">
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
