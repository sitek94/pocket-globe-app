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
          // Get country properties
          const name = country.name;
          const code = country['country-code'];
          const alpha = country['alpha-3'];

          const nameKey = name.toLowerCase();
          const alphaKey = alpha.toLowerCase();
          const codeKey = code;

          // Create an object that stores the properties
          object[nameKey] = {
            name,
            alpha,
            code,
          };
          // All the properties point at the same object so that 
          // it can be access by either name, code or alpha
          object[codeKey] = object[nameKey];
          object[alphaKey] = object[nameKey];

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
