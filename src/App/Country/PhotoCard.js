import React, { useEffect, useRef, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core';

import { LoadingSpinner } from '../LoadingSpinner';

const useStyles = makeStyles({
  container: {
    gridRowEnd: (spans) => `span ${spans}`,
  },
  img: {
    width: '100%',
    cursor: 'pointer',
  },
});

export const PhotoCard = memo(({ photo, onClick }) => {
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);

  const classes = useStyles(spans);

  useEffect(() => {
    if (!photo) return;

    const updateSpans = () => {
      const height = imageRef.current.clientHeight;
      setSpans(Math.ceil(height / 10 + 1));
    };

    const imageEl = imageRef.current;
    imageEl.addEventListener('load', updateSpans);
    window.addEventListener('resize', updateSpans);

    return () => {
      imageEl.removeEventListener('load', updateSpans);
      window.removeEventListener('resize', updateSpans);
    };
  }, [photo]);

  if (!photo) return <LoadingSpinner />;
  const { urls, alt_description } = photo;

  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        ref={imageRef}
        src={urls.small}
        alt={alt_description}
        onClick={onClick}
      />
    </div>
  );
});
