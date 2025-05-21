// redux/reducers/index.js

import { FETCH_INFOUSER_FAILURE,FETCH_INFOUSER_SUCCESS,FETCH_INFOADMIN_FAILURE,FETCH_INFOADMIN_SUCCESS } from '../actions/menus/types';
const initialState = {
  infoUser:{id:"",nombre:"",pmb:"",apellido:"",email:""},
  infoAdmin:{id:"",nombre:"",pmb:"",apellido:"",email:""}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_INFOUSER_SUCCESS:
        return {
          ...state,
          infoUser:action.payload,
        };
  case FETCH_INFOUSER_FAILURE:
        return {
          ...state,
          infoUser: action.payload,
        };
        case FETCH_INFOADMIN_SUCCESS:
          return {
            ...state,
            infoAdmin:action.payload,
          };
    case FETCH_INFOADMIN_FAILURE:
          return {
            ...state,
            infoAdmin: action.payload,
          };
    default:
      return state;
  }
};

export default rootReducer;
