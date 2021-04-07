import { combineReducers } from "redux";
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
});

export type RootState = ReturnType<typeof rootReducer>;
