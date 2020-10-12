import { interpolate } from 'd3';
import { ROTATION_BASE_VALUE } from './defaultValues';

// Rotate the projection by x, y and z value
export const rotateProjectionBy = ({
  selection,
  projection,
  path,
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
    .duration(1000);
};

// Handle clicking on rotation buttons
export const handleRotationClick = params => (e) => {
  const { value } = e.target;

  const rotation = { x: 0, y: 0, z: 0 };
  const base = ROTATION_BASE_VALUE;

  if (value === 'up') rotation.y = base;
  if (value === 'down') rotation.y = -base;
  if (value === 'left') rotation.x = -base;
  if (value === 'right') rotation.x = base;

  rotateProjectionBy({
    ...params,
    ...rotation,
  });
};

