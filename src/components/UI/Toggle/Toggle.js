import React from 'react';
import classes from './Toggle.css';
import Button from '../Button/Button';

const toggle = (props) => (
  <div className={classes.Toggle}><Button clicked={props.clicked}>MENU</Button></div>
);

export default toggle;