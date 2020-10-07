import { useEffect } from 'react';
import { useData } from '../../useData';

export const useUnsplashData = (term) => {

  const [{ data, isLoading, isError }, { setUrl, setConfig }] = useData(
  );
  useEffect(() => {
    setUrl('https://api.unsplash.com/search/photos/');
    setConfig({
      params: {
        query: term,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
      },
    });
  }, [term, setUrl, setConfig]);

  return { data, isLoading, isError };
}