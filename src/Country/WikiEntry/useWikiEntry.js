import { useEffect, useState } from 'react';
import axios from 'axios';

const MAX_ENTRY_LENGTH = 480;
/**
 * Fetches data from Wikipedia REST API
 * for provided name of the country
 */
export const useWikiEntry = (term) => {
  const [wikiEntry, setWikiEntry] = useState(null);

    useEffect(() => {
      axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`)
        .then(response => {

          // Keep removing one sentence from the entry until it is less than max length
          let entry = response.data.extract;
          while (entry.length >= MAX_ENTRY_LENGTH) {
            entry = entry.split('. ').slice(0, -1).join('. ') + '.';
          }
          setWikiEntry(entry)
        })
        .catch(err => console.log(err));
  }, [term]);
  return wikiEntry;
}