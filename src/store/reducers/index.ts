import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import statisticsReducer from "./statisticsReducer";
import userWordsReducer from "./userWordsReducer";
import wordsReducer from "./wordsReducer";

export const rootReducer = combineReducers({
  words: wordsReducer,
  userWords: userWordsReducer,
  categories: categoriesReducer,
  statistics: statisticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
