import axios from "axios"
import {FETCH_HOME_PROGRESS_FAILURE,FETCH_HOME_PROGRESS_SUCCESS, FETCH_HOME_CHECK_SUCCESS, FETCH_HOME_CHECK_FAILURE} from "./types"
const apiService = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionHomeTodayGet = () => {
  return async (dispatch) => {
    
    try {
      const token = localStorage.getItem("token");
      const response = await apiService.get(  `records/check/` ,{
        headers: { Authorization: `${token}` },
      });
   
      dispatch(fetchHomeCheckSuccess(response.data));
    } catch (error) {
      dispatch(fetchHomeCheckFailure(error.message));
    }
  };
};
export const actionHomeProgressGet = (startDate,endDate) => {
  return async (dispatch) => {
    const params = {
      startDate :startDate,
      endDate :endDate,
    }
    try {
      const token = localStorage.getItem("token");
      const response = await apiService.post(  `records/progress/` ,params,{
        headers: { Authorization: `${token}` },
      });
  
      dispatch(fetchHomeProgressSuccess(response.data));
    } catch (error) {
      dispatch(fetchHomeProgressFailure(error.message));
    }
  };
};
export const fetchHomeProgressSuccess = (value) => {
  return {
    type: FETCH_HOME_PROGRESS_SUCCESS,
    payload: value,
  };
};

export const fetchHomeProgressFailure = (value) => {
  return {
    type: FETCH_HOME_PROGRESS_FAILURE,
    payload: value,
  };
};
export const fetchHomeCheckSuccess = (value) => {
  return {
    type: FETCH_HOME_CHECK_SUCCESS,
    payload: value,
  };
};

export const fetchHomeCheckFailure = (value) => {
  return {
    type: FETCH_HOME_CHECK_FAILURE,
    payload: value,
  };
};
