import { RootStore } from "./../store";
import slugify from "slugify";
import marked from "marked";
import DOMPurify from "dompurify";
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
// ! test
export const updateArticle = (
  title: string,
  subTitle: string,
  content: string,
  tags: string[],
  likes: string[],
  articleId: string,
  slug: string
) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  let newSlug = slugify(title);
  newSlug = newSlug + slug.slice(-6);
  // Have the unchanged info be passed from the component to this action
  const articleToUpdate = {
    title: title,
    subTitle: subTitle,
    content: content,
    tags: tags,
    likes: likes,
    articleId: articleId,
    slug: newSlug,
    sanitizedHtml: DOMPurify.sanitize(marked(content)),
  };
  dispatch({ type: ARTICLE_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .put(
      `${backendHost}/api/articles/${articleId}`,
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
      console.log(error);
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// ****************************** Like article ****************************** //
// ! tested
export const likeArticle = (
  id: string,
) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  console.log("id: ", id)
  // Have the unchanged info be passed from the component to this action
  const articleToUpdate = {
    articleId: id,
  };
  dispatch({ type: ARTICLE_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .put(
      `${backendHost}/api/articles/like`,
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
      console.log(error);
      // dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: ARTICLE_FAIL,
      });
    });
};

// ****************************** Unlike article ****************************** //
// ! test
export const unlikeArticle = (
  id: string,
) => (dispatch: Dispatch<ArticleDispatchTypes>, getState: () => void) => {
  // Have the unchanged info be passed from the component to this action
  const articleToUpdate = {
    articleId: id,
  };
  dispatch({ type: ARTICLE_LOADING });
  // tokenConfig(getState), is attaching the token to the request in the header
  axios
    .put(
      `${backendHost}/api/articles/unlike`,
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
      console.log(error);
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

// // ****************************** Fetching Articles ****************************** //
// // ! Don't think i'm using this
// export const setArticleLoading = () => {
//   return {
//     type: ARTICLE_LOADING,
//   };
// };