// User auth action types
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export type UserType = {
  id?: any;
  _id?: any;
  name: string;
  email: string;
  username: string;
  password?: string;
  bio?: string;
  image?: string;
  likes?: string[];
  following?: string[];
  register_date?: Date; // might want to fix this
  token?: string;
};

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserLoaded {
  type: typeof USER_LOADED;
}

export interface UserFail {
  type:
    | typeof AUTH_ERROR
    | typeof LOGIN_FAIL
    | typeof LOGOUT_SUCCESS
    | typeof REGISTER_FAIL;
}

export interface UserSuccess {
  type: typeof LOGIN_SUCCESS | typeof REGISTER_SUCCESS;
  payload: UserType;
}

export type UserDispatchTypes =
  | UserLoading
  | UserLoaded
  | UserFail
  | UserSuccess;
