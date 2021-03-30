import { PayloadAction } from "@reduxjs/toolkit";
import IWordData from "../../../models/word-model";

const SET_REPOS = "SET_WORDS";

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
    case SET_REPOS:
      return {
        ...state,
        words: action.payload,
      };
    default:
      return state;
  }
};

const setRepos = (repos: any) => ({ type: SET_REPOS, payload: repos });

export { wordsReducer, setRepos };
