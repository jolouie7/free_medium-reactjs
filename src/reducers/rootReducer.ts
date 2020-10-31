// Assuming you have more then one reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import usersReducer from "./usersReducer";
// import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  authReducer,
  // errorReducer,
  // usersReducer,
});

// export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;