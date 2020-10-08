import { useEffect, useState } from 'react';
import axios from 'axios';
import { initialState } from '../../index';

const wikiApi = axios.create({
  baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary/'
});

export const useWikiApi = () => {
  const [data, setData] = useState({ extract: '' });
  const [query, setQuery] = useState(initialState.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await wikiApi.get(query);
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
