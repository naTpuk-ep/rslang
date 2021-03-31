import {
  WordsAction,
  WordsActionTypes,
  WordsState,
} from "../../types/words-types";

const defaultState: WordsState = {
  words: [],
  error: null,
  isFetching: true,
};

const wordsReducer = (
  state = defaultState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.FETCH_WORDS:
      return { isFetching: true, error: null, words: [] };
    case WordsActionTypes.FETCH_WORDS_SUCCESS:
      return { isFetching: false, error: null, words: action.payload };
    case WordsActionTypes.FETCH_WORDS_ERROR:
      return { isFetching: false, error: action.payload, words: [] };
    default:
      return state;
  }
};

export default wordsReducer;
