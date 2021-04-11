/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import {
  UserWordsAction,
  UserWordsActionTypes,
} from "../../types/user-words-types";

const fetchWords = (group = 0, page = 0) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_USER_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/words`,
        {
          params: { group, page },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS,
        payload: {
          words: response.data,
          totalCount: response.data.length,
        },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

// eslint-disable-next-line import/prefer-default-export
export { fetchWords };
