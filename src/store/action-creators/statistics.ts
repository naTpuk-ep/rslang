/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Dispatch } from "react";
import {
  IStatisticsData,
  StatisticsAction,
  StatisticsActionTypes,
} from "../../types/statistics-types";
import { unauthorizedHandler } from "./auth";

const getStatistics = (id: string, token: string) => {
  return async (dispatch: Dispatch<StatisticsAction>) => {
    try {
      dispatch({ type: StatisticsActionTypes.GET_STATISTICS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/statistics`,
        {
          headers: {
            authorization: `Bearer ${token}`,
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
      unauthorizedHandler(e);
      dispatch({
        type: StatisticsActionTypes.GET_STATISTICS_ERROR,
        payload: "Произошла ошибка при загрузке статистики",
      });
    }
  };
};

const updateStatisticsAction = (
  data: IStatisticsData,
  id: string,
  token: string
) => {
  return async (dispatch: Dispatch<StatisticsAction>) => {
    try {
      dispatch({ type: StatisticsActionTypes.UPDATE_STATISTICS });
      const response = await axios.put(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/statistics`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
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
      unauthorizedHandler(e);
      dispatch({
        type: StatisticsActionTypes.UPDATE_STATISTICS_ERROR,
        payload: "Произошла ошибка при обновлении статистики",
      });
    }
  };
};

export { getStatistics, updateStatisticsAction };
