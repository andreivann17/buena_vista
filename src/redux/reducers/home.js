// redux/reducers/index.js

import {FETCH_HOME_PROGRESS_FAILURE,FETCH_HOME_PROGRESS_SUCCESS, FETCH_HOME_CHECK_SUCCESS, FETCH_HOME_CHECK_FAILURE} from '../actions/home/types';
const initialState = {
  checkToday: [],
  progressWeek: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_CHECK_SUCCESS:
      return {
        ...state,
        checkToday:action.payload,
      };
    case FETCH_HOME_CHECK_FAILURE:
      return {
        ...state,
        checkToday: action.payload,
      };
      case FETCH_HOME_PROGRESS_SUCCESS:
      return {
        ...state,
        progressWeek:action.payload,
      };
    case FETCH_HOME_PROGRESS_FAILURE:
      return {
        ...state,
        progressWeek: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
