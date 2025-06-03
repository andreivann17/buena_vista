// redux/reducers/index.js

import {FETCH_PAYMENT_FAILURE,FETCH_PAYMENT_SUCCESS,FETCH_PAYMENT_CREATE_FAILURE,FETCH_PAYMENT_CREATE_SUCCESS} from '../actions/payment/types';
const initialState = {
  data: {

  },
  dataCreate:{

  }

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_PAYMENT_FAILURE:
      return {
        ...state,
        data: action.payload,
      };
 case FETCH_PAYMENT_CREATE_SUCCESS:
      return {
        ...state,
        dataCreate:action.payload,
      };
    case FETCH_PAYMENT_CREATE_FAILURE:
      return {
        ...state,
        dataCreate: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
