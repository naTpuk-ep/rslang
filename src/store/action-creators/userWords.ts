/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import {
  UserWordsAction,
  UserWordsActionTypes,
} from "../../types/userWords-types";

const agregateUserWords = (
  group = 0,
  page = 0,
  filter: string,
  book?: number
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_USER_WORDS });
      const response = await axios.get(
        `http://localhost:3000/users/605d826946051229947e4eb3/aggregatedWords`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxNzMzOTU4OCwiZXhwIjoxNjE3MzUzOTg4fQ.1zos23SecIYzwdlEPAzgAS8F5Et-034bFkvvlrXdYUo",
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
        `http://localhost:3000/users/605d826946051229947e4eb3/aggregatedWords/group`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxNzMzOTU4OCwiZXhwIjoxNjE3MzUzOTg4fQ.1zos23SecIYzwdlEPAzgAS8F5Et-034bFkvvlrXdYUo",
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

const createUserWord = (
  userId: string,
  wordId: string,
  page: number,
  data: { status: string; isLearn: boolean }
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.CREATE_USER_WORD });
      const response = await axios.post(
        `http://localhost:3000/users/${userId}/words/${wordId}`,
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxNzMzOTU4OCwiZXhwIjoxNjE3MzUzOTg4fQ.1zos23SecIYzwdlEPAzgAS8F5Et-034bFkvvlrXdYUo",
          },
        }
      );
      dispatch({
        type: UserWordsActionTypes.CREATE_USER_WORD_SUCCESS,
        payload: { userWord: response.data, id: wordId, page },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.CREATE_USER_WORD_ERROR,
        payload: "Произошла ошибка при добавлении слова",
      });
    }
  };
};

const setUserWordsPage = (page: number): UserWordsAction => {
  return { type: UserWordsActionTypes.SET_USER_WORDS_PAGE, payload: page };
};

export { agregateUserWords, fetchPages, setUserWordsPage, createUserWord };
