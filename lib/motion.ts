export function motionTiming() {
  const style = getComputedStyle(document.documentElement);

  function milliseconds(property: string) {
    const time = style.getPropertyValue(property).trim();
    // Production CSS may serialize a millisecond value in seconds.
    return (
      Number.parseFloat(time) *
      (time.endsWith('s') && !time.endsWith('ms') ? 1000 : 1)
    );
  }

  return {
    duration: milliseconds('--motion-content'),
    reveal: milliseconds('--motion-reveal'),
    stagger: milliseconds('--motion-stagger'),
    easing: style.getPropertyValue('--ease-out').trim(),
  };
}
