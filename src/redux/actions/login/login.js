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
      callbackError("Email or password does not match");
    }
  };
};
export const actionSignUp = (parametros, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const body = {

        nombre: parametros.firstName,
        apellido: parametros.lastName,
        pmb: parametros.pmb,
        email: parametros.email,
        password: parametros.password,
      };

      const response = await axios.post(
        "https://bvmailcenter.com:8000/user/create/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      callback(); // o ajusta según lo que devuelva tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag);
    }
  };
};
export const actionConfirm = (parametros,token, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const body = {

 
        token: token,
        new_password: parametros.password,
      };

      const response = await axios.post(
        "https://bvmailcenter.com:8000/auth/user-reset-password/confirm",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      callback(); // o ajusta según lo que devuelva tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag);
    }
  };
};
export const actionConfirmAdmin = (parametros,token, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const body = {

 
        token: token,
        new_password: parametros.password,
      };

      const response = await axios.post(
        "https://bvmailcenter.com:8000/auth/admin-reset-password/confirm",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      callback(); // o ajusta según lo que devuelva tu backend
    } catch (error) {
      callbackError(error?.response?.data.detail || error.messag);
    }
  };
};
export const actionReset = (parametros, callback, callbackError,admin) => {
  return async (dispatch) => {
    try {
    
      var url = "https://bvmailcenter.com:8000/auth/user-reset-password"
      if(admin){
        url = "https://bvmailcenter.com:8000/auth/admin-reset-password"
      }
      const body = {

 
        email:  parametros.email,
  
      };

      const response = await axios.post(
       url,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      callback(); // o ajusta según lo que devuelva tu backend
    } catch (error) {
      callbackError();
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
