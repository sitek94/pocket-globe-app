import { sample } from 'lodash';
import { countries } from './countries';

export const getCountryById = id => {
  return countries.find(country => country.id === id);
};

export const getRandomCountry = () => {
  return sample(countries);
};

export const initialState = getRandomCountry();
