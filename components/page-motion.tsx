'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import { motionTiming } from '@/lib/motion';

export function PageMotion() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useLayoutEffect(() => {
    const changedPage = previous.current !== pathname;
    previous.current = pathname;

    const main = document.getElementById('main-content');
    if (!main || typeof main.animate !== 'function') return;

    const preference = window.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    );
    const timing = motionTiming();
    const active = new Map<Element, Animation>();
    const revealed = new Set<Element>();
    const waiting = new Set<Element>();
    let observer: IntersectionObserver | undefined;

    function animate(
      element: Element,
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
    ) {
      const animation = element.animate(frames, {
        easing: timing.easing,
        ...options,
      });
      active.set(element, animation);
      animation.addEventListener('finish', () => active.delete(element), {
        once: true,
      });
    }

    function stop() {
      observer?.disconnect();
      active.forEach((animation) => animation.cancel());
      active.clear();
      waiting.forEach((element) => element.classList.remove('reveal-waiting'));
      waiting.clear();
    }

    function observe() {
      stop();
      if (!main || !preference.matches || !('IntersectionObserver' in window))
        return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            if (!isIntersecting) continue;
            observer?.unobserve(target);
            target.classList.remove('reveal-waiting');
            waiting.delete(target);
            revealed.add(target);
            if (target.matches(':focus-within')) continue;
            const order =
              Number(target.getAttribute('data-scroll-reveal')) || 0;
            animate(
              target,
              [
                { opacity: 0.72, transform: 'translateY(12px)' },
                { opacity: 1, transform: 'none' },
              ],
              {
                duration: timing.reveal,
                delay: order * timing.stagger,
                fill: 'backwards',
              },
            );
          }
        },
        { rootMargin: '0px 0px -52px 0px' },
      );

      // Start with a completely settled first viewport, including restored scroll positions.
      const upcoming = [
        ...main.querySelectorAll('[data-scroll-reveal]'),
      ].filter(
        (element) =>
          !revealed.has(element) &&
          element.getBoundingClientRect().top >= window.innerHeight,
      );
      for (const element of upcoming) {
        element.classList.add('reveal-waiting');
        waiting.add(element);
        observer.observe(element);
      }
    }

    function showFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('.reveal-waiting');
      if (target) {
        observer?.unobserve(target);
        waiting.delete(target);
        revealed.add(target);
        target.classList.remove('reveal-waiting');
      }
      for (const [element, animation] of active) {
        if (element.contains(event.target)) {
          animation.cancel();
          active.delete(element);
        }
      }
    }

    observe();
    if (changedPage && preference.matches && !window.location.hash) {
      const intro = main.querySelector('[data-page-entry]');
      const title = intro?.querySelector('h1');
      const lede = intro?.querySelector('.lede');
      if (title) {
        animate(
          title,
          [
            { opacity: 0.69, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: timing.duration,
          },
        );
      }
      if (lede) {
        animate(
          lede,
          [
            { opacity: 0.8, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: timing.duration,
            delay: timing.stagger,
            fill: 'backwards',
          },
        );
      }
    }

    preference.addEventListener('change', observe);
    main.addEventListener('focusin', showFocusedContent);
    return () => {
      preference.removeEventListener('change', observe);
      main.removeEventListener('focusin', showFocusedContent);
      stop();
    };
  }, [pathname]);

  return null;
}
