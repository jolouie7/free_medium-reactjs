import { RootStore } from "./../store";
// user auth actions
import backendHost from "../constants/api-config";
import { Dispatch } from "redux";
import {
  UserDispatchTypes,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authActionTypes";
import axios from "axios";

// ****************************** Check token & load user ****************************** //
export const loadUser = () => (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: RootStore
) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${backendHost}/api/auth/user`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((error) => {
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// ****************************** Register User ****************************** //
export const register = (
  name: string,
  username: string,
  email: string,
  password: string
) => (dispatch: Dispatch<UserDispatchTypes>) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, username, email, password });

  axios
    .post(`${backendHost}/api/auth/register`, body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      // );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// ****************************** Login User ****************************** //
export const login = (username: string, password: string) => (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  axios
    .post(`${backendHost}/api/auth/login`, body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      // );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// ****************************** Logout User ****************************** //
export const logout = () => {
  // window.location.href = `/`;
  return {
    type: LOGOUT_SUCCESS,
  };
};

// ****************************** Setup config/headers and token ****************************** //
export const tokenConfig = (getState: any) => {
  // Get token from localstorage
  const token: string = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
      // ! find out how to not have this key here and not get a TS error
      "x-auth-token": "",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
