import { RootStore } from "./../store";
import backendHost from "../constants/api-config";
import { Dispatch } from "redux";
import {
  ArticleDispatchTypes,
  ARTICLE_LOADING,
  ARTICLE_SUCCESS,
  ARTICLE_FAIL,
} from "./articleActionTypes";
import axios from "axios";
import { tokenConfig } from "./authActions";

// ****************************** Get all articles ****************************** //
// export const getExpenses = () => {
//   return (dispatch, getState) => {
//     dispatch(setArticleLoading());
//     axios
//       .get(`${backendHost}/api/expenses`, tokenConfig(getState))
//       .then((res) =>
//         dispatch({
//           type: GET_EXPENSES,
//           payload: res.data,
//         })
//       )
//       .catch((error) => {
//         dispatch({
//           type: ARTICLE_FAIL,
//         });
//       });
//   };
// };

export const getArticles = () => (
  dispatch: Dispatch<ArticleDispatchTypes>,
  // typing a function type
  // https://stackoverflow.com/questions/29689966/typescript-how-to-define-type-for-a-function-callback-as-any-function-type-no
  getState: () => void
) => {
  dispatch({ type: ARTICLE_LOADING });
  axios
    .get(`${backendHost}/api/articles`)
    .then((res) =>
      dispatch({
        type: ARTICLE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// Get one article
// Create an article
// Update an article
// Delete an article

// ****************************** Fetching Articles ****************************** //
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING,
  };
};