import {
  StatisticsAction,
  StatisticsActionTypes,
  StatisticsState,
} from "../../types/statistics-types";

const defaultStatisticsParams = {
  dayLearns: 0,
  wrongAnswers: 0,
  correctAnswers: 0,
};

const defaultGameStatistics = {
  streak: 0,
  wrong: 0,
  correct: 0,
};

const defaultState: StatisticsState = {
  statistics: {
    learnedWords: 0,
    learnedWordsToday: 0,
    optional: {
      today: {
        date: new Date(),
        ...defaultStatisticsParams,
        savanna: defaultGameStatistics,
        sprint: defaultGameStatistics,
        audioCall: defaultGameStatistics,
        knowWords: defaultGameStatistics,
      },
      allTime: [],
    },
  },
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
