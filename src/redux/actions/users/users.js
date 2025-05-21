import axios from "axios";
import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "./types";
// Aquí IMPORTAMOS directamente el archivo JSON
import registros from "./prueba.json";  // Ajusta la ruta si está en otra carpeta

// Servicio API si en un futuro quieres usarlo
const apiService = axios.create({
  baseURL: `https://bvmailcenter.com:8000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const actionUsersGet = () => {
  return async (dispatch) => {
    try {
      // Si quieres en un futuro hacer petición real, aquí iría
      // const response = await apiService.get(`shipment/`, { headers: { Authorization: `${token}` } });

      // Pero ahora cargamos el archivo local
      dispatch(fetchUsersSuccess(registros));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
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
