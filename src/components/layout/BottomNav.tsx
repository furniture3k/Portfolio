'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Projects', href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Process',  href: '/process' },
  { label: 'Contact',  href: '/contact' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-nav-h border-t border-fg/10 bg-bg"
      aria-label="Main navigation"
    >
      <div className="flex h-full items-center justify-between px-8 md:px-12">
        {/* Left nav links */}
        <ul className="flex items-center gap-8 md:gap-12 list-none p-0 m-0">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'relative text-sm tracking-wider uppercase font-medium',
                    'transition-opacity duration-200 hover:opacity-60',
                    'after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full',
                    'after:origin-left after:bg-fg after:transition-transform after:duration-300',
                    isActive
                      ? 'after:scale-x-100 font-bold'
                      : 'after:scale-x-0 hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — locale slot (static, no i18n yet) */}
        <span className="text-sm tracking-wider uppercase font-medium opacity-40 select-none">
          EN
        </span>
      </div>
    </nav>
  );
}
