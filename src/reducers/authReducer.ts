// user auth reducer
import {
  UserType,
  UserDispatchTypes,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/authActionTypes";

const userObj = localStorage.getItem("user");
const user: UserType = userObj !== null ? JSON.parse(userObj) : null;

interface IDefaultState {
  token?: string;
  isAuthenticated?: boolean;
  isLoading: boolean;
  user?: UserType;
}

// const initialState: IDefaultState = user
const initialState: any = user
  ? {
      token: localStorage.getItem("token"),
      isAuthenticated: true,
      isLoading: false,
      user: user,
    }
  : {
      token: localStorage.getItem("token"),
      isAuthenticated: null,
      isLoading: false,
      user: null,
    };

const authReducer = (
  state: IDefaultState = initialState,
  action: any
  // ! figure out how to type setting token and user in localstorage
  // action: UserDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: undefined, // changed from null
        user: undefined, // changed from null
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
