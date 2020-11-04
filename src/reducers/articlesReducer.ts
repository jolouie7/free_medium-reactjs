import { ARTICLE_LOADING, ARTICLE_FAIL, ARTICLE_SUCCESS, ArticleDispatchTypes, ArticleType } from './../actions/articleActionTypes';

interface DefaultState {
  articles: ArticleType[];
  isLoading: boolean;
}

const initialState = {
  articles: [],
  isLoading: false,
};

const articleReducer = (state: DefaultState = initialState, action: ArticleDispatchTypes) => {
  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload
      }

    case ARTICLE_FAIL:
      return {
        ...state,
        isLoading: false,
        articles: []
      }

    default:
      return state;
  }
}

export default articleReducer;