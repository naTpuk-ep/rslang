/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Howl } from "howler";
import { useState } from "react";
import {
  BACKEND_PATH,
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
} from "../constants/requestParams";
import IUserWordData from "../types/userWords-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useWordCard = (word: IUserWordData) => {
  const { updateUserWord } = useActions();
  const { statistics } = useTypedSelector((state) => state.statistics);
  const [wordAudio] = useState(
    new Howl({
      src: [
        `${BACKEND_PATH}${word.audio}`,
        `${BACKEND_PATH}${word.audioExample}`,
        `${BACKEND_PATH}${word.audioMeaning}`,
      ],
      volume: 0.5,
    })
  );

  const changeHardStatusHandler = () => {
    const isLearn = word.userWord?.isLearn;
    const incrimentStat = {
      ...statistics,
      learnedWords: statistics.learnedWords + 1,
      learnedWordsToday: statistics.learnedWordsToday + 1,
    };
    if (!isLearn) {
      updateUserWord(
        "605d826946051229947e4eb3",
        word._id,
        {
          ...word.userWord,
          status: STATUS_HARD,
          isLearn: true,
        },
        incrimentStat
      );
    } else {
      updateUserWord("605d826946051229947e4eb3", word._id, {
        ...word.userWord,
        status: STATUS_HARD,
        isLearn: true,
      });
    }
  };

  const changeNoStatusHandler = () => {
    const status = word.userWord?.status;
    let isLearn = false;
    if (status === STATUS_HARD) {
      isLearn = true;
    }
    updateUserWord("605d826946051229947e4eb3", word._id, {
      ...word.userWord,
      status: NO_STATUS,
      isLearn,
    });
  };

  const changeDeletedStatusHandler = () => {
    const isLearn = word.userWord?.isLearn;
    if (isLearn) {
      updateUserWord(
        "605d826946051229947e4eb3",
        word._id,
        {
          ...word.userWord,
          optional: {
            ...word.userWord.optional,
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          status: STATUS_DELETED,
          isLearn: false,
        },
        {
          ...statistics,
          learnedWords: statistics.learnedWords - 1,
          learnedWordsToday: statistics.learnedWordsToday - 1,
        }
      );
    } else {
      updateUserWord("605d826946051229947e4eb3", word._id, {
        ...word.userWord,
        status: STATUS_DELETED,
        isLearn: false,
      });
    }
  };

  return {
    wordAudio,
    changeHardStatusHandler,
    changeDeletedStatusHandler,
    changeNoStatusHandler,
  };
};

export default useWordCard;
