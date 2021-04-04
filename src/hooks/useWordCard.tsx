/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Howl } from "howler";
import { useState } from "react";
import { BACKEND_PATH } from "../constants/requestParams";
import IUserWordData from "../types/userWords-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useWordCard = (word: IUserWordData) => {
  const { updateStatistics, updateUserWord } = useActions();
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

  const updateClickHandler = (status: string, isLearn: boolean) => {
    updateUserWord("605d826946051229947e4eb3", word._id, {
      status,
      isLearn,
    });
    if (isLearn) {
      updateStatistics({
        ...statistics,
        learnedWords: statistics.learnedWords + 1,
      });
    }
  };

  return { wordAudio, updateClickHandler, updateStatistics };
};

export default useWordCard;
