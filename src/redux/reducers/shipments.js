// redux/reducers/index.js

import {FETCH_SHIPMENT_FAILURE,FETCH_SHIPMENT_SUCCESS} from '../actions/shipments/types';
const initialState = {
  data: {

  }

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_SHIPMENT_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_SHIPMENT_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
