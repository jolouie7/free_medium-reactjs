import { UserType } from './authActionTypes';

export const ARTICLE_LOADING = "ARTICLE_LOADING";
export const ARTICLE_SUCCESS = "ARTICLE_SUCCESS";
export const ARTICLE_FAIL = "ARTICLE_FAIL";

interface ArticleType {
  title: string;
  subTitle: string;
  content: string;
  tags: string[];
  likes: string[];
  registerDate: Date;
  following: UserType; // getting the type of the user obj
}

interface ArticleLoading {
  type: typeof ARTICLE_LOADING
}

interface ArticleFail {
  type: typeof ARTICLE_FAIL
}

interface ArticleSuccess {
  type: typeof ARTICLE_SUCCESS,
  payload: ArticleType
}

export type ArticleDispatchTypes =
  | ArticleLoading
  | ArticleFail
  | ArticleSuccess;