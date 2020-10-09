import React from 'react';

import {
  TableCell,
  TableRow,
} from '@material-ui/core';

export const Detail = ({ label, value }) => (
  <TableRow hover>
    <TableCell component="th" variant="head">
      {label}
    </TableCell>
    <TableCell>
      {label === 'Area' ? <>{value} km<sup>2</sup></> : value}
    </TableCell>
  </TableRow>
);
