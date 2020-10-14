import React from "react";
import { IconButton } from "@material-ui/core/";
import "./style.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Zoom from "./zoom";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function GroupOrientation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button>
          <AddIcon />
        </Button>
        <Button>
          <RemoveIcon />
        </Button>
      </ButtonGroup>
      <Button
        className="location btn btn-single"
        variant="contained"
        color="primary"
      >
        <MyLocationIcon />
      </Button>
      <Button
        className="random btn btn-single"
        variant="contained"
        color="primary"
      >
        <MyLocationIcon />
      </Button>
    </div>
  );
}


const Btn = ({ id, children }) => {
  const className = [id, "btn"].join(" ");

  return (
    <IconButton className={className} color="primary" size="small">
      {children}
    </IconButton>
  );
};

export const App = () => {
  return (
    <div className="container">
      <div className="box">
        <Btn id="down">
          <ArrowDropDownIcon fontSize="inherit" />
        </Btn>
        <Btn id="up">
          <ArrowDropUpIcon fontSize="inherit" />
        </Btn>
        <Btn id="left">
          <ArrowLeftIcon fontSize="inherit" />
        </Btn>
        <Btn id="right">
          <ArrowRightIcon fontSize="inherit" />
        </Btn>
      </div>
      <Zoom />
    </div>
  );
};
