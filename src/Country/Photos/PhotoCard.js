import React, { useEffect, useRef, useState } from 'react';


export const PhotoCard = ({ image, term }) => {
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);
  
  useEffect(() => {
    if (!image) return;

    const updateSpans = () => {
      console.log(term, imageRef.current);
      console.log(image.alt_description);
      const height = imageRef.current.clientHeight;
      setSpans(Math.ceil(height / 10 + 1));
    };

    const imageEl = imageRef.current;
    imageEl.addEventListener('load', updateSpans);

    return () => {
      imageEl.removeEventListener('load', updateSpans);
  
    }

  }, [image,term]);

  if (!image) return <div>Loading</div>
  const { urls, alt_description } = image;

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={alt_description} src={urls.small} />
    </div>
  );
};
