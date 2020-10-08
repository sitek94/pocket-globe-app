import { useEffect, useState } from 'react';
import axios from 'axios';
import { initialState } from '../../index';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos/',
  params: {
    per_page: 12,
  },
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
  },
});

export const useUnsplashApi = () => {
  const [data, setData] = useState({ results: [] });
  const [query, setQuery] = useState(initialState.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await unsplashApi.get(null, {
          params: {
            query,
          },
        });
        setData(result.data);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  return [{ data, isLoading, isError }, setQuery];
};
