import axios from "axios";
import { FETCH_PAYMENT_FAILURE, FETCH_PAYMENT_SUCCESS,FETCH_PAYMENT_CREATE_SUCCESS,FETCH_PAYMENT_CREATE_FAILURE } from "./types";

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

export const actionPaymentCreate = (amount, concept, description,callbackCreate,callbackErrorCreate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('https://bvmailcenter.com:8000/payments/create', {
  "concept": concept,
  "amount": amount,
  "description": description,
},{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });
 
     dispatch(fetchPaymentCreateSuccess(response.data)); // o response.data.data según tu backend
 callbackCreate(response.data)
    } catch (error) {
      
      dispatch(fetchPaymentCreateFailure(error.response?.data?.detail || error.message));
     callbackErrorCreate()
    }
  };
};

export const actionPaymentExecute = (paymentId, payerId, callback, callbackError) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log({
        payment_id: paymentId,
        payer_id: payerId
      })
      if (!paymentId || !payerId) {
        callbackError("Missing payment ID or payer ID");
        return;
      }

      const response = await axios.post('https://bvmailcenter.com:8000/payments/execute', {
        payment_id: paymentId,
        payer_id: payerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'  // también puedes agregar esto para mayor claridad
        }
      });
      console.log(response)

      callback(response.data); // ✅ para que llegue el status y el approval_url si aplica

    } catch (error) {
      console.log(error)
  
      callbackError(error.response.data.detail);
    }
  };
};
export const actionPaymentStatus = (paymentId, callback) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://bvmailcenter.com:8000/payments/status/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Aquí devuelves la data al componente
      if (callback) callback(null, response.data);
    } catch (error) {
      console.error(error);
      if (callback) callback(error, null);
    }
  };
};


export const fetchPaymentCreateSuccess = (value) => {
  return {
    type: FETCH_PAYMENT_CREATE_SUCCESS,
    payload: value,
  };
};

export const fetchPaymentCreateFailure = (value) => {
  return {
    type: FETCH_PAYMENT_CREATE_FAILURE,
    payload: value,
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
