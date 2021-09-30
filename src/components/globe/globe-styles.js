import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  ({
    palette: { primary, background, getContrastText },
    transitions: { create, duration },
    shadows,
    shape,
  }) => ({
    container: {
      position: 'relative',
      height: '100%',
    },
    svg: {
      display: 'block',
      margin: '0 auto',
    },
    country: {
      fill: background.default,
      stroke: getContrastText(background.default),
      transition: create('fill', duration.standard),
      strokeWidth: 0.25,
      '&:hover': {
        fill: primary.main,
      },
    },
    selected: {
      fill: primary.light,
    },
    circle: {
      fill: getContrastText(background.default),
      transition: create('fill', duration.standard),
    },
  }),
);
