import React from 'react';
import { Link, makeStyles, Typography } from '@material-ui/core';

const referralString = '?utm_source=your_app_name&utm_medium=referral';

const useStyles = makeStyles(({ breakpoints }) => ({
  figure: {
    margin: '0 auto',
    padding: 25,
    backgroundColor: 'white',
    outline: 'none',
    height: '85vh',
    
  },
  img: {
    height: '100%',
  },
  [breakpoints.down('sm')]: {
    figure: {
      height: 'auto',
      width: '95vw',
    },
    img: {
      height: 'auto',
      width: '100%',
    }
  }
}));

export const PhotoViewer = ({ photo }) => {
  const classes = useStyles();
  const { urls, description, links, user: { name } } = photo;

  return (
    <figure className={classes.figure}>
      <img className={classes.img} src={urls.regular} alt={description} />
      <figcaption>
        <Typography variant="caption" display="block" align="center">
          by{' '}
          <Link href={links.html + referralString}>{name}</Link> on{' '}
          <Link href={`https://unsplash.com/${referralString}`}>Unsplash</Link>
        </Typography>
      </figcaption>
    </figure>
  );
};
