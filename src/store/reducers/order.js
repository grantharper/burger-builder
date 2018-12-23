import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orderData: null,
  error: false
};

const order = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state
      };
    default:
      return {
        ...state
      }

  }

};

export default order;