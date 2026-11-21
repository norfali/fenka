export type FocusIconKind = 'connections' | 'terminal' | 'layers';

export function FocusIcon({ kind }: { kind: FocusIconKind }) {
  return (
    <span className="focus-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {kind === 'connections' && (
          <>
            <path d="M6.25 12H9.5L16 6.5M9.5 12l6.5 5.5" opacity=".36" />
            <path
              className="focus-signal"
              d="M6.25 12H9.5L16 6.5"
              pathLength="1"
            />
            <path
              className="focus-signal"
              d="M6.25 12H9.5L16 17.5"
              pathLength="1"
            />
            <circle cx="4.5" cy="12" r="1.75" fill="currentColor" stroke="none" />
            <circle cx="18" cy="6.5" r="2" />
            <circle cx="18" cy="17.5" r="2" />
          </>
        )}
        {kind === 'terminal' && (
          <>
            <path d="m4.5 7.5 4.5 4.5-4.5 4.5" />
            <path className="focus-command" d="M12.25 15.75h5" opacity=".5" />
            <path className="focus-caret" d="M15 10v7" />
          </>
        )}
        {kind === 'layers' && (
          <>
            <path
              className="focus-layer-base"
              d="m4 14.75 8 4.5 8-4.5"
              opacity=".54"
            />
            <path d="m4 11.5 8 4.5 8-4.5" opacity=".76" />
            <path
              className="focus-layer-top"
              d="M4 8.25 12 3.75 20 8.25 12 12.75Z"
            />
          </>
        )}
      </svg>
    </span>
  );
}
