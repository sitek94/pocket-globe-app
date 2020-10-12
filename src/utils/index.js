import { random } from 'lodash';
import { countries } from './countries';
export { countries };

export const initialState = {
  id: '616',
  name: 'Poland',
  code: '616',
  alpha: 'POL',
};

export const getCountryById = id => {
  return countries.find((country) => country.id === id);
}

export const getRandomCountry = (selectedCountry) => {
  let newCountry; 
  do {
    newCountry = countries[random(countries.length)];
  } while (newCountry.id === selectedCountry.id);
  
  return newCountry;
}
