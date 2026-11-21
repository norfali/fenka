import {
  PageIntro,
  ProjectCards,
  SectionHeading,
  TechnicalList,
} from '@/components/editorial';
import { independentProjects, professionalProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  'Projects',
  'Personal experiments, independent products and selected engineering work by Nad Orfali.',
  '/projects/',
);

export default function Projects() {
  return (
    <>
      <PageIntro label="Work and experiments" title="Projects">
        <p>
          Independent products, applied AI experiments and selected work from my
          career in software engineering.
        </p>
      </PageIntro>
      <section className="home-section" aria-labelledby="personal">
        <SectionHeading id="personal" title="Personal experiments" />
        <ProjectCards />
      </section>
      <section className="home-section" aria-labelledby="independent">
        <SectionHeading id="independent" title="Independent products" />
        <div className="grid gap-8 md:grid-cols-2">
          {independentProjects.map(
            ({ title, summary, href, technologies, art }, index) => (
              <article
                className="project-card product-card"
                data-scroll-reveal={index}

                key={title}
              >
                {art === 'tracker' && (
                  <div className="product-art tracker-art" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                {art === 'pitch' && (
                  <div className="product-art pitch-art" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                )}
                <div className="card-copy">
                  <h3 className="item-title">
                    <a className="card-link" href={href}>
                      {title}
                    </a>
                  </h3>
                  <p className="card-summary">{summary}</p>
                </div>
                <TechnicalList items={technologies} />
              </article>
            ),
          )}
        </div>
      </section>
      <section
        className="home-section professional-index"
        aria-labelledby="professional"
      >
        <SectionHeading id="professional" title="Professional work" />
        <ul className="project-list" role="list">
          {professionalProjects.map(({ title, summary, href, field }) => (
            <li key={title}>
              <div>
                <p className="eyebrow">{field}</p>
                <h3 className="item-title">
                  {href ? <a href={href}>{title}</a> : title}
                </h3>
              </div>
              <p className="muted">{summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
