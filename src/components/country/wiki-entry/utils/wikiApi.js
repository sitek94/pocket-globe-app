import axios from 'axios';

export const wikiApi = axios.create({
  baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary/'
});
