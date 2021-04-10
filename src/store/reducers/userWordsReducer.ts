/* eslint-disable no-underscore-dangle */
import {
  UserWordsAction,
  UserWordsActionTypes,
  UserWordsState,
} from "../../types/user-words-types";

const defaultWords = {
  words: [],
  totalCount: 0,
};

const defaultState: UserWordsState = {
  aggregatedWords: defaultWords,
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
      return {
        ...state,
        isFetching: true,
        error: null,
      };
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
      };
    case UserWordsActionTypes.SET_USER_WORDS_PAGE:
      return {
        ...state,
        page: action.payload,
        isFetching: true,
        error: "error",
        aggregatedWords: defaultWords,
      };
    case UserWordsActionTypes.CREATE_USER_WORD:
      return { ...state, isUpdating: true, error: null };
    case UserWordsActionTypes.CREATE_USER_WORD_SUCCESS: {
      const changeWords = state.aggregatedWords.words
        .map((word) =>
          word._id === action.payload.id
            ? { ...word, userWord: action.payload.userWord }
            : word
        )
        .filter((word) => {
          if (word.userWord) {
            if (word.userWord.status === "deleted") {
              return false;
            }
            return true;
          }
          return true;
        });
      return {
        ...state,
        isUpdating: false,
        pages: state.pages
          .map((page) =>
            page._id === action.payload.page
              ? { ...page, count: changeWords.length }
              : page
          )
          .filter((page) => page.count > 0),
        aggregatedWords: {
          ...state.aggregatedWords,
          totalCount: changeWords.length,
          words: changeWords,
        },
      };
    }
    case UserWordsActionTypes.CREATE_USER_WORD_ERROR:
      return { ...state, isUpdating: false, error: action.payload };

    case UserWordsActionTypes.GET_USER_WORDS_PAGES:
      return {
        ...state,
        isPagesFetching: true,
        isFetching: true,
        error: null,
        pages: [],
        page: 0,
      };
    case UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS:
      return {
        ...state,
        isPagesFetching: false,
        error: null,
        pages: action.payload,
      };
    case UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR:
      return { ...state, isPagesFetching: false, error: action.payload };
    case UserWordsActionTypes.UPDATE_USER_WORD:
      return { ...state, isUpdating: true, error: null };
    case UserWordsActionTypes.UPDATE_USER_WORD_SUCCESS: {
      const changeWords = state.aggregatedWords.words.map((word) =>
        word._id === action.payload.id
          ? { ...word, userWord: action.payload.userWord }
          : word
      );
      return {
        ...state,
        isUpdating: true,
        aggregatedWords: {
          ...state.aggregatedWords,
          totalCount: changeWords.length,
          words: changeWords,
        },
      };
    }
    case UserWordsActionTypes.UPDATE_USER_WORD_ERROR:
      return { ...state, isUpdating: false, error: action.payload };
    case UserWordsActionTypes.CHANGE_USER_WORDS_PAGES:
      return {
        ...state,
        pages: state.pages
          .map((page) =>
            page._id === action.payload.page
              ? { ...page, count: action.payload.count }
              : page
          )
          .filter((page) => page.count > 0),
      };
    default:
      return state;
  }
};

export default userWordsReducer;
