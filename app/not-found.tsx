import Link from 'next/link';
import { PageIntro } from '@/components/editorial';

export default function NotFound() {
  return (
    <>
      <PageIntro label="404" title="Page not found">
        <p>This address doesn’t lead to a page on Fenka.</p>
      </PageIntro>
      <Link className="button-link" href="/">
        Back to Fenka
      </Link>
    </>
  );
}
