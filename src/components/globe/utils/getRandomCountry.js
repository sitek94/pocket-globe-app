import { random } from 'lodash';
import { countries } from '../../../assets/countries';

export const getRandomCountry = (selectedCountry) => {
  let newCountry; 
  do {
    newCountry = countries[random(countries.length)];
  } while (newCountry.id === selectedCountry.id);
  
  return newCountry;
}
