import 'server-only';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export type JournalEntry = {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
  topic: string;
  date: string;
  draft: boolean;
  project?: string;
  body: string;
  readingTime: number;
};

const directory = join(process.cwd(), 'content', 'journal');

export function journalEntries({
  includeDrafts = process.env.FENKA_INCLUDE_DRAFTS !== '0',
} = {}): JournalEntry[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(join(directory, file), 'utf8').replaceAll(
        '\r\n',
        '\n',
      );
      const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
      if (!match) throw new Error(`Missing journal front matter in ${file}`);
      const [, frontMatter, body] = match;
      const { title, description, subtitle, topic, date, draft, project } =
        parse(frontMatter) ?? {};
      if (
        ![title, description, topic, date].every(
          (value) => typeof value === 'string' && value.trim(),
        ) ||
        ![subtitle, project].every(
          (value) =>
            value === undefined || (typeof value === 'string' && value.trim()),
        ) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date ||
        typeof draft !== 'boolean' ||
        !body.trim() ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(file)
      ) {
        throw new Error(`Invalid journal entry in ${file}`);
      }
      return {
        slug: file.slice(0, -3),
        title,
        description,
        subtitle,
        topic,
        date,
        draft,
        project,
        body,
        readingTime: Math.ceil(body.trim().split(/\s+/).length / 225),
      };
    })
    .filter((entry) => includeDrafts || !entry.draft)
    .sort(
      (first, second) =>
        second.date.localeCompare(first.date) ||
        first.slug.localeCompare(second.slug),
    );
}

export function journalEntry(slug: string) {
  return journalEntries().find((entry) => entry.slug === slug);
}

export function formatJournalDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
