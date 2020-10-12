import { MAX_SCALE, MIN_SCALE, ZOOM_IN_VALUE, ZOOM_OUT_VALUE } from './defaultValues';

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

// Handle clicking on zoom in/out
export const handleZoomClick = (params) => (event) => {
  const { value } = event.target;

  let zoomValue;

  if (value === 'plus') zoomValue = ZOOM_IN_VALUE;
  if (value === 'minus') zoomValue = ZOOM_OUT_VALUE;

  zoomProjectionBy({
    ...params,
    zoomValue,
  });
};
