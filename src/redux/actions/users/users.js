import axios from "axios";
import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "./types";

// Servicio API si en un futuro quieres usarlo
const apiService = axios.create({
  baseURL: `https://bvmailcenter.com:8000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const actionUsersGet = (id) => {
  return async (dispatch) => {
    try {
     
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("tokenadmin");
       const response = await axios.get(`https://bvmailcenter.com:8000/admin/${id}/users?page=1&size=50`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      dispatch(fetchUsersSuccess(response.data.items)); // o response.data.data según tu backend
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};
export const actionUsersDelete = (id,callback,callbackError) => {
  return async (dispatch) => {
    try {
   
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("tokenadmin");
       const response = await axios.delete(`https://bvmailcenter.com:8000/admin/desactivar_user/${id}/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      callback() // o response.data.data según tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag)
    }
  };
};
export const actionUsersActivate = (id,callback,callbackError) => {
  return async (dispatch) => {
    try {
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("tokenadmin");
       const response = await axios.delete(`https://bvmailcenter.com:8000/admin/activar_user/${id}/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      callback() // o response.data.data según tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag)
    }
  };
};
export const actionUsersAdminUpdate = (data,id,callback,callbackError) => {
  return async (dispatch) => {
    try {
     const body = {

        nombre: data.firstName,
        apellido: data.lastName,
        email: data.email,
        password: data.password,
      };
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("tokenadmin");
       const response = await axios.put(`https://bvmailcenter.com:8000/admin/${id}/`, body,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      callback() // o response.data.data según tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag)
    }
  };
};
export const actionUsersUpdate = (data,id,callback,callbackError) => {
  return async (dispatch) => {
    try {
     const body = {

        nombre: data.firstName,
        apellido: data.lastName,
        email: data.email,
        password: data.password,
      };
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("token");
       const response = await axios.put(`https://bvmailcenter.com:8000/user/${id}/`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

       callback() // o response.data.data según tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag)
    }
  };
};
export const fetchUsersSuccess = (value) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: value,
  };
};

export const fetchUsersFailure = (value) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: value,
  };
};
