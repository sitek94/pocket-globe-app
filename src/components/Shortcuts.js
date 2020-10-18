import React from 'react';

import { Modal } from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const createData = (key, description) => ({ key, description });

const rows = [
  createData('ctrl ↑', 'Rotate up'),
  createData('ctrl ↓', 'Rotate down'),
  createData('ctrl ←', 'Rotate left'),
  createData('ctrl →', 'Rotate right'),
  createData('+', 'Zoom in' ),
  createData('-', 'Zoom out' ),
  createData('l', 'Rotate to selected country' ),
  createData('r', 'Select random country' ),
  createData('w', 'Show/hide widgets' ),
  createData('ctrl /', 'Show/hide shortcuts' ),
];

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  cellKey: {
    fontFamily: 'monospace',
    fontSize: '1.1rem',
  }
});

const ShortcutsTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table 
        className={classes.table}
        aria-label="Shortcuts table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell align="center" className={classes.cellKey}>{row.key}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Shortcuts = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <ShortcutsTable />
    </Modal>
  );
};
