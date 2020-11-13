import { UserType } from './authActionTypes';
export const USER_LOADING = "USER_LOADING";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const USER_FAIL = "USER_FAIL";
export const UPDATE_USER = "UPDATE_USER";

export interface AllUsersLoading {
  type: typeof USER_LOADING
}

export interface AllUsersFail {
  type: typeof USER_FAIL;
}

export interface AllUsersSuccess {
  type: typeof GET_ALL_USERS_SUCCESS | typeof UPDATE_USER;
  payload: UserType[];
}

export type UsersDispatchTypes = AllUsersLoading | AllUsersFail | AllUsersSuccess