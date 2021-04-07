/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
    const stat = { ...statistics };
    const dateNow = new Date();
    if (isLearn) {
      const optional = word.userWord?.optional || {
        lastLearn: new Date(),
        wrongAnswers: 0,
        correctAnswers: 0,
      };
      optional.correctAnswers += correct;
      optional.wrongAnswers += wrong;
      const today = {
        dayLearns: 1,
        correctAnswers: correct,
        wrongAnswers: wrong,
      };
      if (!compareDates(dateNow, new Date(statistics.optional.today.date))) {
        today.dayLearns = stat.optional.today.dayLearns + 1;
        today.correctAnswers = stat.optional.today.correctAnswers + correct;
        today.wrongAnswers = stat.optional.today.wrongAnswers + wrong;
      }
      if (compareDates(dateNow, new Date(optional.lastLearn))) {
        stat.optional.today.dayLearns = today.dayLearns;
        stat.optional.today.correctAnswers = today.correctAnswers;
        stat.optional.today.wrongAnswers = today.wrongAnswers;
      } else {
        stat.optional.today.correctAnswers = today.correctAnswers;
        stat.optional.today.wrongAnswers = today.wrongAnswers;
      }
      updateUserWord(
        "605d826946051229947e4eb3",
        word._id,
        {
          ...word.userWord,
          optional,
        },
        stat
      );
    } else {
      const userWord = {
        status: NO_STATUS,
        isLearn: true,
        optional: {
          lastLearn: new Date(),
          wrongAnswers: wrong,
          correctAnswers: correct,
        },
      };
      stat.learnedWords += 1;
      stat.learnedWordsToday += 1;
      if (compareDates(dateNow, new Date(statistics.optional.today.date))) {
        stat.optional.today.dayLearns = 1;
        stat.optional.today.correctAnswers = correct;
        stat.optional.today.wrongAnswers = wrong;
      } else {
        stat.optional.today.dayLearns += 1;
        stat.optional.today.correctAnswers += correct;
        stat.optional.today.wrongAnswers += wrong;
      }
      updateUserWord("605d826946051229947e4eb3", word._id, userWord, stat);
    }
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
