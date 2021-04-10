import React, { useState, useEffect } from "react";
import AudioBlock from "./AudioBlock";
import AnswerBlock from "./AnswerBlock";

import "./audio-call.scss";

// eslint-disable-next-line
const AudioCallComponent: React.FunctionComponent<any> = ({ data }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsTranslations, setWordsTranslations] = useState([""]);
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [wordTranslate, setWordTranslate] = useState("");
  const [word, setWord] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    let imageStr = "";
    let audioStr = "";
    let wordTranslateStr = "";
    let wordStr = "";
    if (data) {
      imageStr = data[currentIndex].image;
      audioStr = data[currentIndex].audio;
      wordTranslateStr = data[currentIndex].wordTranslate;
      wordStr = data[currentIndex].word;
    }
    setImage(imageStr);
    setAudio(audioStr);
    setWordTranslate(wordTranslateStr);
    setWord(wordStr);
    const generateRandom = (min: number, max: number): number => {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    };
    const arrayTranslations: string[] = [];
    if (data) {
      for (let i = 0; i < 4; i += 1) {
        const wordIndex =
          data[generateRandom(0, data.length - 1)].wordTranslate;
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
  }, [data, currentIndex, wordTranslate]);

  const finishGame = () => {
    setIsFinish(true);
    // console.log("Finish Game");
  };

  const nextWord = () => {
    setIsAnswer(false);
    setCurrentIndex((ind) => ind + 1);
    if (currentIndex === 10) {
      finishGame();
    }
  };

  const changeAnswerBlock = (status: boolean) => {
    if (status) {
      // console.log("Верно");
    } else {
      // console.log("Неверно");
    }
    setIsAnswer(true);
  };

  // eslint-disable-next-line
  const fullScreen = (e: any): void => {
    if (!document.fullscreenElement) {
      if (e.currentTarget === e.target) {
        e.nativeEvent.path[1].requestFullscreen();
      } else {
        e.nativeEvent.path[2].requestFullscreen();
      }
    }
  };

  return (
    <div className="audio-call">
      <button
        type="button"
        className="fullscreen-btn"
        onClick={(e) => {
          fullScreen(e);
        }}
      >
        <span className="fullscreen-btn-span">⇲</span>
      </button>
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

export default AudioCallComponent;
