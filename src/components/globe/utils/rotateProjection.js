import { interpolate } from 'd3';

export const rotateProjection = ({ selection, projection, path, rotation }) => {
  // Store the current rotation and scale:
  const currentRotate = projection.rotate();

  // Update path generator with new projection
  path.projection(projection);

  // Set  next rotation
  const nextRotate = rotation;

  // Create interpolator function
  const r = interpolate(currentRotate, nextRotate);

  // Update countries
  selection
    .transition()
    .attrTween('d', (d) => (t) => {
      projection.rotate(r(Math.pow(t, 0.33)));
      path.projection(projection);

      // When interpolator returns null, Chrome throws errors for
      // <path> with attribute d="null"
      const pathD = path(d);
      return pathD !== null ? pathD : '';
    })
    .duration(1000);
};
