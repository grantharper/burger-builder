import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0
  },
  totalPrice: 4,
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
  for(let key in ingredients){
    totalPrice += (ingredients[key] * INGREDIENT_PRICES[key]);
  }
  return totalPrice;
}

const reducer = (state = initialState, action) => {

  let updatedState = {...state};

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
      };
      break;
    case actionTypes.REMOVE_INGREDIENT:
      updatedState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        }
      };
      break;
    default:
  }

  updatedState.totalPrice = calculateTotalPrice(updatedState.ingredients);
  return updatedState;
};

export default reducer;