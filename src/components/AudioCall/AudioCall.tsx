import React, { useState, useEffect } from "react";
import AudioBlock from "./AudioBlock";
import AnswerBlock from "./AnswerBlock";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import IUserWordData from "../../types/user-words-types";

import "./AudioCall.scss";

interface IAudioCallParams {
  words: IUserWordData[];
}

const correctWordsArray: IUserWordData[] = [];
const wrongWordsArray: IUserWordData[] = [];
let currentChainLength = 0;
let maxChainLength = 0;

// eslint-disable-next-line
const AudioCall: React.FunctionComponent<IAudioCallParams> = ({
  words,
}: IAudioCallParams) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsTranslations, setWordsTranslations] = useState([""]);
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState(words[currentIndex].audio);
  const [wordTranslate, setWordTranslate] = useState("");
  const [word, setWord] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  // const [isFinish, setIsFinish] = useState(false);
  const { updateWordInGame /* updateGameStatistics */ } = useUpdateStatistic();

  useEffect(() => {
    let imageStr = "";
    let wordTranslateStr = "";
    let wordStr = "";
    if (words) {
      imageStr = words[currentIndex].image;
      wordTranslateStr = words[currentIndex].wordTranslate;
      wordStr = words[currentIndex].word;
    }
    setImage(imageStr);
    setAudio(words[currentIndex].audio);
    setWordTranslate(wordTranslateStr);
    setWord(wordStr);
    const generateRandom = (min: number, max: number): number => {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    };
    const arrayTranslations: string[] = [];
    if (words) {
      for (let i = 0; i < 4; i += 1) {
        const wordIndex =
          words[generateRandom(0, words.length - 1)].wordTranslate;
        if (
          arrayTranslations.indexOf(wordIndex) === -1 &&
          wordIndex !== wordTranslate
        ) {
          arrayTranslations.push(wordIndex);
        } else {
          i -= 1;
        }
      }
    }
    arrayTranslations.push(wordTranslate);
    arrayTranslations.sort(() => Math.random() - 0.5);
    setWordsTranslations(arrayTranslations);
  }, [words, currentIndex, wordTranslate]);

  const finishGame = () => {
    // setIsFinish(true);
    // Окончание игры вызов модалки maxChainLength - цепочка максимальная,
    // correctWordsArray - верные слова, wrongWordsArray - неверные слова
    /* console.log("Finish Game");
    if(isFinish) {
      // end game
    }
    updateGameStatistics(GameNames.AudioCall, {
      streak: 5,
      wrong: 5,
      correct: 5,
    });
    console.log(maxChainLength);
    console.log(correctWordsArray);
    console.log(wrongWordsArray); */
  };

  const nextWord = () => {
    setIsAnswer(false);
    setCurrentIndex((ind) => ind + 1);
    if (currentIndex === 9) {
      finishGame();
    }
  };

  const changeAnswerBlock = (status: boolean) => {
    if (status) {
      correctWordsArray.push(words[currentIndex]);
      updateWordInGame(words[currentIndex], 1, 0);
      currentChainLength += 1;
      if (currentChainLength > maxChainLength) {
        maxChainLength = currentChainLength;
      }
    } else {
      wrongWordsArray.push(words[currentIndex]);
      updateWordInGame(words[currentIndex], 1, 0);
      currentChainLength = 0;
    }
    setIsAnswer(true);
  };

  return (
    <div className="audio-call">
      <AudioBlock audio={audio} image={image} word={word} isAnswer={isAnswer} />
      <AnswerBlock
        wordsTranslations={wordsTranslations}
        wordTranslate={wordTranslate}
        changeAnswerBlock={(status: boolean) => changeAnswerBlock(status)}
        onNextWord={() => nextWord()}
        isAnswer={isAnswer}
      />
    </div>
  );
};

export default AudioCall;
