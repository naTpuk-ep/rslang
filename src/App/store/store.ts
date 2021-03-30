import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import categoriesReducer from "./reducers/categoriesReducer";
import { wordsReducer } from "./reducers/wordsReducer";

const rootReducer = combineReducers({
  words: wordsReducer,
  categories: categoriesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
