// Assuming you have more then one reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import usersReducer from "./usersReducer";
// import errorReducer from "./errorReducer";
import articlesReducer from "./articlesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // errorReducer,
  // usersReducer,
  articles: articlesReducer,
});

// export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;