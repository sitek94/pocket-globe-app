import React, { useEffect } from 'react';
import { format } from 'd3';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';

const LANGUAGES_LIMIT = 4;

const styles = {
  horizontal: {
     // Remove border from last detail item
    '& tr:last-child': {
      '& th, td': {
        border: 0
      }
    },    
  }, 
  vertical: {
    marginBottom: 10,
  }
};

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    [breakpoints.only('xs')]: styles.vertical,
    [breakpoints.only('sm')]: styles.horizontal,
    [breakpoints.only('md')]: styles.vertical,
    [breakpoints.up('lg')]: styles.horizontal,
  }
}));

export const Details = ({ alphaCode }) => {
  const classes = useStyles();

  const [{ data, isLoading }, { setUrl }] = useData();

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
    <TableContainer className={classes.container}>
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