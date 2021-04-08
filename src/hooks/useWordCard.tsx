/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Howl } from "howler";
import moment from "moment";
import { useState } from "react";
import {
  BACKEND_PATH,
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
} from "../constants/requestParams";
import IUserWordData from "../types/userWords-types";
import useActions from "./useActions";

const useWordCard = (word: IUserWordData) => {
  const { updateUserWord } = useActions();
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
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    if (!isLearn) {
      updateUserWord("605d826946051229947e4eb3", word._id, {
        status: STATUS_HARD,
        isLearn: true,
        optional: {
          lastLearn: new Date(yesterday.format("YYYY-MM-DD")),
          learned: new Date(now.format("YYYY-MM-DD")),
          wrongAnswers: 0,
          correctAnswers: 0,
        },
      });
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
    const now = moment();
    if (isLearn) {
      updateUserWord("605d826946051229947e4eb3", word._id, {
        ...word.userWord,
        optional: {
          learned: new Date(now.format("YYYY-MM-DD")),
          lastLearn: new Date(now.format("YYYY-MM-DD")),
          correctAnswers: 0,
          wrongAnswers: 0,
        },
        status: STATUS_DELETED,
        isLearn: false,
      });
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
