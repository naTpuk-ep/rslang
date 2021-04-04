import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import userWordsReducer from "./userWordsReducer";
import wordsReducer from "./wordsReducer";

export const rootReducer = combineReducers({
  words: wordsReducer,
  userWords: userWordsReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
