import {
  IStatisticsData,
  StatisticsAction,
  StatisticsActionTypes,
  StatisticsState,
} from "../../types/statistics-types";

const defaultState: StatisticsState = {
  statistics: {} as IStatisticsData,
  isFetching: true,
  error: null,
};

const statisticsReducer = (
  state = defaultState,
  action: StatisticsAction
): StatisticsState => {
  switch (action.type) {
    case StatisticsActionTypes.GET_STATISTICS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case StatisticsActionTypes.GET_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        statistics: action.payload,
      };
    case StatisticsActionTypes.GET_STATISTICS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        statistics: action.payload,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default statisticsReducer;
