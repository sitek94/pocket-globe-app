import { makeStyles } from '@material-ui/core';

const styles = {
  horizontal: {
    // Remove border from last detail item
    '& tr:last-child': {
      '& th, td': {
        border: 0,
      },
    },
  },
  vertical: {
    marginBottom: 10,
  },
};

export const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    [breakpoints.only('xs')]: styles.vertical,
    [breakpoints.only('sm')]: styles.horizontal,
    [breakpoints.only('md')]: styles.vertical,
    [breakpoints.up('lg')]: styles.horizontal,
  },
}));
