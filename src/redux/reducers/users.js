// redux/reducers/index.js

import {FETCH_USERS_FAILURE,FETCH_USERS_SUCCESS} from '../actions/users/types';
const initialState = {
  data: {

  }

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
