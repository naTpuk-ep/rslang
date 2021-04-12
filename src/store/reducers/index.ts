import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";
import statisticsReducer from "./statisticsReducer";
import unitStatisticsReducer from "./unitStatisticsReducer";
import userWordsReducer from "./userWordsReducer";
import wordsReducer from "./wordsReducer";

export const rootReducer = combineReducers({
  words: wordsReducer,
  userWords: userWordsReducer,
  categories: categoriesReducer,
  statistics: statisticsReducer,
  unitStatistics: unitStatisticsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
