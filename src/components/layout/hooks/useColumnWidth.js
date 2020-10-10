import { useMediaQuery, useTheme } from '@material-ui/core';
import { useBodyWidth } from './';

export const useColumnWidth = () => {
  const { breakpoints, spacing } = useTheme();
  const bodyWidth = useBodyWidth();

  // While calculating the width of the column I have to think
  // how the layout changes over time. Calculations are slightly
  // different, becaue of the paddings.
  const isOneColumn = useMediaQuery(breakpoints.down('sm'));

  const columnWidth = isOneColumn
    ? // Up to 960px - one column
      // width = bodyWidth - padding * 2
      bodyWidth - spacing(2) * 2
    : // More than 960px - two columns
      // width = bodyWidth / 2 - paddingLeft - paddingRight / 2
      bodyWidth / 2 - spacing(2) - spacing(1);

  return columnWidth;
};
