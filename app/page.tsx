import Link from 'next/link';
import {
  JournalList,
  ProjectCards,
  SectionHeading,
  TechnicalList,
} from '@/components/editorial';
import { FocusIcon, type FocusIconKind } from '@/components/focus-icon';
import { Testimonials } from '@/components/testimonials';
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
      'I integrate language models and tools into engineering workflows. I work on AI-assisted test generation, validate generated tests and use evaluations and traces to understand how agents reach their results.',
    topics: ['MCP', 'LLM orchestration', 'Evaluation'],
  },
  {
    title: 'Developer platforms',
    tone: 'cyan',
    icon: 'terminal',
    href: '/about/#developer-platforms',
    summary:
      'I build developer tooling, automate build and release pipelines and work on the cloud infrastructure behind them. I focus on making delivery easier to reproduce and debug.',
    topics: ['Developer experience', 'CI/CD', 'AWS'],
  },
  {
    title: 'Frontend Architecture',
    tone: 'copper',
    icon: 'layers',
    href: '/about/#journey',
    summary:
      'I develop shared UI architecture, from design tokens and component APIs to accessibility and migrations across framework versions.',
    topics: ['Accessibility', 'Components', 'Design tokens'],
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
            <p className="lede">
              I’ve spent over 20 years building software and improving how teams
              deliver it. My work spans developer experience, cloud
              infrastructure and applied AI.
            </p>
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
      <Testimonials />
    </>
  );
}
