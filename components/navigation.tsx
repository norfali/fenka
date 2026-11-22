'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages = [
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Writing', href: '/writing/' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="nav-links">
        {pages.map(({ label, href }) => {
          const current = pathname === href || pathname === href.slice(0, -1);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? 'page' : undefined}
                data-active={
                  current || pathname.startsWith(href) ? '' : undefined
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
