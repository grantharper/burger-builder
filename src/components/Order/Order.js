import React from 'react';
import classes from './Order.css';


const order = (props) => {

  let ingredientArray = [];
  for(var i in props.ingredients){
    ingredientArray.push(<p
    style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 2px #ccc',
      margin: '5px',
      padding: '5px'
    }}
    key={i}>{i + '(' +  props.ingredients[i] + ')'}
    </p>);
  }


  return (
    <div className={classes.Order}>
      <p>Ingredients</p>
      <div>{ingredientArray}</div>
      <p>Price: <strong>${Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;