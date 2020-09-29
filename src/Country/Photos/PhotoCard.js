import React, { useEffect, useRef, useState } from 'react';


export const PhotoCard = ({ image: { urls, alt_description } }) => {
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);

  useEffect(() => {
    const image = imageRef.current;
    image.addEventListener('load', updateSpans);
  }, []);

  const updateSpans = () => {
    const height = imageRef.current.clientHeight;
    setSpans(Math.ceil(height / 10 + 1));
  };

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={alt_description} src={urls.small} />
    </div>
  );
};
