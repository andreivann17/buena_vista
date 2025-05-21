// redux/reducers/index.js

import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from '../actions/login/types';
const initialState = {
  login: {
   
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        login:action.payload,
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        login: action.payload,
      };
  
    default:
      return state;
  }
};

export default rootReducer;
