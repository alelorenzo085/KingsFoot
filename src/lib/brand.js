/**
 * KingsFoot logo geometry, traced from src/assets/kingsfoot.png (98% pixel overlap).
 * Coordinates are in the original PNG's pixel space, so every layer lines up.
 * public/favicon.ico was rendered from STAR_FULL too.
 */

/** Whole logo (star + wordmark) */
export const LOGO_VIEWBOX = '496 600 1016 612';

/** Star with both trails as one shape. Use it when the star doesn't animate. */
export const STAR_VIEWBOX = '596 600 820 428';
export const STAR_FULL =
  '824,602.5 874.7,765 1412.5,764 854,794 823,697.8 793,794 692.5,794 772.3,852 742.3,947.1 824,888.2 1262.6,877.8 825,924.4 686.3,1024.8 739.1,863.4 599.4,764 771.2,765';

/** The same star split into body + trails, so each part can move on its own. */
export const STAR_BODY =
  '824,602.5 874.7,765 854,794 823,697.8 793,794 692.5,794 772.3,852 742.3,947.1 824,888.2 825,924.4 686.3,1024.8 739.1,863.4 599.4,764 771.2,765';
export const TRAIL_TOP = '871.7,765 1412.5,764 851,794';      // base tucked 3 units into the star → no seam
export const TRAIL_BOTTOM = '821,888.3 1262.6,877.8 822,924.4';
