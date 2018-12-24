import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

function calculateTotalPrice(ingredients) {
  const initialPrice = 4;
  let totalPrice = initialPrice;
  for (let key in ingredients) {
    totalPrice += (ingredients[key] * INGREDIENT_PRICES[key]);
  }
  return totalPrice;
}

const burgerBuilder = (state = initialState, action) => {

  let updatedState = {...state};
  let updatedIngredient = {};
  let updatedIngredients = {};

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1};
      updatedIngredients = {ingredients: updateObject(state.ingredients, updatedIngredient)};
      updatedState = updateObject(state, updatedIngredients);
      break;
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1};
      updatedIngredients = {ingredients: updateObject(state.ingredients, updatedIngredient)};
      updatedState = updateObject(state, updatedIngredients);
      break;
    case actionTypes.SET_INGREDIENTS:
      updatedState = updateObject(state, {ingredients: action.ingredients});
      break;
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      updatedState = updateObject(state, {error: true});
      break;
    default:
  }

  updatedState.totalPrice = calculateTotalPrice(updatedState.ingredients);
  return updatedState;
};

export default burgerBuilder;