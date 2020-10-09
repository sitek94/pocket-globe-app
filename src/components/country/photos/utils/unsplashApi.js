import axios from 'axios';

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos/',
  params: {
    per_page: 12,
  },
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
  },
});