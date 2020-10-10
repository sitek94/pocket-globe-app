import { useTheme, useMediaQuery } from '@material-ui/core';
import { useColumnWidth, useColumnHeight } from './';

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
