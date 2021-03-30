import { PayloadAction } from "@reduxjs/toolkit";
import IWordData from "../../../models/word-model";

const SET_WORDS = "SET_WORDS";

interface WordsState {
  words: IWordData[];
  isFetching: boolean;
}

const defaultState: WordsState = {
  words: [],
  isFetching: true,
};

const wordsReducer = (
  state = defaultState,
  action: PayloadAction<IWordData[]>
): WordsState => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    default:
      return state;
  }
};

const setWords = (
  words: IWordData[]
): {
  type: string;
  payload: IWordData[];
} => ({ type: SET_WORDS, payload: words });

export { wordsReducer, setWords };
