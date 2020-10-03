import React, { useEffect, useRef, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core';

import { LoadingSpinner } from '../LoadingSpinner';

const useStyles = makeStyles({
  container: {
    gridRowEnd: (spans) => `span ${spans}`,
  },
  img: {
    width: '100%',
  },
});

export const PhotoCard = memo(({ image }) => {
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);

  const classes = useStyles(spans);

  useEffect(() => {
    if (!image) return;

    const updateSpans = () => {
      const height = imageRef.current.clientHeight;
      setSpans(Math.ceil(height / 10 + 1));
    };

    const imageEl = imageRef.current;
    imageEl.addEventListener('load', updateSpans);

    return () => {
      imageEl.removeEventListener('load', updateSpans);
    };
  }, [image]);

  if (!image) return <LoadingSpinner />;
  const { urls, alt_description } = image;

  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        ref={imageRef}
        src={urls.small}
        alt={alt_description}
      />
    </div>
  );
});
