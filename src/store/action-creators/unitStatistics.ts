/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { Dispatch } from "react";
import {
  UnitStatisticsAction,
  UnitStatisticsActionTypes,
} from "../../types/unitStatistics-types";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ4MjY5NDYwNTEyMjk5NDdlNGViMyIsImlhdCI6MTYxNzUzMjkxNiwiZXhwIjoxNjE3OTkzNzE2fQ.lHjMRJQL7HvgkLeKrJrgeUZOKccfjEuGfgCbqoPAwLk";

const getUnitStatisticsAction = (group = 0, filter?: string) => {
  return async (dispatch: Dispatch<UnitStatisticsAction>) => {
    try {
      dispatch({ type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/605d826946051229947e4eb3/aggregatedWords/stat`,
        {
          headers: {
            authorization: token,
          },
          params: { group, filter },
        }
      );
      dispatch({
        type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_SUCCESS,
        payload: {
          group,
          count: response?.data[0]?.count || 0,
          wrongAnswers: response?.data[0]?.wrongAnswers || 0,
          correctAnswers: response?.data[0]?.correctAnswers || 0,
        },
      });
    } catch (e) {
      dispatch({
        type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_ERROR,
        payload: "Произошла ошибка при загрузке статистики раздела",
      });
    }
  };
};

export { getUnitStatisticsAction };
