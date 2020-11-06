import { UserType } from './authActionTypes';
export const GET_ALL_USERS_LOADING = "GET_ALL_USERS_LOADING";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL";

export interface AllUsersLoading {
  type: typeof GET_ALL_USERS_LOADING
}

export interface AllUsersFail {
  type: typeof GET_ALL_USERS_FAIL
}

export interface AllUsersSuccess {
  type: typeof GET_ALL_USERS_SUCCESS,
  payload: UserType[]
}

export type UsersDispatchTypes = AllUsersLoading | AllUsersFail | AllUsersSuccess