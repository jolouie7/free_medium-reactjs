// import types

interface DefaultState {

}

const initialState = {
  articles: //type for array of articles
}

const articleReducer = (state = initialState, action) => {
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