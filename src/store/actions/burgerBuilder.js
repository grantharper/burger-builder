import * as actionsTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type: actionsTypes.ADD_INGREDIENT,
    ingredientType: ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionsTypes.REMOVE_INGREDIENT,
    ingredientType: ingredientName
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionsTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionsTypes.FETCH_INGREDIENTS_FAILED,
    error: true
  }
};

export const initIngredients = () => {
  return dispatch  => {
    axios.get('/ingredients.json').then(response => {
      dispatch(setIngredients(response.data));
    }).catch(error => {
      dispatch(fetchIngredientsFailed());
    })
  }
};

