import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const browserIssues = new WeakMap<Page, string[]>();
const atlasTitle =
  "I started mapping London's AI companies. Then I built a miniature London.";
const atlasDescription =
  'How mapping London’s AI workplaces turned into a miniature city with moving trains and an experimental AI research workflow.';

test.beforeEach(({ page }) => {
  const issues: string[] = [];
  browserIssues.set(page, issues);
  page.on('pageerror', (error) => issues.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning')
      issues.push(message.text());
  });
});

test.afterEach(({ page }) => {
  expect(
    browserIssues.get(page),
    'Browser console and uncaught errors',
  ).toEqual([]);
});

test('navigation and project details work on the static site', async ({
  page,
}) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Hi, I’m Nad\.\s*From design systems to intelligent systems\./,
  );
  await expect(page.locator('.home-hero')).not.toContainText('Morningstar');
  await expect(
    page.getByRole('heading', { name: 'Frontend Architecture' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'GitHub' }).first(),
  ).toHaveAttribute('href', 'https://github.com/norfali');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://fenka.co.uk/images/fenka-social.png',
  );
  expect((await page.request.get('/images/fenka-social.png')).ok()).toBe(true);

  await page.getByRole('link', { name: 'Developer Platforms' }).click();
  await expect(page).toHaveURL('/about/#developer-platforms');
  const developerPlatforms = page.locator('#developer-platforms');
  await expect(developerPlatforms).toContainText('Over time, my focus expanded into developer platforms');
  await expect(developerPlatforms).toBeInViewport();
  await page.goBack();
  await page.getByRole('link', { name: 'Explore projects' }).click();
  await expect(page).toHaveURL('/#selected-work');

  await page.getByRole('link', { name: 'AI Playground' }).click();
  await expect(page).toHaveURL('/projects/ai-playground/');
  for (const name of ['RagLab', 'SpeechLab', 'Evaluation']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  const playgroundIntro = page.locator('.page-intro');
  await expect(playgroundIntro.locator('.technical-list li')).toHaveText([
    'Python',
    'MLX',
    'Local LLMs',
    'RAG',
    'Embeddings',
    'Whisper',
    'Evaluation',
  ]);
  const github = playgroundIntro.getByRole('link', {
    name: 'View AI Playground on GitHub',
  });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute('href', 'https://github.com/norfali/ai-playground');
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.getByRole('link', { name: 'View AI Playground on GitHub' })).toHaveCount(1);

  const atlas = await page.goto('/projects/london-ai-atlas/');
  expect(atlas?.status()).toBe(200);
  await expect(page.locator('.technical-list li')).toHaveText([
    'TypeScript',
    'PixiJS',
    'OpenStreetMap',
    'AI Agents',
    'Tavily',
    'Geoapify',
    'Python',
    'MLX',
  ]);
  for (const name of [
    'Building a miniature London',
    'AI-assisted company research',
    'Keeping the map accurate',
  ]) {
    await expect(page.getByRole('heading', { name })).toBeVisible();
  }
  await expect(
    page.getByRole('img', { name: /Old Street and Shoreditch/ }),
  ).toBeVisible();
  const explore = page.getByRole('link', { name: 'Explore London AI Atlas ↗' });
  await expect(explore).toHaveAttribute('href', 'https://atlas.fenka.co.uk/');
  await expect(explore).toHaveAttribute('target', '_blank');
  await expect(explore).toHaveAttribute('rel', 'noopener noreferrer');
  expect((await page.request.get('/images/london-ai-atlas.webp')).ok()).toBe(true);
  const attribution = page.getByRole('link', { name: 'OpenStreetMap contributors' });
  await expect(attribution).toBeVisible();
  await expect(attribution).toHaveAttribute('href', 'https://www.openstreetmap.org/copyright');
  await expect(attribution).toHaveAttribute('target', '_blank');
  await expect(attribution).toHaveAttribute('rel', 'noopener noreferrer');

  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("Hi, I'm Nad.");
  await expect(page.locator('.article-layout .prose').getByRole('heading')).toHaveText([
    'From the early days of the web',
    'Building foundations',
    'Applied AI in engineering',
    'Fenka, then and now',
    'Working with people',
  ]);
  const toolkit = page.getByRole('region', { name: 'Technical toolkit' });
  await expect(toolkit.locator('dd')).toHaveText([
    'TypeScript · JavaScript · Python',
    'Vue · Nuxt · Node.js',
    'AWS · GitHub · Harness',
    'Amazon Bedrock · MCP · LiteLLM · MLX',
    'Playwright · Vitest · Jest',
  ]);
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(
    page.getByRole('region', { name: 'From the early days of the web' }),
  ).toContainText('Before joining Morningstar');
  const fenka = page.getByRole('region', { name: 'Fenka, then and now' });
  await expect(fenka.getByRole('link', { name: 'MyRolora' })).toHaveAttribute(
    'href',
    'https://myrolora.com/',
  );
  await expect(fenka.getByRole('link', { name: 'Ugly Game Awards' })).toHaveAttribute(
    'href',
    'https://www.uglygameawards.com/',
  );
  await expect(page).toHaveTitle('About Nadhim Orfali · Fenka');
  const profile = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '');
  expect(profile.mainEntity).toMatchObject({
    name: 'Nadhim Orfali',
    sameAs: ['https://github.com/norfali', 'https://uk.linkedin.com/in/norfali'],
  });
  await expect(page.getByRole('link', { name: 'Find me on LinkedIn' })).toHaveAttribute(
    'href',
    'https://uk.linkedin.com/in/norfali',
  );
});

