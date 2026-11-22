import { TestimonialDisclosure } from '@/components/testimonial-disclosure';
import { testimonials } from '@/lib/testimonials';

function Testimonial({
  quote,
  name,
  affiliation,
  location,
}: (typeof testimonials)[number]) {
  return (
    <figure className="testimonial-row">
      <figcaption>
        {location && <span className="eyebrow">{location}</span>}
        <span>{name}</span>
        {affiliation && <span>{affiliation}</span>}
      </figcaption>
      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const featured = testimonials.slice(0, 2);
  const remaining = testimonials.slice(2);

  return (
    <section
      className="home-section testimonials-section"
      aria-labelledby="testimonials"
    >
      <TestimonialDisclosure
        featured={featured.map((item) => (
          <Testimonial key={item.name} {...item} />
        ))}
      >
        {remaining.map((item) => (
          <Testimonial key={item.name} {...item} />
        ))}
      </TestimonialDisclosure>
    </section>
  );
}
