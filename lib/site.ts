import type { Metadata } from 'next';

export const origin = 'https://fenka.co.uk';
export const author = 'Nadhim Orfali';
export const description =
  'The online home of Nad Orfali, a London-based lead software engineer. Projects and notes on developer experience, engineering platforms and applied AI.';

export const socials = [
  { title: 'GitHub', href: 'https://github.com/norfali' },
  { title: 'LinkedIn', href: 'https://uk.linkedin.com/in/norfali' },
];

export function pageMetadata(
  title: string,
  summary: string,
  path: string,
  { article = false, draft = false } = {},
): Metadata {
  return {
    title: path === '/' ? { absolute: title } : title,
    description: summary,
    alternates: { canonical: path },
    robots: draft ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: summary,
      url: path,
      type: article ? 'article' : 'website',
      siteName: 'Fenka',
      locale: 'en_GB',
      images: [
        {
          url: '/images/fenka-social.png',
          width: 1200,
          height: 630,
          alt: 'Fenka, the website of Nad Orfali',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: ['/images/fenka-social.png'],
    },
  };
}
