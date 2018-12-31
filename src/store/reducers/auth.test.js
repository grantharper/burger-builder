import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
  };

  it('should return the initial state when no state is supplied and default action', () => {

    expect(reducer(undefined, {})).toEqual(initialState);

  });


  it('should store the token upon initial login', () => {

    const stateWithToken = {
      ...initialState,
      token: 'blah',
      loading: false,
      error: null,
      userId: 'user'
    };

    expect(reducer(initialState, {type: actionTypes.AUTH_SUCCESS, token: 'blah', userId: 'user'})).toEqual(stateWithToken)

  });


});