import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Fetches data from Unsplash API
 * for provided name of the country
 */
export const usePhotos = (terms) => {
  const [photos, setPhotos] = useState(null);

    useEffect(() => {
      axios.get('https://api.unsplash.com/search/photos/', {
        params: {
          query: terms.join('-'),
          per_page: 12
        },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
        }
      })
      .then(res => setPhotos(res.data.results))
      .catch(err => console.log(err));

  }, [terms]);
  
  return photos;
}