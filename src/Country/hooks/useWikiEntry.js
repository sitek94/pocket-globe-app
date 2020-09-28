import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Fetches data from Wikipedia REST API
 * for provided name of the country
 */
export const useWikiEntry = (term) => {
  const [wikiEntry, setWikiEntry] = useState(null);

    useEffect(() => {
      axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`)
        .then(response => {
          const paragraph = response.data.extract.split('. ').join('.\n');
          console.log(paragraph);

          setWikiEntry(paragraph)
        })
        .catch(err => console.log(err));
  }, [term]);
  return wikiEntry;
}