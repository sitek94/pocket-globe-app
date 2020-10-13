import { zoom } from 'd3';
import { MAX_SCROLL, MIN_SCROLL } from './projection-defaults';

// Zoom in/out using scroll
export const scrollBehaviour = ({
  selection,
  projection,
  path,
  initialScale,
  circle,
  maxScroll = MAX_SCROLL,
  minScroll = MIN_SCROLL,
}) =>
  zoom().on('zoom', (event) => {
    const scrollValue = event.transform.k;

    // Reached max/min zoom
    if (scrollValue >= maxScroll) event.transform.k = maxScroll;
    if (scrollValue <= minScroll) event.transform.k = minScroll;
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
