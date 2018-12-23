import * as actionsTypes from './actionTypes';

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

