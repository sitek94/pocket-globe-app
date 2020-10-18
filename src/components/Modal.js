import React from 'react';
import {
  makeStyles,
  Modal as MuiModal,
  Backdrop,
  Zoom,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    outline: 'none',
    boxShadow: theme.shadows[5],
  },
}));

export const Modal = ({ show, children, ...other }) => {
  const classes = useStyles();

  return (
    <MuiModal
      open={show}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...other}
    >
      <Zoom in={show}>
        <div className={classes.div}>{children}</div>
      </Zoom>
    </MuiModal>
  );
}
