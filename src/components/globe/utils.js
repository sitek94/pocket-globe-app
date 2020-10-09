import { drag, zoom } from 'd3';

// Drag
export const dragBehaviour = ({ 
  selection,
  projection, 
  path, 
  sensitivity 
}) => drag()
  .on('drag', (event) => {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();

    // Update projection
    projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);

    // Update path generator with new projection
    path.projection(projection);

    // Update selection
    selection.attr('d', path);
  });

// Zoom
export const zoomBehaviour = ({
  selection,
  projection,
  path,
  initialScale,
  circle,
  maxZoom = 20,
  minZoom = 0.3,
}) => zoom()
  .on('zoom', (event) => {
    const zoomValue = event.transform.k;

    // Reached max/min zoom
    if (zoomValue >= maxZoom) event.transform.k = maxZoom;
    if (zoomValue <= minZoom) event.transform.k = minZoom;
    else {

      // Update projection
      projection.scale(initialScale * event.transform.k);

      // Update path generator with new projection
      path.projection(projection);

      // Update selection
      selection.attr('d', path);
      circle.attr('r', projection.scale());
    } 
  });
