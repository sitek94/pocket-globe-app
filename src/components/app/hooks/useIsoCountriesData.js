import { useEffect, useState } from 'react';
import axios from 'axios';

const url =
  'https://gist.githubusercontent.com/sitek94/4339d86883340aac67cf61a5ed7bb05e/raw/ISO-3166-Countries-with-Regional-Codes.json';

export const useIsoCountriesData = () => {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { data } = await axios.get(url);
        
        // Convert array with data to an object
        const dataObject = data.reduce((object, country) => {
          object[country['country-code']] = {
            name: country.name,
            alpha: country['alpha-3'],
            code: country['country-code'],
          }

          return object;
        }, {});

        setCountries(dataObject);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [countries, isLoading, isError];
};
