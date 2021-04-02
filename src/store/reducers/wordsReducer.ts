import {
  WordsState,
  WordsAction,
  WordsActionTypes,
} from "../../types/words-types";

const defaultState: WordsState = {
  words: [],
  error: null,
  isFetching: true,
  page: 0,
};

const wordsReducer = (
  state = defaultState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.FETCH_WORDS:
      return { ...state, isFetching: true, error: null, words: [] };
    case WordsActionTypes.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        words: action.payload,
      };
    case WordsActionTypes.FETCH_WORDS_ERROR:
      return { ...state, isFetching: false, error: action.payload, words: [] };
    default:
      return state;
  }
};

export default wordsReducer;
