import { PageIntro, ProjectCards } from '@/components/editorial';
import { pageMetadata } from '@/lib/site';

const description =
  "Things I've built, experiments I've tried and ideas that got a little out of hand.";

export const metadata = pageMetadata('Projects', description, '/projects/');

export default function Projects() {
  return (
    <>
      <PageIntro label="Work and experiments" title="Projects">
        <p>{description}</p>
      </PageIntro>
      <div className="home-section">
        <ProjectCards includeIndependent heading="h2" />
      </div>
    </>
  );
}
