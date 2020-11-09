import { UserType } from './authActionTypes';
import { ArticleType } from './articleActionTypes';
export const COMMENT_LOADING = "COMMENT_LOADING";
export const COMMENT_FAIL = "COMMENT_FAIL";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export interface CommentType {
  // id?: any; // set this to any because there was an error in the comments reducer
  _id?: any; // set this to any because there was an error in the Article.tsx
  content: string;
  article: ArticleType;
  user: UserType;
  registerDate?: Date;
}

export interface CommentLoading {
  type: typeof COMMENT_LOADING
}

export interface CommentFail {
  type: typeof COMMENT_FAIL
}
export interface CommentSuccess {
  type: typeof COMMENT_SUCCESS | typeof CREATE_COMMENT | typeof DELETE_COMMENT;
  payload: CommentType[];
}

export type CommentDispatchTypes = CommentLoading | CommentFail | CommentSuccess