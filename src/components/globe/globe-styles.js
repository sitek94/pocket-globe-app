import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  ({ palette: { primary, background, getContrastText } }) => ({
    container: {
      position: 'relative',
      height: '100%',
    },
    svg: {
      display: 'block',
      margin: '0 auto',
      outline: 'none',
      '&:focus': {
        boxShadow: `0px 0px 38px -13px ${primary.light}`
      }
    },
    country: {
      fill: background.default,
      stroke: getContrastText(background.default),
      transition: 'fill .5s',
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
      transition: 'fill .5s',
    },
  })
);