import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  ({
    spacing,
    shape,
    breakpoints: { down, values: { mobile } },
    transitions: { create, duration },
    palette: { primary, common, getContrastText }
  }) => ({
    /* Autocomplete component */
    autocompleteRoot: {
      display: 'flex',
      alignItems: 'center',
      width: 250,

      /* Position over the globe */
      position: 'absolute',
      left: spacing(4),
      top: spacing(4),
      [down('md')]: {
        left: spacing(2),
        top: spacing(2),
      },
      /* Position above the globe */
      [down(mobile)]: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        marginBottom: spacing(2),
      },
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
      },
    },
    /* Input wrapper (Paper) */
    inputWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderRadius: shape.borderRadius,
      color: getContrastText(primary.main),
      backgroundColor: primary.main,
      transition: create('background-color', duration.standard),
    },
    /* Search icon */
    searchIcon: {
      display: 'flex',
      alignItems: 'center',
      color: fade(getContrastText(primary.main), 0.8),
      padding: 10,
    },
  })
);
