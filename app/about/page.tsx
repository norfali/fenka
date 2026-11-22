import { PageIntro } from '@/components/editorial';
import { author, origin, pageMetadata, socials } from '@/lib/site';

const linkedIn = socials.find(({ title }) => title === 'LinkedIn');
const url = `${origin}/about/`;
const description =
  'Nadhim Orfali is a London-based software engineer with over 20 years of experience across frontend engineering, developer platforms, cloud infrastructure and applied AI.';

export const metadata = pageMetadata(`About ${author}`, description, '/about/');

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url,
  description,
  mainEntity: {
    '@type': 'Person',
    name: author,
    alternateName: 'Nad Orfali',
    url,
    sameAs: socials.map(({ href }) => href),
  },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <PageIntro label="About" title="Hi, I'm Nad.">
        <div className="space-y-4">
          <p>
            I'm a hands-on software engineer based in London, with over 20 years of experience spanning frontend, backend, developer platforms, cloud infrastructure and applied AI.
          </p>
          <p>
            I've built everything from large commercial websites and apps to shared engineering tools and AI-powered workflows. I enjoy tackling complex engineering problems, getting stuck into the technical details and finding better ways to build things.
          </p>
        </div>
      </PageIntro>
      <div className="article-layout">
        <div className="prose">
          <section aria-labelledby="journey">
            <h2 id="journey" className="display">
              From the early days of the web
            </h2>
            <p>
              I started my career when the web was a rather different place.
              I've worked in startups, smaller businesses and large
              international organisations, building everything from ecommerce
              platforms to public-facing websites and apps.
            </p>
            <p>
              Before joining Morningstar, that included projects for the Royal
              Mint, VisitBritain and Transport for London.
            </p>
            <p>
              I've enjoyed the variety, from the pace and hands-on nature of startups to the challenges of building software across larger organisations. Each environment has taught me something different, and I enjoy bringing that experience together to solve complex problems.
            </p>
          </section>
          <section aria-labelledby="building-foundations">
            <h2 id="building-foundations" className="display">
              Building foundations
            </h2>
            <p>
              At Morningstar, I was one of the early engineers building what
              became a shared design system used across products and teams. My
              work covered reusable components, design tokens, accessibility and
              the tooling that supported them.
            </p>
            <p id="developer-platforms">
              Over time, my focus expanded into developer platforms, CI/CD, AWS,
              security and automation. I enjoy improving the tools and processes
              engineers rely on, whether that's making releases more reliable,
              simplifying workflows or removing something unnecessarily tedious.
            </p>
          </section>
          <section aria-labelledby="applied-ai">
            <h2 id="applied-ai" className="display">
              Applied AI in engineering
            </h2>
            <p>
              I've been integrating language models and agentic workflows into
              engineering tooling, particularly around automated testing and
              software quality.
            </p>
            <p>
              That includes AI-assisted test generation and validation, MCP-based
              tool integration, and using evaluation and observability to
              understand what agents actually do.
            </p>
            <p>
              What interests me is making these systems genuinely useful and
              reliable, rather than simply producing an impressive demo. I like
              understanding how things work, where they fail and what can be
              improved.
            </p>
          </section>
          <section aria-labelledby="founder">
            <h2 id="founder" className="display">
              Fenka, then and now
            </h2>
            <p>
              I founded Fenka back in 2001, right in the middle of the dot-com
              bust. Excellent timing, I know.
            </p>
            <p>
              It was my own web development business, working directly with
              clients in the UK and overseas, including Germany, France, Canada
              and the US. I handled much of the work myself, bringing in other
              developers or specialists when projects needed additional expertise
              or capacity.
            </p>
            <p>
              Twenty-five years later, Fenka is still here, although these days
              it's my personal corner of the internet.
            </p>
            <p>
              I've since returned to building my own products, including{' '}
              <a href="https://myrolora.com/">MyRolora</a> and{' '}
              <a href="https://www.uglygameawards.com/">Ugly Game Awards</a>.
            </p>
            <p>
              They're very different ideas, but both give me the freedom to make
              product decisions, experiment and build something beyond my day job.
              And I'd love to see where they go.
            </p>
          </section>
          <section aria-labelledby="people">
            <h2 id="people" className="display">
              Working with people
            </h2>
            <p>
              One of the things I've enjoyed most throughout my career is
              working with talented colleagues across London, Chicago, Milan,
              Mumbai and beyond.
            </p>
            <p>
              I've mentored engineers, shared ideas and worked through plenty
              of challenging problems together. I enjoy learning from others
              just as much as sharing what I know.
            </p>
            <p>
              I take pride in being someone colleagues can trust and depend on,
              whether that's getting things done, helping someone who's stuck
              or simply being a good teammate.
            </p>
            <p>And I've made some great friendships along the way.</p>
          </section>
          {linkedIn && (
            <p className="related">
              <strong>Want to know more about my professional background?</strong>{' '}
              <a href={linkedIn.href}>Find me on LinkedIn</a>.
            </p>
          )}
        </div>
        <div className="about-sidebar">
          <section className="toolkit" aria-labelledby="toolkit">
            <h2 className="item-title" id="toolkit">
              Technical toolkit
            </h2>
            <dl>
              <div>
                <dt className="eyebrow">Languages</dt>
                <dd>TypeScript · JavaScript · Python</dd>
              </div>
              <div>
                <dt className="eyebrow">Frontend &amp; Backend</dt>
                <dd>Vue · Nuxt · Node.js</dd>
              </div>
              <div>
                <dt className="eyebrow">Cloud &amp; Delivery</dt>
                <dd>AWS · GitHub · Harness</dd>
              </div>
              <div>
                <dt className="eyebrow">Applied AI</dt>
                <dd>Amazon Bedrock · MCP · LiteLLM · MLX</dd>
              </div>
              <div>
                <dt className="eyebrow">Testing</dt>
                <dd>Playwright · Vitest · Jest</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
