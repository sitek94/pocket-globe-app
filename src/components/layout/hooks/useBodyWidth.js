import { useState, useLayoutEffect } from 'react';
import { debounce } from 'lodash';

export const useBodyWidth = (delay = 250) => {
  const [width, setWidth] = useState(document.body.clientWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(document.body.clientWidth);
    };

    const debouncedHandleResize = debounce(handleResize, delay);

    window.addEventListener('resize', debouncedHandleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [delay]);

  return width;
};
