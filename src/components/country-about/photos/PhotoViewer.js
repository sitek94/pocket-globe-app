import React from 'react';
import { Link, makeStyles, Typography } from '@material-ui/core';

const REFERRAL_STRING = '?utm_source=your_app_name&utm_medium=referral';

const useStyles = makeStyles(
  ({ breakpoints, palette: { common, getContrastText } }) => ({
    figure: {
      margin: '0 auto',
      padding: 25,
      color: getContrastText(common.white),
      backgroundColor: common.white,
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
      },
    },
  }),
);

export const PhotoViewer = ({ photo }) => {
  const classes = useStyles();
  const {
    urls,
    alt_description,
    links,
    user: { name },
  } = photo;

  return (
    <figure className={classes.figure}>
      <img className={classes.img} src={urls.regular} alt={alt_description} />
      <figcaption>
        <Typography variant="caption" display="block" align="center">
          by <Link href={links.html + REFERRAL_STRING}>{name}</Link> on{' '}
          <Link href={`https://unsplash.com/${REFERRAL_STRING}`}>Unsplash</Link>
        </Typography>
      </figcaption>
    </figure>
  );
};
