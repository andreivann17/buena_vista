import axios from "axios";
import { FETCH_SHIPMENT_FAILURE, FETCH_SHIPMENT_SUCCESS } from "./types";


// Servicio API si en un futuro quieres usarlo
const apiService = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const actionShipmentGet = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://bvmailcenter.com:8000/envios/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      dispatch(fetchShipmentSuccess(response.data.items)); // o response.data.data según tu backend
    } catch (error) {
      dispatch(fetchShipmentFailure(error.response?.data?.detail || error.message));
    }
  };
};
export const actionShipmentAdminGet = () => {
  return async (dispatch) => {
    try {
      const tokenAdmin = localStorage.getItem("tokenadmin");
      const response = await axios.get('https://bvmailcenter.com:8000/envios/list?skip=0&limit=7000&page=1&size=50', {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
          Accept: 'application/json',
        }
      });
      console.log(response.data)
      dispatch(fetchShipmentSuccess(response.data.items)); // o response.data.data según tu backend
    } catch (error) {
    
      dispatch(fetchShipmentFailure(error.response?.data?.detail || error.message));
    }
  };
};
export const fetchShipmentSuccess = (value) => {
  return {
    type: FETCH_SHIPMENT_SUCCESS,
    payload: value,
  };
};

export const fetchShipmentFailure = (value) => {
  return {
    type: FETCH_SHIPMENT_FAILURE,
    payload: value,
  };
};
