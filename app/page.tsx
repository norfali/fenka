import Link from 'next/link';
import {
  JournalList,
  ProjectCards,
  SectionHeading,
  TechnicalList,
} from '@/components/editorial';
import { FocusIcon, type FocusIconKind } from '@/components/focus-icon';
import { FeaturedTestimonials } from '@/components/testimonials';
import { journalEntries } from '@/lib/journal';
import { description, pageMetadata, socials } from '@/lib/site';

export const metadata = pageMetadata('Fenka · Nad Orfali', description, '/');

const engineeringFocus: {
  title: string;
  tone: string;
  icon: FocusIconKind;
  href: string;
  summary: string;
  topics: string[];
}[] = [
  {
    title: 'Applied AI',
    tone: 'lavender',
    icon: 'connections',
    href: '/about/#applied-ai',
    summary:
      'Building AI-powered engineering workflows, from agent-assisted test generation and validation to MCP integrations, evaluation and observability.',
    topics: ['Python', 'MCP', 'LLM Orchestration', 'Evaluation'],
  },
  {
    title: 'Developer Platforms',
    tone: 'cyan',
    icon: 'terminal',
    href: '/about/#developer-platforms',
    summary:
      'Building the tooling, CI/CD pipelines and cloud-based foundations that help engineering teams develop, test and release software reliably.',
    topics: ['AWS', 'GitHub', 'Harness', 'CI/CD'],
  },
  {
    title: 'Frontend Architecture',
    tone: 'copper',
    icon: 'layers',
    href: '/about/#journey',
    summary:
      'Building shared frontend foundations, reusable components and design systems, with accessibility and developer experience at their core.',
    topics: ['TypeScript', 'Vue', 'Design Systems', 'Accessibility'],
  },
];

export default function Home() {
  const entries = journalEntries().slice(0, 3);

  return (
    <>
      <section className="home-hero" aria-labelledby="intro">
        <div className="hero-copy" data-page-entry>
          <p className="eyebrow hero-byline">
            Lead software engineer <span aria-hidden="true">/</span> London
          </p>
          <h1 className="display" id="intro">
            <span className="hero-name">Hi, I’m Nad.</span>{' '}
            <em>
              <span>From design systems</span>{' '}
              <span>to intelligent systems.</span>
            </em>
          </h1>
          <div className="hero-details">
            <div className="lede space-y-4">
              <p>
                I'm a hands-on software engineer with over 20 years of experience
                building software, solving complex problems and improving how
                teams build and ship it.
              </p>
              <p>
                My work spans frontend and backend engineering, developer
                platforms, cloud infrastructure and applied AI. I still enjoy
                getting stuck into the code as much as ever.
              </p>
            </div>
            <div className="intro-links">
              <a className="button-link" href="#selected-work">
                Explore projects
              </a>
              {socials.map(({ title, href }) => (
                <a className="text-link" key={title} href={href}>
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="home-section" aria-labelledby="engineering-focus">
        <SectionHeading id="engineering-focus" title="Engineering focus" />
        <div className="focus-grid">
          {engineeringFocus.map(
            ({ title, href, summary, topics, tone, icon }, index) => (
              <article
                className="focus-card"
                data-scroll-reveal={index}

                data-tone={tone}
                key={title}
              >
                <FocusIcon kind={icon} />
                <h3 className="item-title">
                  <Link className="card-link" href={href}>
                    {title}
                  </Link>
                </h3>
                <p>{summary}</p>
                <TechnicalList items={topics} />
              </article>
            ),
          )}
        </div>
      </section>
      <section className="home-section" aria-labelledby="selected-work">
        <SectionHeading
          id="selected-work"
          title="Selected projects"
          href="/projects/"
          linkText="All projects"
        />
        <ProjectCards />
      </section>
      <section className="home-section" aria-labelledby="recent-notes">
        <SectionHeading
          id="recent-notes"
          title="Writing"
          href="/writing/"
          linkText="All entries"
        />
        <JournalList entries={entries} />
      </section>
      <FeaturedTestimonials />
    </>
  );
}
