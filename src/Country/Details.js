import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { useDetails } from './useDetails';


export const Details = ({ alphaCode }) => {
  const details = useDetails(alphaCode);

  if (!details) return <div>Loading...</div>

  

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
   /*  <ul>
      <li>Capital: {capital}</li>
      <li>Population: {population}</li>
      <li>Area: {area} km<sup>2</sup></li>
      <li>Currency: {currency}</li>
      <li>Languages: {languages.join(', ')}</li>
    </ul> */
  )
}