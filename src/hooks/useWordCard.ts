/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Howl } from "howler";
import { useState } from "react";
import { BACKEND_PATH } from "../constants/request-params";
import IUserWordData from "../types/user-words-types";
import useActions from "./useActions";

const useWordCard = (word: IUserWordData) => {
  const { createUserWord, updateUserWord } = useActions();
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

  const createClickHandler = (status: string, isLearn: boolean) => {
    createUserWord("605d826946051229947e4eb3", word._id, word.page, {
      status,
      isLearn,
    });
  };

  const updateClickHandler = (status: string, isLearn: boolean) => {
    updateUserWord("605d826946051229947e4eb3", word._id, {
      status,
      isLearn,
    });
  };

  return { wordAudio, createClickHandler, updateClickHandler };
};

export default useWordCard;
