import { Dispatch } from 'redux';
import backendHost from "../constants/api-config";
// import { returnErrors } from "./errorActions";
import axios from "axios";
import { tokenConfig } from "./authActions";
import {
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  UsersDispatchTypes,
} from "./usersActionTypes";

// Get All Users
export const getAllUsers = () => {
  return (dispatch: Dispatch<UsersDispatchTypes>, getState: () => void) => {
    // User loading
    dispatch({ type: GET_ALL_USERS_LOADING });

    axios
      .get(`${backendHost}/api/users`)
      .then((res) =>
        dispatch({
          type: GET_ALL_USERS_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: GET_ALL_USERS_FAIL,
        });
      });
  };
};

export {}