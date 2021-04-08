/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import { NO_STATUS } from "../constants/requestParams";
import {
  defaultTodayState,
  GamesNames,
  IGameStatisticsData,
  IStatisticsData,
} from "../types/statistics-types";
import IUserWordData from "../types/userWords-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useUpdateStatistic = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);
  const { updateStatisticsAction, updateUserWord } = useActions();

  const updateWordInGame = (
    word: IUserWordData,
    wrong: number,
    correct: number
  ) => {
    const isLearn = word.userWord?.isLearn;
    const now = moment();
    if (isLearn) {
      const userWord = { ...word.userWord };
      userWord.optional.lastLearn = new Date(now.format("YYYY-MM-DD"));
      userWord.optional.correctAnswers += correct;
      userWord.optional.wrongAnswers += wrong;
      updateUserWord("605d826946051229947e4eb3", word._id, userWord);
      return;
    }
    updateUserWord("605d826946051229947e4eb3", word._id, {
      isLearn: true,
      status: NO_STATUS,
      optional: {
        correctAnswers: correct,
        wrongAnswers: wrong,
        lastLearn: new Date(now.format("YYYY-MM-DD")),
        learned: new Date(now.format("YYYY-MM-DD")),
      },
    });
  };

  const updateStatisticState = (statistic: IStatisticsData) => {
    const now = moment();
    if (
      new Date(now.format("YYYY-MM-DD")) >
      new Date(statistic.optional.today.date)
    ) {
      const today = {
        ...defaultTodayState,
        date: new Date(now.format("YYYY-MM-DD")),
      };
      const previousDay = statistic.optional.today;
      statistic.optional.allTime.push(previousDay);
      statistic.optional.today = today;
    }
    return statistic;
  };

  const updateDayLearnsStatistic = (wrong: number, correct: number) => {
    const stat = updateStatisticState({ ...statistics });
    stat.optional.today.correctAnswers += correct;
    stat.optional.today.wrongAnswers += wrong;
    updateStatisticsAction(stat);
  };

  const updateGameStatistics = (
    gameName: GamesNames,
    gameResult: IGameStatisticsData
  ) => {
    const { wrong, correct, streak } = gameResult;
    const stat = updateStatisticState({ ...statistics });
    const gameStat = stat.optional.today[gameName] as IGameStatisticsData;
    let newStreak = streak;
    if (wrong === 0) {
      newStreak = gameStat.streak + newStreak;
    }
    const newGameStat = {
      streak: newStreak,
      wrong: stat.optional.today[gameName].wrong + wrong,
      correct: stat.optional.today[gameName].correct + correct,
    };
    stat.optional.today[gameName] = newGameStat;

    updateStatisticsAction(stat);
  };

  return {
    updateGameStatistics,
    updateDayLearnsStatistic,
    updateWordInGame,
    statistics,
  };
};

export default useUpdateStatistic;
