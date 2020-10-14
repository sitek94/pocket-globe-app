import axios from 'axios';

// Rest Countries API
export const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/alpha/',
});

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos/',
  params: {
    per_page: 12,
  },
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
  },
});

export const wikiApi = axios.create({
  baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary/'
});
