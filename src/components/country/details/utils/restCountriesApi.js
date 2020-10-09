import axios from 'axios';

export const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/alpha/',
});
