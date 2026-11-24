import { useEffect, useRef } from 'react';
import wordmarkUrl from '../assets/kingsfoot-wordmark.png';
import { prefersReducedMotion } from '../lib/motion';
import { LOGO_VIEWBOX as VIEWBOX, STAR_BODY as STAR, TRAIL_TOP, TRAIL_BOTTOM } from '../lib/brand';
import './BrandMark.css';

/*
 * KingsFoot logo, rebuilt from src/assets/kingsfoot.png as separate layers so
 * each part can move on its own:
 *   - star + two speed trails → SVG (geometry in lib/brand.js)
 *   - wordmark → transparent PNG cut from the original (no opaque box)
 */

// Pointer tilt spring — Apple-style { duration: 0.5, bounce: 0.2 } as physics:
// stiffness = (2π / 0.5)², damping = 2 · (1 − bounce) · √stiffness
const STIFFNESS = (2 * Math.PI / 0.5) ** 2;
const DAMPING = 2 * 0.8 * Math.sqrt(STIFFNESS);
const MAX_TILT = 6; // degrees

/** Animated KingsFoot logo for the hero. */
function BrandMark() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);

  // Decorative pointer tilt. Writes the transform straight to the DOM in rAF.
  // No React state, so no re-renders. Real pointers + full motion only.
  useEffect(() => {
    const root = rootRef.current;
    const tilt = tiltRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!root || !tilt || !finePointer || prefersReducedMotion()) return;

    const host = root.closest('section') ?? root;
    const target = { x: 0, y: 0 };
    const value = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let frame = 0;
    let last = 0;

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30); // clamp after tab switches
      last = now;
      for (const axis of ['x', 'y']) {
        const force = STIFFNESS * (target[axis] - value[axis]) - DAMPING * velocity[axis];
        velocity[axis] += force * dt;
        value[axis] += velocity[axis] * dt;
      }
      tilt.style.transform = `perspective(900px) rotateX(${value.x.toFixed(3)}deg) rotateY(${value.y.toFixed(3)}deg)`;

      const settled = ['x', 'y'].every(
        (a) => Math.abs(target[a] - value[a]) < 0.01 && Math.abs(velocity[a]) < 0.01,
      );
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const wake = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const hostRect = host.getBoundingClientRect();
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (hostRect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (hostRect.height / 2);
      const clamp = (n) => Math.max(-1, Math.min(1, n));
      target.y = clamp(nx) * MAX_TILT;
      target.x = -clamp(ny) * MAX_TILT;
      wake();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="brand-mark" ref={rootRef} role="img" aria-label="KingsFoot">
      <div className="brand-mark__tilt" ref={tiltRef} aria-hidden="true">
        <svg className="brand-mark__layer brand-mark__trail brand-mark__trail--top" viewBox={VIEWBOX}>
          <polygon points={TRAIL_TOP} />
        </svg>
        <svg className="brand-mark__layer brand-mark__trail brand-mark__trail--bottom" viewBox={VIEWBOX}>
          <polygon points={TRAIL_BOTTOM} />
        </svg>
        <svg className="brand-mark__layer brand-mark__star" viewBox={VIEWBOX}>
          <polygon points={STAR} />
        </svg>

        <img
          className="brand-mark__word"
          src={wordmarkUrl}
          alt=""
          width="1016"
          height="142"
          loading="eager"
          decoding="async"
        />
        <span
          className="brand-mark__shine"
          style={{ maskImage: `url(${wordmarkUrl})`, WebkitMaskImage: `url(${wordmarkUrl})` }}
        >
          <span className="brand-mark__shine-band" />
        </span>
      </div>
    </div>
  );
}

export default BrandMark;
