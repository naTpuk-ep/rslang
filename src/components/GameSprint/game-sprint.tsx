import React, { useEffect, useState } from "react";

import GameField from "./GameField";
import Score from "./Score";
import Time from "./Time";

import "./game-sprint.scss";

// eslint-disable-next-line
const GameSprint = ({ data }: any) => {
  // eslint-disable-next-line
  const [isPlay, setIsPlay] = useState(true);
  const [score, setScore] = useState(0);
  const [levelBonus, setLevelBonus] = useState(1);
  const [currentChain, setCurrentChain] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [currentTranslate, setCurrentTranslate] = useState("");

  useEffect(() => {
    if (data !== null) {
      setCurrentWord(data[currentIndex].word);
      const random = Math.floor(Math.random() * 2);
      const generateRandom = (min: number, max: number): number => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num === currentIndex ? generateRandom(0, data.length - 1) : num;
      };
      if (random === 0) {
        setCurrentTranslate(data[currentIndex].wordTranslate);
      } else {
        setCurrentTranslate(
          data[generateRandom(0, data.length - 1)].wordTranslate
        );
      }
    }
  }, [data, currentIndex]);

  const finishGame = () => {
    setIsPlay(false);
    // console.log("GAME OVER!");
  };

  // eslint-disable-next-line
  const answerClick = (e: any) => {
    let level = levelBonus;
    let chain = currentChain;
    let newScore = score;
    if (
      (e.target.innerHTML === "Верно" &&
        currentTranslate === data[currentIndex].wordTranslate) ||
      (e.target.innerHTML === "Неверно" &&
        currentTranslate !== data[currentIndex].wordTranslate)
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
    } else {
      level = 1;
      chain = 0;
    }
    setCurrentChain(chain);
    setLevelBonus(level);
    setScore(newScore);
    setCurrentIndex((index) => index + 1);
  };

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

export default GameSprint;