test('the Atlas draft is readable and RSS remains discoverable', async ({
  page,
  request,
}) => {
  await page.goto('/writing/');
  await expect(
    page.getByRole('heading', { name: 'Writing', exact: true }),
  ).toBeVisible();
  await expect(page.locator('a[href="/feed.xml"]')).toHaveCount(0);
  await expect(
    page.locator('link[rel="alternate"][href="/feed.xml"]'),
  ).toHaveCount(1);
  await expect(page.getByText(atlasDescription, { exact: true })).toBeVisible();
  await page.getByRole('link', { name: atlasTitle, exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(atlasTitle);
  await expect(page.locator('.article-intro')).toContainText('Data Visualisation');
  await expect(page.locator('.article-intro')).toContainText('4 min read');
  await expect(page.locator('.article-intro .lede em')).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    atlasDescription,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    atlasTitle,
  );
  await expect(page.getByText('Draft for review')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://fenka.co.uk/writing/mapping-londons-ai-ecosystem/',
  );
  await page.getByRole('link', { name: 'London AI Atlas', exact: true }).click();
  await expect(page).toHaveURL('/projects/london-ai-atlas/');
  const related = page.locator('section.related');
  await expect(related.getByRole('heading')).toHaveText('Want to know more?');
  await expect(related).toContainText(
    "There's a bit more to the story, from building miniature London to getting AI agents to help track down company offices.",
  );
  await expect(related.getByText('Draft', { exact: true })).toHaveCount(0);
  await related.getByRole('link', { name: `${atlasTitle} ↗`, exact: true }).click();
  await expect(page).toHaveURL('/writing/mapping-londons-ai-ecosystem/');

  const sitemapResponse = await request.get('/sitemap.xml');
  const feedResponse = await request.get('/feed.xml');
  const robotsResponse = await request.get('/robots.txt');
  for (const response of [sitemapResponse, feedResponse, robotsResponse])
    expect(response.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const feed = await feedResponse.text();
  expect(sitemap).toContain('https://fenka.co.uk/projects/london-ai-atlas/');
  expect(sitemap).toContain('https://fenka.co.uk/writing/');
  expect(feed).toContain('<title>Fenka Writing</title>');
  expect(await robotsResponse.text()).toContain(
    'https://fenka.co.uk/sitemap.xml',
  );
  for (const content of [sitemap, feed]) {
    expect(content).not.toContain('mapping-londons-ai-ecosystem');
    expect(content).not.toContain('learning-ai-by-building-things');
  }
});

test('Projects shows four cards in order and shares featured card copy with home', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const projects = [
    {
      title: 'AI Playground',
      href: '/projects/ai-playground/',
      summary: 'Local AI experiments, retrieval, transcription and model evaluation.',
      technologies: ['Python', 'Local LLMs', 'RAG', 'LLM Evaluation'],
    },
    {
      title: 'London AI Atlas',
      href: '/projects/london-ai-atlas/',
      summary: 'An interactive miniature London, with AI agents helping research where companies work.',
      technologies: ['TypeScript', 'PixiJS', 'AI Agents', 'Tavily'],
    },
    {
      title: 'MyRolora',
      href: 'https://myrolora.com',
      summary: 'A dedicated place to organise job applications and track their progress.',
      technologies: ['Next.js', 'TypeScript', 'Supabase'],
    },
    {
      title: 'Ugly Game Awards',
      href: 'https://www.uglygameawards.com/',
      summary: "A football fan vote celebrating the beautiful game's less beautiful moments.",
      technologies: ['Next.js', 'TypeScript', 'Supabase'],
    },
  ];

  for (const path of ['/projects/', '/']) {
    await page.goto(path);
    const isListing = path === '/projects/';
    const expected = isListing ? projects : projects.slice(0, 2);
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(expected.length);
    await expect(cards.getByRole('heading')).toHaveText(expected.map(({ title }) => title));
    for (const { title, href, summary, technologies } of expected) {
      const card = cards.filter({ has: page.getByRole('heading', { name: title }) });
      await expect(card.getByRole('link', { name: title })).toHaveAttribute('href', href);
      await expect(card.locator('.card-summary')).toHaveText(summary);
      await expect(card.locator('.technical-list li')).toHaveText(technologies);
    }
    if (isListing) {
      await expect(page.locator('.page-intro .lede')).toHaveText(
        "Things I've built, experiments I've tried and ideas that got a little out of hand.",
      );
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(
        expected.map(({ title }) => title),
      );
      const grid = page.locator('.grid').filter({ has: cards.first() });
      await expect(grid.locator(':scope > .project-card')).toHaveCount(4);
      const columns = await grid.evaluate((element) =>
        getComputedStyle(element).gridTemplateColumns.split(' ').length,
      );
      expect(columns).toBe(await page.evaluate(() => innerWidth >= 768 ? 2 : 1));
    }
  }
});

test('published Applied AI articles are listed and linked to AI Playground', async ({
  page,
  request,
}) => {
  const articles = [
    {
      title: 'RAG sounds simple. Until you look under the bonnet.',
      slug: 'rag-sounds-simple',
      experiment: 'RagLab',
      description:
        'Finding the right information is only half the battle. A closer look at retrieval, local generation and what happens when things go wrong.',
    },
    {
      title: "When almost right isn't quite right.",
      slug: 'when-almost-right-isnt-quite-right',
      experiment: 'SpeechLab',
      description:
        "A convincing transcript isn't necessarily an accurate one. Exploring word error rates, reference transcripts and the mistakes that matter.",
    },
  ];
  const project = '/projects/ai-playground/';
  const supersededPath = '/writing/learning-ai-by-building-things/';
  expect((await request.get(supersededPath)).status()).toBe(404);

  await page.goto('/');
  const writing = page.getByRole('region', { name: 'Writing', exact: true });
  await expect(writing.getByRole('article')).toHaveCount(3);
  await expect(
    writing.getByRole('link', { name: atlasTitle, exact: true }),
  ).toBeVisible();
  await expect(writing.getByText(atlasDescription, { exact: true })).toBeVisible();
  for (const { title, slug, description } of articles) {
    await expect(
      writing.getByRole('link', { name: title, exact: true }),
    ).toHaveAttribute('href', `/writing/${slug}/`);
    await expect(writing.getByText(description, { exact: true })).toBeVisible();
  }
  await writing.getByRole('link', { name: 'All entries' }).click();
  await expect(page).toHaveURL('/writing/');
  await expect(page.getByRole('article')).toHaveCount(3);
  await expect(page.locator(`a[href="${supersededPath}"]`)).toHaveCount(0);

  const sitemap = await (await request.get('/sitemap.xml')).text();
  const feed = await (await request.get('/feed.xml')).text();
  for (const { title, slug, experiment, description } of articles) {
    const path = `/writing/${slug}/`;
    const canonical = `https://fenka.co.uk${path}`;
    expect(sitemap).toContain(canonical);
    expect(feed).toContain(canonical);
    expect((await request.get(path)).status()).toBe(200);
    await expect(page.getByText(description, { exact: true })).toBeVisible();
    await page.getByRole('link', { name: title, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('.article-intro')).toContainText('Applied AI');
    await expect(page.locator('.article-intro')).toContainText('3 min read');
    await expect(page.locator('.article-intro .lede em')).toBeVisible();
    await expect(
      page.locator('.prose strong', { hasText: experiment }),
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      canonical,
    );
    await page.getByRole('link', { name: 'AI Playground', exact: true }).click();
    await expect(page).toHaveURL(project);
    const related = page.locator('section.related');
    await expect(related.getByRole('heading')).toHaveText('Want to know more?');
    await expect(related).toContainText(
      "I've written a little more about the experiments, including what worked, what didn't and what I discovered along the way.",
    );
    await related.getByRole('link', { name: title, exact: true }).click();
    await expect(page).toHaveURL(path);
    await page.getByRole('link', { name: 'All writing' }).click();
    await expect(page).toHaveURL('/writing/');
  }
});

test('dark is the only theme and reduced motion leaves the site still', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveCount(0);
  await expect(page.locator('.routing-study')).toHaveCount(0);
  await expect(page.locator('.hero-name')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('footer button')).toHaveCount(0);
});

test('architectural artwork follows the page and rests with reduced motion', async ({
  page,
}) => {
  await page.goto('/');
  const art = page.locator('.architecture-atmosphere');
  await expect(art).toHaveAttribute('aria-hidden', 'true');
  await expect(art).toHaveCSS('pointer-events', 'none');

  if (await page.evaluate(() => innerWidth < 760)) {
    await expect(art).toBeHidden();
    return;
  }

  const plate = art.locator('[data-plate]').nth(2);
  await expect(plate).toHaveAttribute('transform', /translate/);
  const initial = await plate.getAttribute('transform');
  await expect.poll(() => plate.getAttribute('transform')).not.toBe(initial);
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await expect
    .poll(async () => {
      const value = await plate.getAttribute('transform');
      return Number(value?.match(/ ([-.0-9]+)\)/)?.[1]);
    })
    .toBeLessThan(-110);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(art.locator('[data-signal]').first()).toHaveCSS('opacity', '0');
  const frozen = await plate.getAttribute('transform');
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        scrollTo(0, 0);
        let count = 0;
        const sample = () =>
          ++count === 12 ? resolve() : requestAnimationFrame(sample);
        requestAnimationFrame(sample);
      }),
  );
  await expect(plate).toHaveAttribute('transform', frozen!);
});

