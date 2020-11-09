import { tokenConfig } from './authActions';
import { Dispatch } from 'redux';
import axios from 'axios';
import backendHost from '../constants/api-config';
import { COMMENT_LOADING, COMMENT_FAIL, COMMENT_SUCCESS, CREATE_COMMENT, DELETE_COMMENT, CommentDispatchTypes } from './commentActionTypes';

// ****************************** Get all Comments ****************************** //
export const getComments = () => {
  return (dispatch: Dispatch<CommentDispatchTypes>, getState: () => void) => {
    // User loading
    dispatch({ type: COMMENT_LOADING });

    axios
      .get(`${backendHost}/api/articles/comments/allComments`)
      .then((res) =>
        dispatch({
          type: COMMENT_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: COMMENT_FAIL,
        });
      });
  };
};

// ****************************** Add a comment to an article ****************************** //
export const createComments = (content: string, article: string, user: string) => {
  return (dispatch: Dispatch<CommentDispatchTypes>, getState: () => void) => {
    // Request body
    const body = JSON.stringify({ content, article, user });
    dispatch({ type: COMMENT_LOADING });

    axios
      .post(`${backendHost}/api/articles/comments`, body, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data,
        })
      )
      .catch((error) => {
        // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: COMMENT_FAIL,
        });
      });
  };
};

// ****************************** Delete a comment from an article ****************************** //
export const deleteComment = (
  commentId: string
) => {
  return (dispatch: Dispatch<CommentDispatchTypes>, getState: () => void) => {
    dispatch({ type: COMMENT_LOADING });

    axios
      .delete(`${backendHost}/api/articles/comments/${commentId}`, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: DELETE_COMMENT,
          payload: res.data,
        })
      )
      .catch((error) => {
        // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: COMMENT_FAIL,
        });
      });
  };
};