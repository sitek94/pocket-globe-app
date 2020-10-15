import React from 'react';
import { Box, IconButton, makeStyles } from '@material-ui/core/';
import './buttons-style.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    borderRadius: 8,
  },
  button: {
    width: 29,
    height: 29,
    minHeight: 0,
    minWidth: 0,
    borderRadius: 8,
    fontSize: 1,
  },
}));

const useZoomStyles = makeStyles((theme) => ({}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    width: 29,
    height: 29,
    minHeight: 0,
    minWidth: 0,
    borderRadius: 8,
    fontSize: 16,
  },
}));

const WidgetButton = ({ className, ...other }) => {
  const classes = useButtonStyles();

  return <Button className={clsx(classes.root, className)} {...other}/>;
};

export const Zoom = () => {
  const classes = useStyles();

  return (
    <ButtonGroup
      classes={{
        root: classes.root,
      }}
      orientation="vertical"
      variant="contained"
      color="primary"
    >
      <WidgetButton>
        <AddIcon fontSize="inherit" />
      </WidgetButton>
      <WidgetButton>
        <RemoveIcon fontSize="inherit" />
      </WidgetButton>
    </ButtonGroup>
  );
};

export const Location = () => (
  <>
    <Button
      className="location btn btn-single"
      variant="contained"
      color="primary"
    >
      <MyLocationIcon fontSize="inherit" />
    </Button>
    <Button
      className="random btn btn-single"
      variant="contained"
      color="primary"
    >
      <MyLocationIcon fontSize="inherit" />
    </Button>
  </>
);

const useRotationStyles = makeStyles(({ palette, shadows }) => ({
  container: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: '50%',
    color: palette.getContrastText(palette.background.default),
    backgroundColor: palette.background.default,
    boxShadow: shadows['7'],
  },
  button: {
    position: 'absolute',
  },
  up: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  down: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  right: {
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));

export const Rotation = () => {
  const classes = useRotationStyles();

  return (
    <Box className={classes.container}>
      <IconButton className={clsx(classes.button, classes.up)} size="small">
        <ArrowDropUpIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.down)} size="small">
        <ArrowDropDownIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.left)} size="small">
        <ArrowLeftIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.right)} size="small">
        <ArrowRightIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};
export const SquareRotation = () => {
  const classes = useRotationStyles();

  return (
    <Box className={classes.container}>
      <IconButton className={clsx(classes.button, classes.up)} size="small">
        <ArrowDropUpIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.down)} size="small">
        <ArrowDropDownIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.left)} size="small">
        <ArrowLeftIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={clsx(classes.button, classes.right)} size="small">
        <ArrowRightIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

const useWidgetsStyles = makeStyles({
  widgets: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Widgets = () => {
  const classes = useWidgetsStyles();

  return (
    <div className={classes.widgets}>
      <Rotation />
      <Zoom />
      {/* <Location /> */}
    </div>
  );
};