test('engineering icons hold their active pose and settle on blur', async ({
  page,
}) => {
  await page.goto('/');
  const focus = page.getByRole('region', { name: 'Engineering focus' });
  const icons = [
    ['Applied AI', '.focus-signal', 'opacity', '0', '1'],
    [
      'Developer Platforms',
      '.focus-caret',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)',
      'matrix(1, 0, 0, 1, 3.75, 0)',
    ],
    [
      'Frontend Architecture',
      '.focus-layer-base',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)',
      'matrix(1, 0, 0, 1, 0, 2)',
    ],
  ];

  for (const [name, selector, property, rest, active] of icons) {
    const link = focus.getByRole('link', { name, exact: true });
    const detail = link
      .locator('xpath=ancestor::article')
      .locator(selector)
      .first();
    await expect(detail).toHaveCSS(property, rest);
    const duration = await detail.evaluate((element, property) => {
      const style = getComputedStyle(element);
      const index = style.transitionProperty.split(', ').indexOf(property);
      element.addEventListener('transitionrun', (event) => {
        if (
          event instanceof TransitionEvent &&
          event.target === element &&
          event.propertyName === property
        ) {
          element.setAttribute('data-focus-transition-started', 'true');
        }
      });
      return style.transitionDuration.split(', ')[index];
    }, property);
    expect(duration).toBe('0.46s');
    await link.focus();
    await expect(detail).toHaveAttribute('data-focus-transition-started', 'true');
    await expect(detail).toHaveCSS(property, active);
    expect(await detail.evaluate((el) => el.getAnimations().length)).toBe(0);
    await link.blur();
    await expect(detail).toHaveCSS(property, rest);
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [name, selector, property, rest] of icons) {
    const link = focus.getByRole('link', { name, exact: true });
    const detail = link
      .locator('xpath=ancestor::article')
      .locator(selector)
      .first();
    await link.focus();
    await expect(detail).toHaveCSS(
      property,
      property === 'transform' ? 'none' : rest,
    );
    expect(await detail.evaluate((el) => el.getAnimations().length)).toBe(0);
    await link.blur();
  }
});

