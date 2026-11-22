import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PageIntro,
  ProjectVisual,
  TechnicalList,
} from '@/components/editorial';
import { journalEntries } from '@/lib/journal';
import { featuredProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.summary, `/projects/${slug}/`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  const isAtlas = project.slug === 'london-ai-atlas';
  const related = journalEntries().filter((entry) =>
    entry.project
      ? entry.project === slug
      : 'journal' in project && entry.slug === project.journal,
  );

  return (
    <article className="detail-page">
      <Link className="text-link back-link" href="/projects/">
        All projects
      </Link>
      <PageIntro label={project.label} title={project.title}>
        {project.intro.map((paragraph, index) => (
          <p key={paragraph} className={index > 0 ? 'mt-3' : undefined}>
            {paragraph}
          </p>
        ))}
        <TechnicalList items={project.detailTechnologies} />
        <p className="mt-4">
          <a
            className="button-link"
            href={project.external.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.external.label}
          </a>
        </p>
      </PageIntro>
      <figure className="detail-figure">
        <ProjectVisual slug={project.slug} />
        {project.slug === 'london-ai-atlas' && (
          <figcaption>
            Old Street &amp; Shoreditch · Map data ©{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap contributors
            </a>
          </figcaption>
        )}
      </figure>
      <div className="prose detail-copy">
        {project.sections.map(({ title, body }) => (
          <section key={title}>
            <h2 className="display">{title}</h2>
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {related.length > 0 && (
          <section className="related">
            <h2 className="display">Want to know more?</h2>
            <p>{project.relatedIntro}</p>
            {related.map((entry) => (
              <p key={entry.slug}>
                <Link className="article-link" href={`/writing/${entry.slug}/`}>
                  {entry.title}
                  {isAtlas && ' ↗'}
                </Link>
                {entry.draft && !isAtlas && (
                  <span className="eyebrow ml-3">Draft</span>
                )}
              </p>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
