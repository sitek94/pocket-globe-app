import { interpolate } from 'd3';

window.rotations = {};

export const rotateProjection = ({
  selection,
  projection,
  path,
  target,
}) => {
  // Store the current rotation and scale:
  const currentRotate = projection.rotate();
  
  // Get projected planar centroid (in pixels)
  const centroid = path.centroid(target); 

  // Converts centroid to [longitude, latitude] in degrees
  const [longitude, latitude] = projection.invert(centroid);

  // Rotate the projection
  projection.rotate([-longitude, -latitude]);
  // Update path generator with new projection
  path.projection(projection);

  // Calculate next rotation
  const nextRotate = projection.rotate();
  
  if (target) {
    const obj = {
      id: target.id,
      name: target.properties.name,
      rotate: nextRotate,
    };

    window.rotations[target.id] = obj;
  }
  
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