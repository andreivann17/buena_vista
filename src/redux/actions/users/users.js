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
      console.log(id)
      // Si quieres en un futuro hacer petición real, aquí iría
      const token = localStorage.getItem("tokenadmin");
       const response = await axios.get(`https://bvmailcenter.com:8000/admin/${id}/users`, {"admin_id":id},{
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
