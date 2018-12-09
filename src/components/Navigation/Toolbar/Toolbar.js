import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../SideDrawer/Toggle/Toggle';

const toolbar = (props) => (
<header className={classes.Toolbar}>
  <div className={classes.MobileOnly}>
    <Toggle clicked={props.openedSideDrawer}/>
  </div>
  <div className={classes.Logo}>
    <Logo/>
  </div>
  <nav className={classes.DesktopOnly}>
    <NavigationItems/>
  </nav>
</header>
);

export default toolbar;