import axios from "axios";
import { FETCH_PAYMENT_FAILURE, FETCH_PAYMENT_SUCCESS } from "./types";
// Aquí IMPORTAMOS directamente el archivo JSON
import registros from "./prueba.json";  // Ajusta la ruta si está en otra carpeta

// Servicio API si en un futuro quieres usarlo
const apiService = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const actionPaymentGet = () => {
  return async (dispatch) => {
    try {
      // Si quieres en un futuro hacer petición real, aquí iría
      // const response = await apiService.get(`shipment/`, { headers: { Authorization: `${token}` } });

      // Pero ahora cargamos el archivo local
      console.log(registros)
      dispatch(fetchPaymentSuccess(registros));
    } catch (error) {
      dispatch(fetchPaymentFailure(error.message));
    }
  };
};
export const actionPaymentPost = (data,callback,callbackError) => {
  return async (dispatch) => {
    try {
      // Si quieres en un futuro hacer petición real, aquí iría
      // const response = await apiService.post(`shipment/`, { headers: { Authorization: `${token}` } });

      // Pero ahora cargamos el archivo local
      //dispatch(fetchPaymentSuccess(registros));
      callback()
    } catch (error) {
      dispatch(callbackError(error.message));
    }
  };
};

export const fetchPaymentSuccess = (value) => {
  return {
    type: FETCH_PAYMENT_SUCCESS,
    payload: value,
  };
};

export const fetchPaymentFailure = (value) => {
  return {
    type: FETCH_PAYMENT_FAILURE,
    payload: value,
  };
};
