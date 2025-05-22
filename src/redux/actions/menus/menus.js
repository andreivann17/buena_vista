import {apiService,apiServiceGet} from "../../../containers/pages/utils/apiService";
import { FETCH_INFOADMIN_SUCCESS, FETCH_INFOADMIN_FAILURE,FETCH_INFOUSER_FAILURE,FETCH_INFOUSER_SUCCESS } from './types';
import axios from 'axios';
export const actionInfoAdmin = () => {
  return async (dispatch) => {
    try {
      const tokenAdmin = localStorage.getItem("tokenadmin");
      const response = await axios.get('https://bvmailcenter.com:8000/admin/me', {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
          Accept: 'application/json',
        }
      });

      dispatch(fetchInfoAdminSuccess(response.data));
    } catch (error) {
      dispatch(fetchInfoAdminFailure(error.message));
    }
  };
};
export const actionTokenValidate = (callback401) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://bvmailcenter.com:8000/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

    } catch (error) {
      
        if(error.request.status){
callback401()
      }
      dispatch(fetchUserFailure(error.response?.data?.detail || error.message));
    }
  };
};
export const actionTokenValidateAdmin = (callback401) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokenadmin");
      const response = await axios.get('https://bvmailcenter.com:8000/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

    } catch (error) {
      
        if(error.request.status){
callback401()
      }
      dispatch(fetchUserFailure(error.response?.data?.detail || error.message));
    }
  };
};
export const actionInfoUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://bvmailcenter.com:8000/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      dispatch(fetchUserSuccess(response.data)); // o response.data.data según tu backend
    } catch (error) {
      dispatch(fetchUserFailure(error.response?.data?.detail || error.message));
    }
  };
};

export const fetchInfoAdminSuccess = (data) => {
  return {
    type: FETCH_INFOADMIN_SUCCESS,
    payload: data,
  };
};

export const fetchInfoAdminFailure = (error) => {
  return {
    type: FETCH_INFOADMIN_FAILURE,
    payload: error,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_INFOUSER_SUCCESS,
    payload: data,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_INFOUSER_FAILURE,
    payload: error,
  };
};