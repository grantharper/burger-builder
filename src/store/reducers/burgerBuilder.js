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

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1};
  const updatedIngredients = {ingredients: updateObject(state.ingredients, updatedIngredient)};
  return updateObject(state, updatedIngredients);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1};
  const updatedIngredients = {ingredients: updateObject(state.ingredients, updatedIngredient)};
  return updateObject(state, updatedIngredients);
};

const burgerBuilder = (state = initialState, action) => {

  let updatedState = {...state};

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedState = addIngredient(state, action);
      break;
    case actionTypes.REMOVE_INGREDIENT:
      updatedState = removeIngredient(state, action);
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