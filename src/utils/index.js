import { sample } from 'lodash';
import { countries } from './countries';
export { countries };

export const initialState = {
  id: '616',
  name: 'Poland',
  code: '616',
  alpha: 'POL',
  rotation: [-19.343761889362877, -52.134071581669645, 0],
};

export const getCountryById = id => {
  return countries.find((country) => country.id === id);
}

export const getRandomCountry = () => {
  return countries[sample(countries.length)];
}
