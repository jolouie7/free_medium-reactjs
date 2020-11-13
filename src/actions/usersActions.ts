import { tokenConfig } from './authActions';
import { Dispatch } from 'redux';
import backendHost from "../constants/api-config";
// import { returnErrors } from "./errorActions";
import axios from "axios";
import {
  USER_LOADING,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USER,
  USER_FAIL,
  UsersDispatchTypes,
} from "./usersActionTypes";

// ****************************** Get All Users ****************************** //
export const getAllUsers = () => {
  return (dispatch: Dispatch<UsersDispatchTypes>, getState: () => void) => {
    // User loading
    dispatch({ type: USER_LOADING });

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
          type: USER_FAIL,
        });
      });
  };
};

// ****************************** Update User ****************************** //
// ! test
export const updateUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  bio: string,
  image: string,
  likes: string[],
  following: string[],
  registerDate: Date,
  id: string,
) => (dispatch: Dispatch<UsersDispatchTypes>, getState: () => void) => {
  // Have the unchanged info be passed from the component to this action
  const userToUpdate = {
    name,
    email,
    username,
    password,
    bio,
    image,
    likes,
    following,
    registerDate,
    id,
  };
  dispatch({ type: USER_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .patch(
      `${backendHost}/api/users/${id}`,
      userToUpdate,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: USER_FAIL,
      });
    });
};