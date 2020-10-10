import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr 1fr',
    [breakpoints.down('sm')]: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  navbar: {
    gridColumn: '1 / span 2',
  },
  leftColumn: {
    position: 'relative',
    padding: spacing(2),
    paddingRight: spacing(1),

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      padding: spacing(2),
    },
  },
  rightColumn: {
    padding: spacing(2),
    paddingLeft: spacing(1),
    overflowY: 'scroll',
    overflowX: 'hidden',
    [breakpoints.down('sm')]: {
      padding: spacing(2),
      overflowY: 'hidden',
    },
    [breakpoints.only('xs')]: {
      paddingTop: 0,
    },
  },
  footer: {
    gridColumn: '1 / span 2',
  },
}));
