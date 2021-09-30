import { format } from 'd3';

const LANGUAGES_LIMIT = 4;

export const initialDetails = {
  capital: '',
  currencies: [{ name: '' }],
  population: 0,
  area: 0,
  languages: [{ name: '' }],
};

/**
 *
 * A function that transformes data received from REST Countries API
 *
 */
export const generateDetailsArray = ({
  capital,
  currencies,
  population,
  area,
  languages,
}) => [
  { label: 'Capital', value: capital },
  { label: 'Population', value: format(',d')(population) },
  { label: 'Area', value: format(',d')(area) },
  {
    label: 'Languages',
    value: languages
      .slice(0, LANGUAGES_LIMIT + 1)
      .map(l => l.name)
      .join(', '),
  },
  { label: 'Currency', value: currencies[0].name },
];

/**
 * A list of countries that are not listed by REST Countries API.
 * Data taken from Wikipedia.
 *
 *
 */
export const notListedCountries = {
  // N. Cyprus
  NCY: {
    capital: 'North Nicosia',
    currencies: [{ name: 'Turkish lira' }],
    population: 326000,
    area: 3355,
    languages: [
      {
        name: 'Turkish',
      },
    ],
  },
  // Somaliland
  SXX: {
    capital: 'Hargeisa',
    currencies: [
      {
        name: 'Somaliland shilling',
      },
    ],
    population: 3508180,
    area: 176120,
    languages: [
      {
        name: 'Somali',
      },
    ],
  },
  // Kosovo
  XXK: {
    capital: 'Pristina',
    currencies: [{ name: 'Euro' }],
    population: 1873160,
    area: 10887,
    languages: [
      {
        name: 'Albanian',
      },
      {
        name: 'Serbian',
      },
    ],
  },
};
