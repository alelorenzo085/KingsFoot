/**
 * Motion tokens for JS-driven animation (WAAPI `element.animate()`).
 * Mirrors the CSS custom properties in index.css — keep both in sync.
 */
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';      // enter / exit
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';  // on-screen movement
export const EASE_DRAWER = 'cubic-bezier(0.32, 0.72, 0, 1)';   // sheets / drawers

/** True when the user asked the OS for reduced motion. Read at call time, not cached. */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
