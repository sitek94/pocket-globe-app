import { interpolate } from 'd3';
import { throttle } from 'lodash';

/**
 * A function that rotates the projection by x, y and z value
 * 
 * 
 */
export const rotateProjectionBy = ({
  selection,
  projection,
  path,
  duration = 1000,
  rotation,
}) => {
  // Store the current rotation and scale:
  const currentRotate = projection.rotate();

  // Update path generator with new projection
  path.projection(projection);

  // Set next rotation
  const [x, y, z] = rotation;
  const [currentX, currentY, currentZ] = currentRotate;
  const nextRotate = [currentX + x, currentY + y, currentZ + z];

  // Create interpolator function
  const r = interpolate(currentRotate, nextRotate);

  // Update selection
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

/**
 * A specialized version of `rotateProjectionBy` used for keyboard events.
 * 
 * It throttles the calls to `rotateProjectionBy` and sets duration of rotation
 * to zero and throttle time to 50ms so that the effect is quite smooth.
 * 
 * 
 */
export const throttledRotateProjectionBy = throttle((params) => {
  rotateProjectionBy({
    ...params,
    duration: 0,
  });
}, 50);

/**
 * A function that makes a transition from current projection.rotation to 
 * given rotation
 * 
 * 
 */
export const rotateProjectionTo = ({
  selection,
  projection,
  path,
  duration = 1000,
  rotation,
}) => {
  // Store the current rotation and scale:
  const currentRotate = projection.rotate();
  
  // Update path generator with new projection
  path.projection(projection);

  // Set  next rotation
  const nextRotate = rotation;

  // Create interpolator function
  const r = interpolate(currentRotate, nextRotate);

  // Update selection
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

/**
 * A function that zooms given projection by given value
 * 
 * 
 */
export const zoomProjectionBy = ({
  selection,
  projection,
  path,
  circle,
  maxScale,
  minScale,
  zoomValue,
}) => {
  let nextScale = projection.scale() * zoomValue;

  // Reached max/min zoom
  if (nextScale >= maxScale) nextScale = maxScale;
  if (nextScale <= minScale) nextScale = minScale;
  else {
    // Update projection
    projection.scale(nextScale);

    // Update path generator with new projection
    path.projection(projection);

    // Update selection
    selection.attr('d', path);
    circle.attr('r', projection.scale());
  }
};

/**
 * A specialized version of `zoomProjectionBy` used for keyboard events.
 * 
 * It throttles the calls to `zoomProjectionBy` and sets duration of rotation
 * to zero and throttle time to 50ms so that the effect is quite smooth.
 * 
 * 
 */
export const throttledZoomProjectionBy = throttle((params) => {
  zoomProjectionBy({
    ...params,
    duration: 0,
  });
}, 50);
