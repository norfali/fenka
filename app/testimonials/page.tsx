import { PageIntro } from '@/components/editorial';
import { TestimonialList } from '@/components/testimonials';
import { pageMetadata } from '@/lib/site';
import { testimonials } from '@/lib/testimonials';

export const metadata = pageMetadata(
  'Testimonials',
  'Testimonials from colleagues and clients who have worked with Nad Orfali.',
  '/testimonials/',
);

export default function Testimonials() {
  return (
    <>
      <PageIntro label="Kind words" title="Testimonials">
        <p>
          I've been lucky enough to work with some brilliant people over the
          years. Here are a few things they've said about working with me.
        </p>
      </PageIntro>
      <div className="testimonials-section testimonials-page">
        <TestimonialList entries={testimonials} />
      </div>
    </>
  );
}
