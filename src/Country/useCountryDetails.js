import { useEffect, useState } from 'react';
import { json, format } from 'd3';

/**
 * Fetches data from REST Countries API
 * for provided alpha code of the country
 */
export const useCountriesDetails = (alphaCode) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    json(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
      .then(({ capital, currencies, population, area, languages }) => {

        // Construct details object
        setDetails({
          capital,
          currency: currencies[0].name, 
          population: format(',d')(population).replaceAll(',', ' '), 
          area: format(',d')(area),
          languages: languages.map(l => l.name)
        })
      });
  }, [alphaCode]);

  return details;
}