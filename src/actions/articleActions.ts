import { RootStore } from "./../store";
import backendHost from "../constants/api-config";
import { Dispatch } from "redux";
import {
  ArticleDispatchTypes,
  ARTICLE_LOADING,
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLES,
  UPDATE_ARTICLES,
  DELETE_ARTICLES,
  ARTICLE_FAIL,
} from "./articleActionTypes";
import axios from "axios";
import { tokenConfig } from "./authActions";

// ****************************** Get all articles ****************************** //
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
        type: GET_ARTICLES,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// ****************************** Get one article ****************************** //
export const getOneArticle = (slug: string) => (
  dispatch: Dispatch<ArticleDispatchTypes>,
  // typing a function type
  // https://stackoverflow.com/questions/29689966/typescript-how-to-define-type-for-a-function-callback-as-any-function-type-no
  getState: () => void,
) => {
  dispatch({ type: ARTICLE_LOADING });
  axios
    .get(`${backendHost}/api/articles/${slug}`)
    .then((res) =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: ARTICLE_FAIL,
        // payload: null
      });
    });
};

// ****************************** Create an article ****************************** //
// ! test
export const createArticle = (
  title: string,
  subTitle: string,
  content: string,
  tags: string,
  user: string
) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ title, subTitle, content, tags, user });

  dispatch({ type: ARTICLE_LOADING });
  axios
    .post(`${backendHost}/api/articles`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ARTICLES,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      // );
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// ****************************** Update an article ****************************** //
// ? Do I need to pass in userID?
// ! test
export const updateArticle = (
  title: string,
  subTitle: string,
  content: string,
  tags: string[],
  id: string,
  slug: string,
) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  // Have the unchanged info be passed from the component to this action
  const articleToUpdate = {
    title: title,
    subTitle: subTitle,
    content: content,
    tags: tags,
  };
  dispatch({ type: ARTICLE_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .patch(
      `${backendHost}/api/articles/${id}`,
      articleToUpdate,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_ARTICLES,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error)
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// ****************************** Delete an article ****************************** //
// ! test
export const deleteArticle = (id: string) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  dispatch({ type: ARTICLE_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .delete(`${backendHost}/api/articles/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ARTICLES,
        payload: res.data,
      })
    )
    .catch((error) => {
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
}

// ****************************** Fetching Articles ****************************** //
// ! Don't think i'm using this
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING,
  };
};