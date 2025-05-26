import axios from "axios";
import { FETCH_PAYMENT_FAILURE, FETCH_PAYMENT_SUCCESS } from "./types";

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
      const token = localStorage.getItem("token");
      const response = await axios.get('https://bvmailcenter.com:8000/payments/concepts', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      dispatch(fetchPaymentSuccess(response.data)); // o response.data.data según tu backend
    } catch (error) {
      dispatch(fetchPaymentFailure(error.response?.data?.detail || error.message));
    }
  };
};

export const actionPaymentCreate = (amount, concept, description) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('https://bvmailcenter.com:8000/payments/execute', {
  "concept": concept,
  "amount": amount,
  "description": description,
},{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });
 
      //dispatch(fetchPaymentSuccess(response.data)); // o response.data.data según tu backend
    } catch (error) {
   
      //dispatch(fetchPaymentFailure(error.response?.data?.detail || error.message));
    }
  };
};


export const actionPaymentExecute = (data,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('https://bvmailcenter.com:8000/payments/execute', JSON.stringify({
        payment_id: data.orderID,
        payer_id: data.payerID
      }),{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });
      callback()
      //dispatch(fetchPaymentSuccess(response.data)); // o response.data.data según tu backend
    } catch (error) {
      callbackError()
      //dispatch(fetchPaymentFailure(error.response?.data?.detail || error.message));
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