test('testimonials expand by keyboard while the featured quotes stay in place', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.getByRole('region', { name: 'Kind words' });
  const toggle = section.getByRole('button', { name: 'All testimonials' });
  const featured = section.locator('.testimonial-featured');
  const remaining = section.locator('#remaining-testimonials');
  const chicago = featured.locator('figcaption').filter({ hasText: 'Chicago' });
  await expect(
    chicago.getByText('Former engineer', { exact: true }),
  ).toBeVisible();
  await expect(chicago.getByText('Morningstar', { exact: true })).toBeVisible();
  const milan = featured.locator('figcaption').filter({ hasText: 'Milan' });
  await expect(
    milan.getByText('Former colleague', { exact: true }),
  ).toBeVisible();
  await expect(featured.locator('blockquote:visible')).toHaveCount(2);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(remaining).toBeHidden();
  await expect(section.getByRole('button')).toHaveCount(1);

  await toggle.focus();
  await page.evaluate(() => document.fonts.ready);
  const quoteBounds = await featured.boundingBox();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(remaining.locator('blockquote:visible')).toHaveCount(6);
  await expect(remaining.getByText('Adam Maxwell')).toBeVisible();
  await expect(toggle).toBeFocused();
  expect(await featured.boundingBox()).toEqual(quoteBounds);
  expect(
    await remaining.evaluate((el) => el.getAnimations({ subtree: true })),
  ).toHaveLength(0);

  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(remaining).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('navigation keeps the same painted shell and only transitions the incoming introduction', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const header = page.locator('.site-header');
  const bounds = await header.boundingBox();
  const stableShell = await page.evaluateHandle(() => {
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    const root = document.documentElement;
    const field = document.querySelector('.architecture-atmosphere');
    const views: { tag: string; duration: number; delay: number }[] = [];
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      const animation = original.apply(this, args);
      const timing = animation.effect?.getTiming();
      if (timing)
        views.push({
          tag: this.matches('[data-page-entry] .lede') ? 'intro' : this.tagName,
          duration: Number(timing.duration),
          delay: timing.delay ?? 0,
        });
      return animation;
    };
    return { field, header, footer, root, views };
  });
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await nav.getByRole('link', { name: 'Writing' }).click();
  await expect(page).toHaveURL('/writing/');
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  expect(await header.boundingBox()).toEqual(bounds);
  expect(
    await stableShell.evaluate(({ field, header, footer, root, views }) => ({
      sameField: field === document.querySelector('.architecture-atmosphere'),
      sameHeader: header === document.querySelector('.site-header'),
      sameFooter: footer === document.querySelector('.site-footer'),
      sameDocument: root === document.documentElement,
      background: getComputedStyle(root).backgroundColor,
      views,
    })),
  ).toEqual({
    sameField: true,
    sameHeader: true,
    sameFooter: true,
    sameDocument: true,
    background: 'rgb(24, 30, 26)',
    views: [
      { tag: 'H1', duration: 385, delay: 0 },
      { tag: 'intro', duration: 385, delay: 55 },
    ],
  });

  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Hi, I’m Nad.',
  );
  expect(await header.boundingBox()).toEqual(bounds);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await stableShell.evaluate(({ views }) => {
    views.length = 0;
  });
  await nav.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL('/about/');
  expect(await stableShell.evaluate(({ views }) => views)).toEqual([]);
});

