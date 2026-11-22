import { JournalList, PageIntro } from '@/components/editorial';
import { journalEntries } from '@/lib/journal';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  'Writing',
  'Notes on building software, experimenting with AI and mapping London by Nad Orfali.',
  '/writing/',
);

export default function Writing() {
  return (
    <>
      <PageIntro label="Essays and notes" title="Writing">
        <p>
          Notes from things I’m building, experiments I’m running and questions
          I keep coming back to.
        </p>
      </PageIntro>
      <div className="journal-index">
        <JournalList entries={journalEntries()} heading="h2" />
      </div>
    </>
  );
}
