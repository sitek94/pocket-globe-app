import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  ({
    spacing,
    shape,
    transitions: { create, duration },
    palette: { primary, common, getContrastText },
  }) => ({
    /* Autocomplete component */
    autocompleteRoot: {
      position: 'absolute',
      left: spacing(4),
      top: spacing(4),
      display: 'flex',
      alignItems: 'center',
      width: 250,
    },
    autocompletePaper: {
      margin: 0,
      borderRadius: shape.borderRadius,
    },
    /* Input */
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: spacing(1, 2),
      width: '100%',
      '&::selection': {
        color: primary.dark,
        backgroundColor: common.white,
      }
    },
    /* Input wrapper (Paper) */
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: 400,
      borderRadius: shape.borderRadius,
      color: getContrastText(primary.main),
      backgroundColor: primary.main,
      transition: create('background-color', duration.standard),
    },
    /* Search icon */
    searchIcon: {
      display: 'flex',
      alignItems: 'center',
      color: fade(getContrastText(primary.main), .8),
      padding: 10,
    },
  })
);