import {
  COMMENT_LOADING,
  COMMENT_FAIL,
  COMMENT_SUCCESS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CommentDispatchTypes,
  CommentType,
} from "../actions/commentActionTypes";

interface DefaultState {
  isLoading: boolean;
  comments: CommentType[]
}

const initialState = {
  isLoading: false,
  comments: []
}

const commentReducer = (
  state: DefaultState = initialState,
  action: CommentDispatchTypes
) => {
  switch (action.type) {
    case COMMENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        comments: [],
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(comment => comment._id !== action.payload),
      };

    default:
      return state;
  }
};

export default commentReducer;