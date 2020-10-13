import { throttle } from 'lodash';
import { MAX_SCALE, MIN_SCALE } from './projection-defaults';

// Zooms the selection by value
const zoomProjectionBy = ({
  selection,
  projection,
  path,
  circle,
  maxScale = MAX_SCALE,
  minScale = MIN_SCALE,
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

export const throttledZoomProjectionBy = throttle((params) => {
  zoomProjectionBy({
    ...params,
    duration: 0,
  });
  // Throught experimenting with different values I found that 50ms
  // works best because it's quite smooth and doesn't lag
}, 50);
