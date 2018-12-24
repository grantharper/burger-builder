import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = (order) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', order)
    .then(response => {
      console.log('orderId=', response.data.name);
      dispatch(purchaseBurgerSuccess(response.data.name, order));
      dispatch(purchaseInit());
    }).catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
  }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
    .then(response => {
      console.log(response);
      dispatch(fetchOrdersSuccess(response.data));
    }).catch(error => {
      console.log(error);
      dispatch(fetchOrdersFail(error));
    });
  }
}