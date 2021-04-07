export enum GamesNames {
  Savanna = "savanna",
  Sprint = "sprint",
  AudioCall = "audioCall",
  KnowWords = "knowWords",
}

export interface IStatisticsData {
  learnedWords: number;
  learnedWordsToday: number;
  optional: {
    today: IDayStatistics;
    allTime: IDayStatistics[];
  };
}

interface IStatisticsParams {
  dayLearns: number;
  wrongAnswers: number;
  correctAnswers: number;
}

interface IDayStatistics extends IStatisticsParams {
  date: Date;
  savanna: IGameStatisticsData;
  sprint: IGameStatisticsData;
  audioCall: IGameStatisticsData;
  knowWords: IGameStatisticsData;
}

export interface IGameStatisticsData {
  streak: number;
  wrong: number;
  correct: number;
}

export interface StatisticsState {
  statistics: IStatisticsData;
  isFetching: boolean;
  error: null | string;
}

export enum StatisticsActionTypes {
  GET_STATISTICS = "GET_STATISTICS",
  GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS",
  GET_STATISTICS_ERROR = "GET_STATISTICS_ERROR",
  UPDATE_STATISTICS = "UPDATE_STATISTICS",
  UPDATE_STATISTICS_SUCCESS = "UPDATE_STATISTICS_SUCCESS",
  UPDATE_STATISTICS_ERROR = "UPDATE_STATISTICS_ERROR",
}

interface GetStatisticsAction {
  type: StatisticsActionTypes.GET_STATISTICS;
}

interface GetStatisticsSuccessAction {
  type: StatisticsActionTypes.GET_STATISTICS_SUCCESS;
  payload: IStatisticsData;
}

interface GetStatisticsErrorAction {
  type: StatisticsActionTypes.GET_STATISTICS_ERROR;
  payload: string;
}

interface UpdateStatisticsAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS;
}

interface UpdateStatisticsSuccessAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS_SUCCESS;
  payload: IStatisticsData;
}

interface UpdateStatisticsErrorAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS_ERROR;
  payload: string;
}

export type StatisticsAction =
  | GetStatisticsAction
  | GetStatisticsSuccessAction
  | GetStatisticsErrorAction
  | UpdateStatisticsAction
  | UpdateStatisticsSuccessAction
  | UpdateStatisticsErrorAction;
