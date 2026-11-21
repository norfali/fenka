'use client';

import { useEffect, useRef } from 'react';

const ribs = [
  [0, 126, 38, 73, 95, -3, 181, 29, 241, 92],
  [10, 161, 52, 111, 108, 31, 198, 61, 256, 121],
  [20, 199, 64, 150, 120, 65, 215, 95, 268, 153],
  [28, 239, 75, 191, 134, 101, 231, 132, 280, 188],
  [34, 281, 83, 231, 148, 138, 245, 172, 288, 225],
  [37, 323, 90, 271, 163, 177, 257, 214, 290, 263],
];

function Vault({ interior = false }: { interior?: boolean }) {
  const stations = interior ? ribs.slice(1, 5) : ribs;
  return (
    <>
      {stations.map(([ax, ay, bx, by, cx, cy, dx, dy, ex, ey]) => (
        <path
          key={ay}
          d={`M${ax} ${ay} ${bx} ${by}Q${cx} ${cy} ${dx} ${dy}L${ex} ${ey}`}
        />
      ))}
      {[0, 2, 6, 8].map((column) => (
        <polyline
          key={column}
          points={stations
            .map((rib) => `${rib[column]},${rib[column + 1]}`)
            .join(' ')}
        />
      ))}
    </>
  );
}

export function ArchitecturalAtmosphere() {
  const field = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = field.current;
    if (!svg) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const wide = matchMedia('(min-width: 760px)');
    const plates = Array.from(
      svg.querySelectorAll<SVGGElement>('[data-plate]'),
    );
    const signals = Array.from(
      svg.querySelectorAll<SVGCircleElement>('[data-signal]'),
    ).map((point, index) => {
      const path = svg.querySelectorAll<SVGPathElement>('[data-thread]')[index];
      return { point, path, length: path.getTotalLength() };
    });

    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let progress = 0;
    let target = 0;
    let measureScroll = true;

    function paint(now: number) {
      const delta = now - last;
      if (delta >= 32) {
        if (measureScroll) {
          const range = document.documentElement.scrollHeight - innerHeight;
          target = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
          measureScroll = false;
        }
        elapsed += Math.min(delta, 80) / 1000;
        last = now;
        progress += (target - progress) * (1 - Math.exp(-delta / 255));

        plates.forEach((plate, index) => {
          const side = index < 3 ? -1 : 1;
          const layer = index % 3;
          const phase = elapsed / (7.7 + index * 1.3) + index * 1.48;
          const x =
            side * progress * (layer - 1) * 30 + Math.sin(phase) * (3 + layer);
          const y = -progress * (50 + layer * 43) + Math.cos(phase * 0.79) * 8;
          plate.setAttribute(
            'transform',
            `translate(${x.toFixed(2)} ${y.toFixed(2)})`,
          );
          plate.style.opacity = String(
            0.7 + 0.22 * Math.sin(phase * 0.6 + progress * Math.PI),
          );
        });

        signals.forEach(({ point, path, length }, index) => {
          const journey = ((elapsed + 3 + index * 14) % (37 + index * 10)) / 19;
          if (journey >= 1) {
            point.style.opacity = '0';
            return;
          }
          const position = path.getPointAtLength(journey * length);
          point.setAttribute('cx', position.x.toFixed(2));
          point.setAttribute('cy', position.y.toFixed(2));
          point.style.opacity = String(0.68 * Math.sin(journey * Math.PI) ** 2);
        });
      }
      frame = requestAnimationFrame(paint);
    }

    function sync() {
      cancelAnimationFrame(frame);
      if (reduced.matches || !wide.matches || document.hidden) {
        signals.forEach(({ point }) => {
          point.style.opacity = '0';
        });
        return;
      }
      measureScroll = true;
      last = performance.now();
      frame = requestAnimationFrame(paint);
    }

    function onScroll() {
      measureScroll = true;
    }

    sync();
    const resize = new ResizeObserver(onScroll);
    resize.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    wide.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      wide.removeEventListener('change', sync);
    };
  }, []);

  return (
    <svg
      className="architecture-atmosphere"
      ref={field}
      viewBox="0 0 1440 940"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="architecture-edges">
          <stop offset="0" stopColor="white" stopOpacity=".77" />
          <stop offset=".065" stopColor="white" />
          <stop offset=".135" stopColor="white" stopOpacity=".44" />
          <stop offset=".26" stopColor="white" stopOpacity=".08" />
          <stop offset=".44" stopColor="white" stopOpacity=".025" />
          <stop offset=".56" stopColor="white" stopOpacity=".025" />
          <stop offset=".74" stopColor="white" stopOpacity=".08" />
          <stop offset=".865" stopColor="white" stopOpacity=".44" />
          <stop offset=".935" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity=".77" />
        </linearGradient>
        <mask id="architecture-edge-mask" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#architecture-edges)" />
        </mask>
      </defs>
      <g mask="url(#architecture-edge-mask)">
        <g className="architecture-threads">
          <path
            data-thread
            d="M-24 281C93 307 169 171 298 190S538 285 718 251 999 301 1169 225 1305 163 1466 251"
          />
          <path
            data-thread
            d="M1460 671C1291 567 1180 736 1043 730S826 609 671 659 432 715 261 623 94 568 -25 658"
          />
          <path d="M-12 420C134 442 194 356 345 400S584 541 735 470 946 437 1100 494 1319 459 1451 462" />
          <path d="M-44 817C92 844 202 777 325 768S516 848 728 805 994 823 1135 810 1345 725 1470 783" />
        </g>
        <g transform="translate(-42 128)">
          <g data-plate className="architecture-sage">
            <Vault />
          </g>
          <g transform="translate(18 182)">
            <g data-plate className="architecture-cyan">
              <Vault interior />
            </g>
          </g>
          <g transform="translate(-46 590) scale(.86 1.05) rotate(-8 130 164)">
            <g data-plate className="architecture-warm">
              <Vault />
            </g>
          </g>
        </g>
        <g transform="translate(1480 45) scale(-1.03 1)">
          <g data-plate className="architecture-cyan">
            <Vault />
          </g>
          <g transform="translate(14 158) rotate(-13 136 160)">
            <g data-plate className="architecture-sage">
              <Vault interior />
            </g>
          </g>
          <g transform="translate(-5 597) scale(1.06 .92) rotate(9 130 164)">
            <g data-plate className="architecture-warm">
              <Vault />
            </g>
          </g>
        </g>
        <circle data-signal r="1.6" fill="#a8d4cf" opacity="0" />
        <circle data-signal r="1.5" fill="#d4aa8c" opacity="0" />
      </g>
    </svg>
  );
}
