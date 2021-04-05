/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/destructuring-assignment */
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import GameField from "./GameField";
import Score from "./Score";
import Time from "./Time";

import "./game-sprint.scss";
import IWordData from "../../types/words-types";
import IGameProps from "../../types/IGameProps";
import SectionModal from "../../components/SectionModal";
import FinishGameModal from "../../components/FinishGameModal/FinishGameModal";

// eslint-disable-next-line
const GameSprint: FC<IGameProps> = (props: IGameProps) => {
  // eslint-disable-next-line
  const [wordList, setWordList] = useState<IWordData[] | undefined>(
    props.wordList
  );
  const [isPlay, setIsPlay] = useState(true);
  const [score, setScore] = useState(0);
  const [levelBonus, setLevelBonus] = useState(1);
  const [currentChain, setCurrentChain] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [currentTranslate, setCurrentTranslate] = useState("");

  const totalWordCount = useRef(0);
  const numberOfCorrectAnswers = useRef(0);
  const series = useRef(0);
  const longestSeries = useRef(0);
  const correctWords = useRef<IWordData[]>([]);
  const mistakes = useRef<IWordData[]>([]);

  useEffect(() => {
    if (wordList !== undefined) {
      setCurrentWord(wordList[currentIndex]?.word);
      const random = Math.floor(Math.random() * 2);
      const generateRandom = (min: number, max: number): number => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num === currentIndex
          ? generateRandom(0, wordList.length - 1)
          : num;
      };
      if (random === 0) {
        setCurrentTranslate(wordList[currentIndex]?.wordTranslate);
      } else {
        setCurrentTranslate(
          wordList[generateRandom(0, wordList.length - 1)]?.wordTranslate
        );
      }
    }
  }, [wordList, currentIndex]);

  const finishGame = useCallback(() => {
    setIsPlay(false);
  }, []);

  const answerClick = useCallback(
    // eslint-disable-next-line
    (e: any) => {
      let level = levelBonus;
      let chain = currentChain;
      let newScore = score;
      if (
        (e.target.innerHTML === "Верно" &&
          currentTranslate === wordList![currentIndex].wordTranslate) ||
        (e.target.innerHTML === "Неверно" &&
          currentTranslate !== wordList![currentIndex].wordTranslate)
      ) {
        if (levelBonus === 4) {
          chain = 0;
        } else if (currentChain === 3) {
          level += 1;
          chain = 0;
        } else {
          chain += 1;
        }
        newScore = score + 2 ** (levelBonus - 1) * 10;
        numberOfCorrectAnswers.current += 1;
        correctWords.current.push(wordList![currentIndex]);
        series.current += 1;
        if (longestSeries.current < series.current) {
          longestSeries.current = series.current;
        }
      } else {
        level = 1;
        chain = 0;
        series.current = 0;
        mistakes.current.push(wordList![currentIndex]);
      }
      totalWordCount.current += 1;
      setCurrentChain(chain);
      setLevelBonus(level);
      setScore(newScore);
      setCurrentIndex((index) => index + 1);
    },
    [currentChain, currentIndex, currentTranslate, levelBonus, score, wordList]
  );

  if (!wordList) {
    return <SectionModal setWordList={setWordList} />;
  }

  if (!isPlay || !currentWord) {
    return (
      <FinishGameModal
        totalWordCount={totalWordCount.current}
        numberOfCorrectAnswers={numberOfCorrectAnswers.current}
        longestSeries={longestSeries.current}
        correctWords={correctWords.current}
        mistakes={mistakes.current}
      />
    );
  }

  return (
    <div className="game-sprint">
      <div className="game-sprint-panel">
        <Score score={score} />
        <Time finishGame={finishGame} />
      </div>
      <GameField
        currentWord={currentWord}
        currentTranslate={currentTranslate}
        onAnswerClick={
          // eslint-disable-next-line
          (e: any) => answerClick(e)
        }
        levelBonus={levelBonus}
        currentChain={currentChain}
      />
    </div>
  );
};

GameSprint.defaultProps = undefined;

export default GameSprint;
