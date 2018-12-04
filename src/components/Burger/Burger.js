import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

  const transformedIngredients = Object.keys(props.ingredients).map((ingredientKey) => {
    return [...Array(props.ingredients[ingredientKey])].map((elem, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey}/>
    });
  });

  return (
  <div className={classes.Burger}>
    <BurgerIngredient type="bread-top"/>
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom"/>
  </div>
  );
};

export default burger;