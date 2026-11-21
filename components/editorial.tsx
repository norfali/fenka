import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatJournalDate, type JournalEntry } from '@/lib/journal';
import { featuredProjects } from '@/lib/projects';

type Project = (typeof featuredProjects)[number];

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="page-intro" data-page-entry>
      <p className="eyebrow">{label}</p>
      <h1 className="display">{title}</h1>
      <div className="lede">{children}</div>
    </header>
  );
}

export function SectionHeading({
  title,
  id,
  href,
  linkText,
}: {
  title: string;
  id: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading" data-scroll-reveal>
      <h2 className="display" id={id}>
        {title}
      </h2>
      {href && (
        <Link className="text-link" href={href}>
          {linkText}
        </Link>
      )}
    </div>
  );
}

export function ProjectVisual({ slug }: { slug: Project['slug'] }) {
  if (slug === 'london-ai-atlas') {
    return (
      <div className="project-art atlas-art">
        {/* This pre-sized WebP is shared by all static routes. */}
        <img
          src="/images/london-ai-atlas.webp"
          width="1160"
          height="648"
          alt="Isometric view of Old Street and Shoreditch in London AI Atlas"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="project-art lab-art" aria-hidden="true">
      <div className="lab-diagram">
        <span className="diagram-node diagram-doc">
          <i />
          <i />
          <i />
        </span>
        <span className="diagram-wire" />
        <span className="diagram-node diagram-embedding">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} />
          ))}
        </span>
        <span className="diagram-wire" />
        <span className="diagram-node diagram-result">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="lab-labels">
        <span>Documents</span>
        <span>Embeddings</span>
        <span>Retrieval</span>
      </div>
    </div>
  );
}

export function TechnicalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="technical-list" role="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {featuredProjects.map((project, index) => (
        <article
          className="project-card"
          data-scroll-reveal={index}

          data-tone={project.tone}
          key={project.slug}
        >
          <div className="card-visual">
            <ProjectVisual slug={project.slug} />
            {project.slug === 'london-ai-atlas' && (
              <span className="map-credit">© OpenStreetMap contributors</span>
            )}
          </div>
          <div className="card-copy">
            <p className="eyebrow">{project.label}</p>
            <h3 className="item-title">
              <Link className="card-link" href={`/projects/${project.slug}/`}>
                {project.title}
              </Link>
            </h3>
            <p className="card-summary">{project.summary}</p>
          </div>
          <TechnicalList items={project.technologies} />
        </article>
      ))}
    </div>
  );
}

export function JournalList({
  entries,
  heading: Heading = 'h3',
}: {
  entries: JournalEntry[];
  heading?: 'h2' | 'h3';
}) {
  if (!entries.length)
    return <p className="muted">The first articles are in the works.</p>;

  return (
    <ul className="journal-list">
      {entries.map((entry, index) => (
        <li key={entry.slug}>
          <article
            className="journal-row"
            data-scroll-reveal={Math.min(index, 2)}
          >
            <p className="eyebrow">{entry.topic}</p>
            <div>
              <Heading className="item-title">
                <Link className="article-link" href={`/writing/${entry.slug}/`}>
                  {entry.title}
                </Link>
              </Heading>
              <p className="muted">{entry.description}</p>
            </div>
            <p className="row-date">
              {entry.draft ? (
                'Draft'
              ) : (
                <time dateTime={entry.date}>
                  {formatJournalDate(entry.date)}
                </time>
              )}
              <span>{entry.readingTime} min read</span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
