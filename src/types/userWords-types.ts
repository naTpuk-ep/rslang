import IWordData from "./words-types";

interface IUserWordOptions {
  status: string;
  isLearn: boolean;
}

interface PagesData {
  _id: number;
  count: number;
}

interface IUserWordData extends IWordData {
  userWord: IUserWordOptions;
}

interface AggregatedWordsData {
  words: IUserWordData[];
  totalCount: number;
}

export interface UserWordsState {
  aggregatedWords: AggregatedWordsData;
  page: number;
  pages: PagesData[];
  isFetching: boolean;
  isPagesFetching: boolean;
  isUpdating: boolean;
  error: null | string;
  createError: null | string;
}

export enum UserWordsActionTypes {
  FETCH_USER_WORDS = "FETCH_USER_WORDS",
  FETCH_USER_WORDS_SUCCESS = "FETCH_USER_WORDS_SUCCESS",
  FETCH_USER_WORDS_ERROR = "FETCH_USER_WORDS_ERROR",
  SET_USER_WORDS_PAGE = "SET_USER_WORDS_PAGE",
  UPDATE_USER_WORDS = "UPDATE_USER_WORDS",
  UPDATE_USER_WORDS_SUCCESS = "UPDATE_USER_WORDS_SUCCESS",
  UPDATE_USER_WORDS_ERROR = "UPDATE_USER_WORDS_ERROR",
  CREATE_USER_WORD = "CREATE_USER_WORD",
  CREATE_USER_WORD_SUCCESS = "CREATE_USER_WORD_SUCCESS ",
  CREATE_USER_WORD_ERROR = "CREATE_USER_WORD_ERROR",
  GET_USER_WORDS_PAGES = "GET_USER_WORDS_PAGES",
  GET_USER_WORDS_PAGES_SUCCESS = "GET_USER_WORDS_PAGES_SUCCESS",
  GET_USER_WORDS_PAGES_ERROR = "GET_USER_WORDS_PAGES_ERROR",
}

interface FetchUserWordsAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS;
}

interface FetchUserWordsSuccessAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS;
  payload: AggregatedWordsData;
}

interface FetchUserWordsErrorAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR;
  payload: string;
}

interface SeUserWordsPage {
  type: UserWordsActionTypes.SET_USER_WORDS_PAGE;
  payload: number;
}

interface UpdateUserWords {
  type: UserWordsActionTypes.SET_USER_WORDS_PAGE;
  payload: number;
}

interface CreateUserWordAction {
  type: UserWordsActionTypes.CREATE_USER_WORD;
}

interface CreateUserWordSuccessAction {
  type: UserWordsActionTypes.CREATE_USER_WORD_SUCCESS;
  payload: { id: string; userWord: IUserWordOptions; page: number };
}

interface CreateUserWordErrorAction {
  type: UserWordsActionTypes.CREATE_USER_WORD_ERROR;
  payload: string;
}

interface GetUserWordsPagesAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES;
}

interface GetUserWordsPagesSuccessAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS;
  payload: PagesData[];
}

interface GetUserWordsPagesErrorAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR;
  payload: string;
}

export type UserWordsAction =
  | FetchUserWordsAction
  | FetchUserWordsSuccessAction
  | FetchUserWordsErrorAction
  | SeUserWordsPage
  | CreateUserWordAction
  | CreateUserWordSuccessAction
  | CreateUserWordErrorAction
  | GetUserWordsPagesAction
  | GetUserWordsPagesSuccessAction
  | GetUserWordsPagesErrorAction;

export default IUserWordData;
