'use client';

import { useState, type ReactNode } from 'react';

export function TestimonialDisclosure({
  featured,
  children,
}: {
  featured: ReactNode;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="section-heading testimonial-heading">
        <h2 className="display" id="testimonials">
          Kind words
        </h2>
        <button
          type="button"
          className="text-link"
          aria-expanded={expanded}
          aria-controls="remaining-testimonials"
          onClick={() => setExpanded((open) => !open)}
        >
          All testimonials
        </button>
      </div>
      <div className="testimonial-featured">{featured}</div>
      <div
        className="testimonial-more"
        id="remaining-testimonials"
        hidden={!expanded}
      >
        {children}
      </div>
    </>
  );
}
