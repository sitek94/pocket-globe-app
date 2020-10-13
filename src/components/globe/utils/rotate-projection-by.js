import { interpolate } from 'd3';
import { throttle } from 'lodash';

// Rotate the projection by x, y and z value
export const rotateProjectionBy = ({
  selection,
  projection,
  path,
  duration = 0,
  x = 0,
  y = 0,
  z = 0,
}) => {
  // Store the current rotation and scale:
  const currentRotate = projection.rotate();

  // Update path generator with new projection
  path.projection(projection);

  // Set  next rotation
  const [nextX, nextY, nextZ] = currentRotate;
  const nextRotate = [nextX + x, nextY + y, nextZ + z];

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
    .duration(duration);
};

export const throttledRotateProjectionBy = throttle((params) => {
  rotateProjectionBy({
    ...params,
    duration: 0,
  });
  // Throught experimenting with different values I found that 50ms
  // works best because it's quite smooth and doesn't lag
}, 50);
