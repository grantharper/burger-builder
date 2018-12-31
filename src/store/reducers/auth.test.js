import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  it('should return the initial state when no state is supplied and default action', () => {

    const initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false
    };

    expect(reducer(undefined, {})).toEqual(initialState);

  });


});