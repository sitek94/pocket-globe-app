import { useEffect, useState } from 'react';
import { json, format } from 'd3';

/**
 * Fetches data from REST Countries API
 * for provided alpha code of the country
 */
export const useDetails = (alphaCode) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    json(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
      .then(({ capital, currencies, population, area, languages }) => {

        // Construct details array
        setDetails([
          { label: 'Capital', value: capital },
          { label: 'Population', value: format(',d')(population) },
          { label: 'Area', value: format(',d')(area) },
          { label: 'Languages', value: languages.map(l => l.name).join(', ') },
          { label: 'Currency', value: currencies[0].name },
        ])
      });
  }, [alphaCode]);

  return details;
}