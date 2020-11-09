import { UserType } from './authActionTypes';
import { ArticleType } from './articleActionTypes';
export const COMMENT_LOADING = "COMMENT_LOADING";
export const COMMENT_FAIL = "COMMENT_FAIL";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const CREATE_COMMENT = "CREATE_COMMENT";

export interface CommentType {
  content: string;
  article: ArticleType;
  user: UserType;
}

export interface CommentLoading {
  type: typeof COMMENT_LOADING
}

export interface CommentFail {
  type: typeof COMMENT_FAIL
}
export interface CommentSuccess {
  type: typeof COMMENT_SUCCESS | typeof CREATE_COMMENT;
  payload: CommentType[];
}

export type CommentDispatchTypes = CommentLoading | CommentFail | CommentSuccess