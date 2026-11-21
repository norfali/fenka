import type { MetadataRoute } from 'next';
import { journalEntries } from '@/lib/journal';
import { featuredProjects } from '@/lib/projects';
import { origin } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      '/',
      '/about/',
      '/projects/',
      '/writing/',
      ...featuredProjects.map(({ slug }) => `/projects/${slug}/`),
    ].map((path) => ({ url: `${origin}${path}` })),
    ...journalEntries({ includeDrafts: false }).map(({ slug, date }) => ({
      url: `${origin}/writing/${slug}/`,
      lastModified: date,
    })),
  ];
}
