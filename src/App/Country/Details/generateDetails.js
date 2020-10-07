import { format } from 'd3';

const LANGUAGES_LIMIT = 4;

export const generateDetails = ({
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
      .map((l) => l.name)
      .join(', '),
  },
  { label: 'Currency', value: currencies[0].name },
];
