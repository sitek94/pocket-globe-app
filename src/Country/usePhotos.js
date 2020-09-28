import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Fetches data from Unsplash API
 * for provided name of the country
 */
async function fetchPhotos(terms) {
  try {

    const response = await axios.get('https://api.unsplash.com/search/photos/', {
      params: {
        query: terms.join('-'),
        per_page: 10
      },
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
      }
    });
    return response.data.results;
  } catch (error) {
    console.log('Something went wrong when fetching the photos', error);
  }   
}

export const usePhotos = (terms) => {
  const [photos, setPhotos] = useState(null);

    useEffect(() => {
      fetchPhotos(terms)
        .then(setPhotos)

  }, [terms]);
  return photos;
}