import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import { ArchitecturalAtmosphere } from '@/components/architectural-atmosphere';
import { PageMotion } from '@/components/page-motion';
import { Navigation } from '@/components/navigation';
import { author, description, origin, socials } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Fenka · Nad Orfali', template: '%s · Fenka' },
  description,
  authors: [{ name: author }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      style={{ backgroundColor: '#181e1a', colorScheme: 'dark' }}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Fenka Writing"
          href="/feed.xml"
        />
      </head>
      <body>
        <ArchitecturalAtmosphere />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header shell" id="top">
          <Link href="/" className="brand" aria-label="Fenka home">
            <span>
              fenka<span className="brand-period">.</span>
            </span>
          </Link>
          <Navigation />
        </header>
        <main id="main-content" className="shell grow" tabIndex={-1}>
          {children}
        </main>
        <PageMotion />
        <footer className="site-footer shell">
          <div>
            <Link href="/" className="brand" aria-label="Fenka home">
              <span>
                fenka<span className="brand-period">.</span>
              </span>
            </Link>
            <p className="footer-note">Nadhim Orfali · London</p>
          </div>
          <nav aria-label="Footer links">
            <ul className="footer-links">
              {socials.map(({ title, href }) => (
                <li key={title}>
                  <a href={href}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  );
}
