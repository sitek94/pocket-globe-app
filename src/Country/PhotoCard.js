import React, { useEffect, useRef, useState, memo } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

export const PhotoCard = memo(({ image, term }) => {
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);
  
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
  
    }

  }, [image,term]);

  if (!image) return <LoadingSpinner />;
  const { urls, alt_description } = image;

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={alt_description} src={urls.small} />
    </div>
  );
});
