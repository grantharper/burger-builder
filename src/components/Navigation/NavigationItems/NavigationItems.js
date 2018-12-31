import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {

  let authNav = <NavigationItem link="/auth">Auth</NavigationItem>;

  if(props.isAuthenticated){
    authNav = <NavigationItem link="/logout">Logout</NavigationItem>
  }

  return (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {authNav}
  </ul>)
};

export default navigationItems;