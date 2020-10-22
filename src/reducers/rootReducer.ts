// Assuming you have more then one reducer
import { combineReducers } from "redux";
// import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  // itemReducer,
  authReducer,
  errorReducer,
  usersReducer,
});