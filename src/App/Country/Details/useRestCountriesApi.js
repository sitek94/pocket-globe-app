import { useEffect, useState } from 'react';
import axios from 'axios';
import { initialState } from '../../index';

const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/alpha/'
});

export const useRestCountriesApi = () => {
  const [data, setData] = useState({
    capital: '',
    currencies: [{ name: '' }],
    population: 0,
    area: 0,
    languages: [{ name: '' }],
  });
  const [query, setQuery] = useState(initialState.alpha);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await restCountriesApi.get(query);
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
