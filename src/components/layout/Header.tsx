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
      <div className="flex items-baseline justify-between md:justify-start gap-x-6 md:gap-x-16 px-5 md:px-6 pt-5 md:pt-7">

        <Link
          href="/"
          className="pointer-events-auto shrink-0 text-[13px] md:text-[17px] tracking-[-0.01em] font-medium hover:opacity-50 transition-opacity duration-200"
        >
          Joshua Trow
        </Link>

        <ul className="pointer-events-auto flex items-baseline gap-4 md:gap-7 list-none p-0 m-0">
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
                  className={[
                    'relative text-[12px] md:text-[17px] tracking-[-0.01em] font-normal transition-opacity duration-200 hover:opacity-50',
                    'after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full after:bg-white',
                    isActive ? 'after:opacity-100' : 'after:opacity-0',
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
