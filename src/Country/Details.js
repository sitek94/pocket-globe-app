import React, { useEffect } from 'react';
import { format } from 'd3';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';

const LANGUAGES_LIMIT = 4;

export const Details = ({ alphaCode }) => {
  const [{ data, isLoading, isError }, { setUrl }] = useData();

  useEffect(() => {
    setUrl(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`);
  }, [alphaCode, setUrl])

  if (!data || isLoading) return <LoadingSpinner />;

  const { capital, currencies, population, area, languages } = data;
  const details = [
    { label: 'Capital', value: capital },
    { label: 'Population', value: format(',d')(population) },
    { label: 'Area', value: format(',d')(area) },
    { label: 'Languages', value: languages.slice(0, LANGUAGES_LIMIT + 1).map(l => l.name).join(', ') },
    { label: 'Currency', value: currencies[0].name },
  ];

  return (
    <TableContainer className="Details">
      <Table size="small">
        <TableBody>
          {details.map(({ label, value }) => (
            <TableRow key={label} hover>
              <TableCell component="th" variant="head">{label}</TableCell>
              <TableCell>{label === 'Area' ? <>{value} km<sup>2</sup></> : value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}