test('below-fold projects reveal and their artwork scales without moving the card', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const card = page.locator('.project-card').first();
  await card.evaluate((element) => {
    const original = element.animate.bind(element);
    element.animate = (...args) => {
      const animation = original(...args);
      element.setAttribute('data-animation-confirmed', JSON.stringify(args[0]));
      element.setAttribute(
        'data-duration-confirmed',
        String(animation.effect?.getTiming().duration),
      );
      return animation;
    };
  });
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute(
    'data-animation-confirmed',
    /translateY\(12px\)/,
  );

  await expect(card).toHaveAttribute('data-duration-confirmed', '460');

  if (await page.evaluate(() => matchMedia('(hover: hover)').matches)) {
    const atlas = page.locator('.project-card').last();
    await atlas.scrollIntoViewIfNeeded();
    await expect(atlas).toHaveCSS('transform', 'none');
    const bounds = await atlas.boundingBox();
    await atlas.getByRole('link', { name: 'London AI Atlas' }).hover();
    await expect(atlas.locator('.project-art')).toHaveCSS(
      'transform',
      'matrix(1.025, 0, 0, 1.025, 0, 0)',
    );
    expect(await atlas.boundingBox()).toEqual(bounds);
  }
});

test('keyboard navigation starts with the skip link', async ({ page }) => {
  await page.goto('/');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).not.toBeInViewport();
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport({ ratio: 1 });
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await expect(skipLink).not.toBeInViewport();
});

const pages = [
  '/',
  '/about/',
  '/projects/',
  '/projects/ai-playground/',
  '/projects/london-ai-atlas/',
  '/writing/',
  '/writing/mapping-londons-ai-ecosystem/',
  '/writing/rag-sounds-simple/',
  '/writing/when-almost-right-isnt-quite-right/',
];

for (const path of pages) {
  test(`accessibility and viewport fit on ${path}`, async ({ page }) => {
    await page.goto(path);
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      await page.emulateMedia({ reducedMotion });
      await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(
        result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        })),
      ).toEqual([]);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(page.viewportSize()!.width);
  });
}
