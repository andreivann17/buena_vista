import {apiServiceNoToken} from "../../../containers/pages/utils/apiService";
import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from './types';
import axios from "axios";

export const actionLogin = (parametros, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const body = new URLSearchParams();
      body.append("grant_type", "password"); // requerido por la API
      body.append("username", parametros.username);
      body.append("password", parametros.password);
      // Opcional si se necesitan:
      // body.append("scope", "");
      // body.append("client_id", "");
      // body.append("client_secret", "");

      const response = await axios.post(
        "https://bvmailcenter.com:8000/auth/user-token/",
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      callback(response.data.access_token);
    } catch (error) {
      console.log(error.message);
      callbackError("Email or password does not match");
    }
  };
};


export const actionLoginAdmin = (parametros, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const body = new URLSearchParams();
      body.append("grant_type", "password"); // requerido por la API
      body.append("username", parametros.username);
      body.append("password", parametros.password);
      // Opcional si se necesitan:
      // body.append("scope", "");
      // body.append("client_id", "");
      // body.append("client_secret", "");

      const response = await axios.post(
        "https://bvmailcenter.com:8000/auth/admin-token/",
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      callback(response.data.access_token);
    } catch (error) {
      console.log(error.message);
      callbackError("Email or password does not match");
    }
  };
};

export const actionSignUp = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:5000/api/users/signup/`,
        parametros
      );
      localStorage.setItem("token", response.data.token);
      //dispatch(fetchLoginSuccess(response.data.role_permissions))
      callback(response.data.data)
    } catch (error) {
      console.log(error.message)
      callbackError(error.message);
      //dispatch(fetchLoginFailure(error.message));
    }
  };
};
export const actionEmail = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:5000/api/users/email/`,
        parametros
      );
      console.log(response.data)
      callback(response.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionValidateCode = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      console.log(parametros)
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:5000/api/users/validate-code/`,
        parametros,
    
      );
      callback(response.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionNewPassword = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:5000/api/users/new-password/`,
        parametros,
   
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const fetchLoginSuccess = (value) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: value,
  };
};

export const fetchLoginFailure = (value) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: value,
  };
};
