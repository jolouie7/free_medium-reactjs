import { UserType } from './../actions/authActionTypes';
import {
  USER_LOADING,
  GET_ALL_USERS_SUCCESS,
  USER_FAIL,
  UPDATE_USER,
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
    case USER_LOADING:
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
    // ! find the _id/id of the user and mutate the users in state
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case USER_FAIL:
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