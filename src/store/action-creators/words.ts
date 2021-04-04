/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import { WordsAction, WordsActionTypes } from "../../types/words-types";

const fetchWords = (group = 0, page = 0) => {
  return async (dispatch: Dispatch<WordsAction>) => {
    try {
      dispatch({ type: WordsActionTypes.FETCH_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/words`,
        {
          params: { group, page },
        }
      );
      dispatch({
        type: WordsActionTypes.FETCH_WORDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: WordsActionTypes.FETCH_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

const setWordsPage = (page: number): WordsAction => {
  return { type: WordsActionTypes.SET_WORDS_PAGE, payload: page };
};

export { fetchWords, setWordsPage };
