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
    // No background — page content scrolls underneath, like Specht Studio.
    // pointer-events-none so the empty header area never blocks the grid;
    // mix-blend-difference keeps the text legible over dark images.
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none mix-blend-difference text-white">
      <div
        className="site-header chrome-enter flex items-baseline justify-between md:justify-start px-gutter tracking-[-0.01em]"
        style={{ paddingTop: 'calc(var(--nav-h) * 0.36)' }}
      >
        <Link href="/" className="nav-link pointer-events-auto shrink-0 font-medium">
          Joshua Trow
        </Link>

        <nav aria-label="Main">
          <ul className="site-nav pointer-events-auto flex items-baseline list-none p-0 m-0">
            {NAV_LINKS.map(({ label, href }) => {
              // Project pages live under Work
              const isActive =
                href === '/'
                  ? pathname === '/' || pathname.startsWith('/project')
                  : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className="nav-link font-normal"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
