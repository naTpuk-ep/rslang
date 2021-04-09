/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import {
  IUserWordOptions,
  UserWordsAction,
  UserWordsActionTypes,
} from "../../types/userWords-types";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxNzUzMjkxNiwiZXhwIjoxNjE3OTkzNzE2fQ.lHjMRJQL7HvgkLeKrJrgeUZOKccfjEuGfgCbqoPAwLk";

const aggregateUserWords = (
  group = 0,
  page = 0,
  filter: string,
  book?: number
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_USER_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/605d826946051229947e4eb3/aggregatedWords`,
        {
          headers: {
            authorization: token,
          },
          params: { group, page, wordsPerPage: 20, filter, book },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS,
        payload: {
          words: response.data[0].paginatedResults,
          totalCount: response.data[0].totalCount[0].count,
        },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов пользователя",
      });
    }
  };
};

const fetchPages = (group = 0) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.GET_USER_WORDS_PAGES });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/605d826946051229947e4eb3/aggregatedWords/group`,
        {
          headers: {
            authorization: token,
          },
          params: { group },
        }
      );
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR,
        payload: "Произошла ошибка при загрузке страниц",
      });
    }
  };
};

const updateUserWord = (
  userId: string,
  wordId: string,
  data: IUserWordOptions
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.UPDATE_USER_WORD });
      const wordResponse = await axios.put(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${userId}/words/${wordId}`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: UserWordsActionTypes.UPDATE_USER_WORD_SUCCESS,
        payload: {
          userWord: {
            isLearn: wordResponse.data.isLearn,
            status: wordResponse.data.status,
            optional: wordResponse.data.optional,
          },
          id: wordId,
        },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.UPDATE_USER_WORD_ERROR,
        payload: "Произошла ошибка при изменение слова",
      });
    }
  };
};

const changeUserWordsPages = (page: number, count: number): UserWordsAction => {
  return {
    type: UserWordsActionTypes.CHANGE_USER_WORDS_PAGES,
    payload: { page, count },
  };
};

export { aggregateUserWords, fetchPages, updateUserWord, changeUserWordsPages };
