import { useEffect, useState } from 'react';
import axios from 'axios';

const isoUrl =
  'https://gist.githubusercontent.com/sitek94/4339d86883340aac67cf61a5ed7bb05e/raw/ISO-3166-Countries-with-Regional-Codes.json';

const idsUrl = 'https://gist.githubusercontent.com/sitek94/5dfcc1335322c06131436c59b1219f7c/raw/countries-ids.json';

export const useIsoCountriesData = () => {
  const [countriesData, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const [{ data: isoData }, { data: ids }] = await Promise.all([
          axios.get(isoUrl),
          // In addition to ISO data about the countries I fetch
          // array with ids of the countries available in GeoJSON
          // data that I use to render the Globe
          axios.get(idsUrl)
        ])

        // Get country names
        const countryNames = ids.map(id => {
          return isoData.find(country => id === country['country-code']).name;
        });

        // Convert array with data to an object
        const dataObject = isoData.reduce((object, country) => {

          const code = country['country-code'];

          // Check if there is GeoJSON data for the country
          if (!ids.includes(code)) return object;

          const name = country.name;
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

        setCountryNames(countryNames);
        setCountries(dataObject);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [countriesData, countryNames, isLoading, isError];
};
