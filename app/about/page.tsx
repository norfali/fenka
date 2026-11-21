import Link from 'next/link';
import { PageIntro } from '@/components/editorial';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  'About Nad Orfali',
  'A London-based lead software engineer working across developer experience, engineering platforms and applied AI.',
  '/about/',
);

export default function About() {
  return (
    <>
      <PageIntro label="About" title="Nad Orfali">
        <p>
          I’m a lead software engineer in London. I started with the details of
          a web page and ended up working on many of the systems behind it. I
          still like being close enough to the code to see where things get
          awkward.
        </p>
      </PageIntro>
      <div className="article-layout">
        <div className="prose">
          <section aria-labelledby="journey">
            <h2 id="journey" className="display">
              Frontend architecture
            </h2>
            <p>
              I worked in frontend engineering before joining Morningstar. There
              I developed components, design tokens and shared foundations as
              the design system moved from HTML and JavaScript to Vue. Working
              across products meant that details such as keyboard behaviour and
              component APIs could affect more people than I’d ever meet.
            </p>
          </section>
          <section aria-labelledby="developer-platforms">
            <h2 id="developer-platforms" className="display">
              Developer platforms
            </h2>
            <p>
              That same attention to detail now goes into developer tooling,
              CI/CD and cloud infrastructure. I like following a problem all the
              way through, from a confusing local setup to a release pipeline
              that’s hard to debug. A clear failure message or a reliable test
              can make someone’s day considerably easier.
            </p>
          </section>
          <section aria-labelledby="applied-ai">
            <h2 id="applied-ai" className="display">
              Applied AI in engineering
            </h2>
            <p>
              I integrate language models and agent workflows into software
              engineering, including tool integration through Model Context
              Protocol (MCP). In AI-assisted testing, I look at whether a
              generated test would fail for the regression it’s meant to catch.
              Evaluations and traces give me a way to inspect what the model and
              its tools did across runs.
            </p>
          </section>
          <section aria-labelledby="own-time">
            <h2 id="own-time" className="display">
              On my own time
            </h2>
            <p>
              I build <Link href="/projects/ai-playground/">AI Playground</Link>{' '}
              to see what I can learn by running models locally and inspecting
              the results.{' '}
              <Link href="/projects/london-ai-atlas/">London AI Atlas</Link>{' '}
              started with a question about where AI teams work in the city.
              Once I’d built the map, I couldn’t resist drawing the miniature
              trains as well.
            </p>
            <p>
              I also make tools like MyRolora and less serious things like Ugly
              Game Awards, a fan vote for football’s less dignified moments.
            </p>
          </section>
        </div>
        <div className="about-sidebar">
          <section className="toolkit" aria-labelledby="toolkit">
            <h2 className="item-title" id="toolkit">
              Tools I work with
            </h2>
            <dl>
              <div>
                <dt className="eyebrow">Languages</dt>
                <dd>TypeScript, JavaScript, Python</dd>
              </div>
              <div>
                <dt className="eyebrow">Web</dt>
                <dd>Vue, Node.js</dd>
              </div>
              <div>
                <dt className="eyebrow">Delivery and cloud</dt>
                <dd>AWS, GitHub, Harness</dd>
              </div>
              <div>
                <dt className="eyebrow">Applied AI</dt>
                <dd>MCP, MLX LM, Whisper</dd>
              </div>
              <div>
                <dt className="eyebrow">Automated testing</dt>
                <dd>Playwright, Vitest, pytest</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
