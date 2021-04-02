/* eslint-disable no-underscore-dangle */
import {
  UserWordsAction,
  UserWordsActionTypes,
  UserWordsState,
} from "../../types/userWords-types";

const defaultState: UserWordsState = {
  aggregatedWords: {
    words: [],
    totalCount: 0,
  },
  page: 0,
  pages: [],
  error: null,
  createError: null,
  isFetching: true,
  isPagesFetching: true,
  isUpdating: false,
};

const userWordsReducer = (
  state = defaultState,
  action: UserWordsAction
): UserWordsState => {
  switch (action.type) {
    case UserWordsActionTypes.FETCH_USER_WORDS:
      return { ...state, isFetching: true, error: null };
    case UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        aggregatedWords: action.payload,
      };
    case UserWordsActionTypes.FETCH_USER_WORDS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        aggregatedWords: {
          words: [],
          totalCount: 0,
        },
      };
    case UserWordsActionTypes.SET_USER_WORDS_PAGE:
      return { ...state, page: action.payload };
    case UserWordsActionTypes.CREATE_USER_WORD:
      return { ...state, isUpdating: true, error: null };
    case UserWordsActionTypes.CREATE_USER_WORD_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
      };
    }
    case UserWordsActionTypes.CREATE_USER_WORD_ERROR:
      return { ...state, isUpdating: false, error: action.payload };

    case UserWordsActionTypes.GET_USER_WORDS_PAGES:
      return { ...state, isPagesFetching: true, error: null };
    case UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS:
      return {
        ...state,
        isPagesFetching: false,
        error: null,
        pages: action.payload,
      };
    case UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR:
      return { ...state, isPagesFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default userWordsReducer;

// aggregatedWords: state.aggregatedWords.map((el, i) =>
//           i === 0
//             ? {
//                 ...el,
//                 paginatedResults: el.paginatedResults.map((word) =>
//                   word._id === action.payload.id
//                     ? { ...word, userWord: action.payload.userWord }
//                     : word
//                 ),
//               }
//             : el
//         ),
