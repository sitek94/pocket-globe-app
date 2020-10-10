import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(
  ({ breakpoints, spacing, transitions, shape }) => ({
    box: {
      position: 'absolute',
      left: spacing(3),
      top: spacing(3),
      
      borderRadius: shape.borderRadius,
      width: '100%',
      [breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${spacing(4)}px)`,
      transition: transitions.create('width'),
      width: '100%',
      [breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

