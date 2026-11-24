import './AnimatedBackground.css';

/**
 * Ambient light layer fixed behind the whole app.
 * Pure CSS: three soft radial "lights" drifting via transform/opacity only,
 * so it runs on the compositor and never triggers layout or paint.
 * Decorative only — hidden from assistive tech and from pointer events.
 */
function AnimatedBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <span className="ambient-light ambient-light--lime" />
      <span className="ambient-light ambient-light--hot" />
      <span className="ambient-light ambient-light--mint" />
    </div>
  );
}

export default AnimatedBackground;
