import { journalEntries } from '@/lib/journal';
import { origin } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const entries = journalEntries({ includeDrafts: false });
  const items = entries.map(({ title, description, slug, date }) => {
    const url = `${origin}/writing/${slug}/`;
    return `<item>
  <title>${escapeXml(title)}</title>
  <description>${escapeXml(description)}</description>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(date).toUTCString()}</pubDate>
</item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fenka Writing</title>
    <link>${origin}/writing/</link>
    <description>Notes on software, applied AI and experiments by Nad Orfali.</description>
    <language>en-gb</language>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />
    ${items.join('\n')}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
