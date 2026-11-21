import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PageIntro,
  ProjectVisual,
  TechnicalList,
} from '@/components/editorial';
import { journalEntry } from '@/lib/journal';
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
  const related = journalEntry(project.journal);

  return (
    <article className="detail-page">
      <Link className="text-link back-link" href="/projects/">
        All projects
      </Link>
      <PageIntro label={project.label} title={project.title}>
        <p>{project.intro}</p>
        <TechnicalList items={project.technologies} />
      </PageIntro>
      <figure className="detail-figure">
        <ProjectVisual slug={project.slug} />
        {project.slug === 'london-ai-atlas' && (
          <figcaption>
            Old Street &amp; Shoreditch · Map data ©{' '}
            <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap contributors
            </a>
          </figcaption>
        )}
      </figure>
      <div className="prose detail-copy">
        {project.sections.map(({ title, body }) => (
          <section key={title}>
            <h2 className="display">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
        {'external' in project && (
          <p>
            <a className="button-link" href={project.external.href}>
              {project.external.label}
            </a>
          </p>
        )}
        {related && (
          <section className="related">
            <h2 className="display">From my writing</h2>
            <Link className="article-link" href={`/writing/${related.slug}/`}>
              {related.title}
            </Link>
            {related.draft && <span className="eyebrow ml-3">Draft</span>}
          </section>
        )}
      </div>
    </article>
  );
}
