/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Dispatch } from "react";
import {
  IStatisticsData,
  StatisticsAction,
  StatisticsActionTypes,
} from "../../types/statistics-types";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxODA0NDA1MSwiZXhwIjoxNjE4NTA0ODUxfQ.vsICxs1HaHcT_A59xj36r9SuBiTEEvZ3ZAYQg3pExG8";

const getStatistics = () => {
  return async (dispatch: Dispatch<StatisticsAction>) => {
    try {
      dispatch({ type: StatisticsActionTypes.GET_STATISTICS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/605d826946051229947e4eb3/statistics`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: StatisticsActionTypes.GET_STATISTICS_SUCCESS,
        payload: {
          learnedWords: response.data.learnedWords,
          optional: response.data.optional,
        },
      });
    } catch (e) {
      dispatch({
        type: StatisticsActionTypes.GET_STATISTICS_ERROR,
        payload: "Произошла ошибка при загрузке статистики",
      });
    }
  };
};

const updateStatisticsAction = (data: IStatisticsData) => {
  return async (dispatch: Dispatch<StatisticsAction>) => {
    try {
      dispatch({ type: StatisticsActionTypes.UPDATE_STATISTICS });
      const response = await axios.put(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/605d826946051229947e4eb3/statistics`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: StatisticsActionTypes.UPDATE_STATISTICS_SUCCESS,
        payload: {
          learnedWords: response.data.learnedWords,
          optional: response.data.optional,
        },
      });
    } catch (e) {
      dispatch({
        type: StatisticsActionTypes.UPDATE_STATISTICS_ERROR,
        payload: "Произошла ошибка при обновлении статистики",
      });
    }
  };
};

export { getStatistics, updateStatisticsAction };
