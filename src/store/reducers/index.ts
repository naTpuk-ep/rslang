import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import wordsReducer from "./wordsReducer";

export const rootReducer = combineReducers({
  words: wordsReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
