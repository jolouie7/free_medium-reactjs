import { ARTICLE_LOADING, ARTICLE_FAIL, GET_ARTICLES, GET_ARTICLE, ADD_ARTICLES, UPDATE_ARTICLES, DELETE_ARTICLES, ArticleDispatchTypes, ArticleType } from './../actions/articleActionTypes';

interface DefaultState {
  article?: ArticleType[];
  articles: ArticleType[];
  isLoading: boolean;
}

const initialState = {
  article: [],
  articles: [],
  isLoading: false,
};

const articleReducer = (state: DefaultState = initialState, action: ArticleDispatchTypes) => {
  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ARTICLES:
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };

    case GET_ARTICLE:
      return {
        ...state,
        isLoading: false,
        article: action.payload,
      };

    case ADD_ARTICLES:
      return {
        ...state,
        isLoading: false,
        articles: [...state.articles, action.payload],
      };

    case UPDATE_ARTICLES:
      // ! Either filter everything except the updated article and add it in later or
      // ! find the _id of the article and mutate the articles in state
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
      };

    case DELETE_ARTICLES:
      return {
        ...state,
        expenses: state.articles.filter(
          (article) => article._id !== action.payload
        ),
      };

    case ARTICLE_FAIL:
      return {
        ...state,
        isLoading: false,
        articles: [],
      };

    default:
      return state;
  }
}

export default articleReducer;