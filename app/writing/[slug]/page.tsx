import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { formatJournalDate, journalEntries, journalEntry } from '@/lib/journal';
import { featuredProjects } from '@/lib/projects';
import { author, pageMetadata } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const entries = journalEntries();
  // Next needs a route to export even when the production journal is empty.
  // The reserved slug renders the 404 page and cannot match a Markdown file.
  return entries.length
    ? entries.map(({ slug }) => ({ slug }))
    : [{ slug: '_empty' }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = journalEntry(slug);
  if (!entry) notFound();
  return pageMetadata(entry.title, entry.description, `/writing/${slug}/`, {
    article: true,
    draft: entry.draft,
  });
}

export default async function JournalArticle({ params }: Props) {
  const { slug } = await params;
  const entry = journalEntry(slug);
  if (!entry) notFound();
  const project = featuredProjects.find((item) => item.journal === slug);

  return (
    <article className="detail-page journal-article">
      <Link className="text-link back-link" href="/writing/">
        All writing
      </Link>
      <header className="page-intro article-intro" data-page-entry>
        <p className="eyebrow">{entry.topic}</p>
        <h1 className="display">{entry.title}</h1>
        <p className="lede">{entry.description}</p>
        <p className="article-meta">
          <span>{author}</span>
          {entry.draft ? (
            <span className="draft-indicator">Draft for review</span>
          ) : (
            <time dateTime={entry.date}>{formatJournalDate(entry.date)}</time>
          )}
          <span>{entry.readingTime} min read</span>
        </p>
      </header>
      <div className="prose">
        <Markdown
          skipHtml
          components={{
            h2: ({ children }) => <h2 className="display">{children}</h2>,
          }}
        >
          {entry.body}
        </Markdown>
        {project && (
          <p className="related">
            Related project ·{' '}
            <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
          </p>
        )}
      </div>
    </article>
  );
}
