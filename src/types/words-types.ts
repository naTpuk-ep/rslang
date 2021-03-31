interface IWordData {
  group: string;
  page: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  id: string;
}

export interface WordsState {
  words: IWordData[];
  isFetching: boolean;
  error: null | string;
}

export enum WordsActionTypes {
  FETCH_WORDS = "FETCH_WORDS",
  FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS",
  FETCH_WORDS_ERROR = "FETCH_WORDS_ERROR",
}
interface FetchWordsAction {
  type: WordsActionTypes.FETCH_WORDS;
}
interface FetchWordsSuccessAction {
  type: WordsActionTypes.FETCH_WORDS_SUCCESS;
  payload: IWordData[];
}
interface FetchWordsErrorAction {
  type: WordsActionTypes.FETCH_WORDS_ERROR;
  payload: string;
}
export type WordsAction =
  | FetchWordsAction
  | FetchWordsSuccessAction
  | FetchWordsErrorAction;

export default IWordData;
