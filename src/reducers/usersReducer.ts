// import {
//   GET_ALL_USERS_LOADING,
//   GET_ALL_USERS_SUCCESS,
//   GET_ALL_USERS_FAIL,
// } from "../constants/users";

// const initialState = {
//   isLoading: false,
//   users: [],
//   error: null,
// };

// const usersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_USERS_LOADING:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case GET_ALL_USERS_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         users: action.payload,
//         error: null,
//       };
//     case GET_ALL_USERS_FAIL:
//       return {
//         ...state,
//         isLoading: false,
//         users: [],
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };

// export default usersReducer;

export {}