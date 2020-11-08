import { UserType } from './authActionTypes';

export const ARTICLE_LOADING = "ARTICLE_LOADING";
export const GET_ARTICLES = "GET_ARTICLES";
export const GET_ARTICLE = "GET_ARTICLE";
export const ADD_ARTICLES = "ADD_ARTICLES";
export const UPDATE_ARTICLES = "UPDATE_ARTICLES";
export const DELETE_ARTICLES = "DELETE_ARTICLES";
export const ARTICLE_FAIL = "ARTICLE_FAIL";

export interface ArticleType {
  _id: any;
  title: string;
  subTitle: string;
  content: string;
  tags: string[];
  likes: string[];
  user: string;
  registerDate: Date;
  following: UserType; // getting the type of the user obj
  slug: string;
}

export interface ArticleLoading {
  type: typeof ARTICLE_LOADING
}

export interface ArticleFail {
  type: typeof ARTICLE_FAIL
}

export interface ArticleSuccess {
  type:
    | typeof GET_ARTICLES
    | typeof GET_ARTICLE
    | typeof ADD_ARTICLES
    | typeof UPDATE_ARTICLES
    | typeof DELETE_ARTICLES
  payload: ArticleType;
}

export type ArticleDispatchTypes =
  | ArticleLoading
  | ArticleFail
  | ArticleSuccess;