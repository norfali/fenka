import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const browserIssues = new WeakMap<Page, string[]>();

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

  await page.getByRole('link', { name: 'Developer platforms' }).click();
  await expect(page).toHaveURL('/about/#developer-platforms');
  await expect(
    page.getByRole('heading', { name: 'Developer platforms' }),
  ).toBeInViewport();
  await page.goBack();
  await page.getByRole('link', { name: 'Explore projects' }).click();
  await expect(page).toHaveURL('/#selected-work');

  await page.getByRole('link', { name: 'AI Playground' }).click();
  await expect(page).toHaveURL('/projects/ai-playground/');
  await expect(page.getByRole('heading', { name: 'RagLab' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'View AI Playground on GitHub' }),
  ).toBeVisible();

  const atlas = await page.goto('/projects/london-ai-atlas/');
  expect(atlas?.status()).toBe(200);
  await expect(
    page.getByRole('img', { name: /Old Street and Shoreditch/ }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'OpenStreetMap contributors' }),
  ).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Applied AI in engineering' }),
  ).toBeVisible();
  const toolkit = page.getByRole('region', { name: 'Tools I work with' });
  await expect(toolkit).toContainText('MCP, MLX LM, Whisper');
  await expect(toolkit).toContainText('Playwright, Vitest, pytest');
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(
    page.getByRole('region', { name: 'Frontend architecture', exact: true }),
  ).toContainText('before joining Morningstar');
});

test('writing drafts are readable and excluded from discovery', async ({
  page,
  request,
}) => {
  await page.goto('/writing/');
  await expect(
    page.getByRole('heading', { name: 'Writing', exact: true }),
  ).toBeVisible();
  await expect(page.locator('footer a[href="/feed.xml"]')).toHaveCount(0);
  await expect(
    page.locator('link[rel="alternate"][href="/feed.xml"]'),
  ).toHaveCount(1);
  await page
    .getByRole('link', { name: 'Mapping London’s AI ecosystem' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Mapping London’s AI ecosystem',
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

  await page.getByRole('link', { name: 'All writing' }).click();
  await page
    .getByRole('link', { name: 'Learning AI by building things' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'A small reference goes a long way' }),
  ).toBeVisible();

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
      'Developer platforms',
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
    await link.focus();
    await expect
      .poll(() =>
        detail.evaluate(
          (el) => el.getAnimations()[0]?.effect?.getTiming().duration,
        ),
      )
      .toBe(460);
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
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

const pages = [
  '/',
  '/about/',
  '/projects/',
  '/projects/ai-playground/',
  '/projects/london-ai-atlas/',
  '/writing/',
  '/writing/learning-ai-by-building-things/',
  '/writing/mapping-londons-ai-ecosystem/',
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
