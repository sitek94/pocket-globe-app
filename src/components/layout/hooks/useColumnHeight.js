import { useTheme, useMediaQuery } from '@material-ui/core';
import { useColumnWidth } from './';

export const useColumnHeight = () => {
  const { breakpoints, spacing } = useTheme();

  // Check media queries in order to get correct value of the toolbar
  const matchesXsAndLandscape = useMediaQuery(
    `${breakpoints.up('xs')} and (orientation: landscape)`,
  );
  const matchesUpSm = useMediaQuery(breakpoints.up('sm'));

  // Get all the necessary values to compute the height
  const viewportHeight = document.documentElement.clientHeight;
  const toolbarHeight = matchesUpSm ? 64 : matchesXsAndLandscape ? 48 : 56;
  const footerHeight = 36;
  const padding = spacing(2) * 2;

  // Compute by substracting all the values from viewport height
  return viewportHeight - toolbarHeight - footerHeight - padding;
};

export const useGlobeSize = () => {
  const { breakpoints } = useTheme();

  // 600px and down
  const matchesSmallScreens = useMediaQuery(breakpoints.down('sm'));
  // 600px - 960px
  const matchesMediumScreens = useMediaQuery(breakpoints.only('sm'));
  // 960px and up
  const matchesLargeScreens = useMediaQuery(breakpoints.up('md'));

  const columnWidth = useColumnWidth();
  const columnHeight = useColumnHeight();

  let width, height;

  // Globe should be a square
  if (matchesSmallScreens) {
    width = columnWidth;
    height = columnWidth;
  }

  // Cap height at 600
  if (matchesMediumScreens) {
    width = columnWidth;
    height = 600;
  }

  // Take full width and height of the column
  if (matchesLargeScreens) {
    width = columnWidth;
    height = columnHeight;
  }

  return [width, height];
};
