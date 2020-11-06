import { UserType } from './../actions/authActionTypes';
import {
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  UsersDispatchTypes,
} from "../actions/usersActionTypes";

interface DefaultState {
  isLoading: boolean;
  users: UserType[];

}

const initialState: DefaultState = {
  isLoading: false,
  users: [],
};

const usersReducer = (
  state: DefaultState = initialState,
  action: UsersDispatchTypes
) => {
  switch (action.type) {
    case GET_ALL_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        users: [],
      };
    default:
      return state;
  }
};

export default usersReducer;