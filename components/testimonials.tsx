import Link from 'next/link';
import { testimonials } from '@/lib/testimonials';

function Testimonial({
  quote,
  attribution,
  affiliation,
  location,
}: (typeof testimonials)[number]) {
  return (
    <figure
      className="testimonial-row"
      data-long-quote={quote.length > 300 || undefined}
    >
      <figcaption>
        {location && <span className="eyebrow">{location}</span>}
        <span className="testimonial-attribution">{attribution}</span>
        {affiliation && <span>{affiliation}</span>}
      </figcaption>
      <blockquote>
        <span className="testimonial-ornament" aria-hidden="true">
          “
        </span>
        {quote.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
    </figure>
  );
}

export function TestimonialList({ entries }: { entries: typeof testimonials }) {
  return (
    <div className="testimonial-list">
      {entries.map((item) => (
        <Testimonial key={item.attribution} {...item} />
      ))}
    </div>
  );
}

export function FeaturedTestimonials() {
  const featured = testimonials.slice(0, 2).map((item) => ({
    ...item,
    quote: item.homeQuote ? `[…] ${item.homeQuote} […]` : item.quote,
  }));

  return (
    <section
      className="home-section testimonials-section"
      aria-labelledby="testimonials"
    >
      <div className="section-heading testimonial-heading">
        <h2 className="display" id="testimonials">
          Kind words
        </h2>
        <Link className="text-link" href="/testimonials/">
          All testimonials
        </Link>
      </div>
      <TestimonialList entries={featured} />
    </section>
  );
}
