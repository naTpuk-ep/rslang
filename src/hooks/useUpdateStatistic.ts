/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import { NO_STATUS } from "../constants/requestParams";
import { GamesNames, IGameStatisticsData } from "../types/statistics-types";
import IUserWordData from "../types/userWords-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useUpdateStatistic = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);
  const { updateStatisticsAction, updateUserWord } = useActions();

  const compareDates = (now: Date, second: Date) => {
    now.setHours(0, 0, 0, 0);
    second.setHours(0, 0, 0, 0);
    const nowUTC = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    );
    const secondUTC = new Date(
      Date.UTC(second.getFullYear(), second.getMonth(), second.getDate())
    );
    return secondUTC < nowUTC;
  };

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

  const updateGameStatistics = (
    gameName: GamesNames,
    statistic: IGameStatisticsData
  ) => {
    const { wrong, correct, streak } = statistic;
    const stat = { ...statistics };
    const gameStat = stat.optional.today[gameName] as IGameStatisticsData;
    let newStreak = streak;
    if (wrong === 0) {
      newStreak = gameStat.streak + newStreak;
    }
    let newGameStat = {
      streak: newStreak,
      wrong: stat.optional.today[gameName].wrong + wrong,
      correct: stat.optional.today[gameName].correct + correct,
    };
    if (compareDates(new Date(), new Date(statistics.optional.today.date))) {
      newGameStat = { streak, wrong, correct };
    }
    stat.optional.today[gameName] = newGameStat;

    updateStatisticsAction(stat);
  };

  return {
    updateGameStatistics,
    updateWordInGame,
    statistics,
  };
};

export default useUpdateStatistic;
