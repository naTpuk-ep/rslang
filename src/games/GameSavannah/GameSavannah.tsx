/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { nanoid } from "nanoid";
import "./GameSavannah.scss";
import { GlobalHotKeys } from "react-hotkeys";
import crystal from "../../assets/savannah-crystal.png";
import heart from "../../assets/heart.png";
import emptyHeart from "../../assets/empty-heart.png";
import IGameProps from "../../types/IGameProps";
import IWordData from "../../types/words-types";
import SectionModal from "../../components/SectionModal";

const GameSavannah: React.FunctionComponent<IGameProps> = (
  props: IGameProps
) => {
  const [wordList, setWordList] = useState<IWordData[] | undefined>(
    props.wordList
  );

  const [index, setIndex] = useState(0);
  const [guessWord, setGuessWord] = useState<IWordData | undefined>();
  const [animated, setAnimated] = useState(nanoid());
  const [options, setOptions] = useState<IWordData[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(5);

  useEffect(() => {
    if (wordList) {
      setGuessWord(wordList[0]);
    }
  }, [wordList]);

  useEffect(() => {
    if (wordList) {
      if (isStarted && !isFinished) {
        if (index >= wordList.length) {
          setIsFinished(true);
          return;
        }
        setGuessWord(wordList[index]);
        setAnimated(nanoid());
        const optionWords = [
          ...wordList.slice(0, index),
          ...wordList.slice(index + 1),
        ]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        optionWords.push(wordList[index]);
        optionWords.sort(() => Math.random() - 0.5);
        setOptions(optionWords);
      }
    }
  }, [index, isStarted, isFinished, wordList]);

  useEffect(() => {
    if (attempts === 0) {
      setIsFinished(true);
    }
  }, [attempts]);

  const animationIterationandler = (
    e: React.AnimationEvent<HTMLDivElement>
  ) => {
    if (e.animationName === "moveword") {
      setIndex(index + 1);
      setAttempts(attempts - 1);
    }
  };
  const guessClickHandler = (word: IWordData) => {
    if (word.wordTranslate === guessWord?.wordTranslate) {
      setIndex(index + 1);
    } else {
      setAttempts(attempts - 1);
      setIndex(index + 1);
    }
  };
  const countdownCompleteHandler = () => {
    setIsStarted(true);
  };

  if (!wordList) {
    return <SectionModal setWordList={setWordList} />;
  }

  return (
    <div className="game-container">
      {isFinished ? (
        ""
      ) : (
        <>
          {isStarted ? (
            <>
              {" "}
              <div className="hearts-container">
                {[...Array(attempts)].map(() => {
                  return (
                    <img
                      className="hearts-container--heart"
                      key={nanoid()}
                      src={heart}
                      alt="heart-img"
                    />
                  );
                })}
                {[...Array(5 - attempts)].map(() => {
                  return (
                    <img
                      className="hearts-container--heart"
                      key={nanoid()}
                      src={emptyHeart}
                      alt="heart-img"
                    />
                  );
                })}
              </div>
              <div
                key={animated}
                className="game-container--guess-word animation"
                onAnimationIteration={(e) => {
                  animationIterationandler(e);
                }}
              >
                {guessWord?.word}
              </div>
              <div className="game-container--buttons">
                {options.map((option, id) => {
                  return (
                    <GlobalHotKeys
                      key={nanoid()}
                      keyMap={{
                        GUESS: ["1", "2", "3", "4"],
                      }}
                      handlers={{
                        GUESS: (e) => {
                          guessClickHandler(options[Number(e?.key) - 1]);
                        },
                      }}
                    >
                      <button
                        type="button"
                        className="game-container--buttons-button"
                        onClick={(e) => {
                          guessClickHandler(option);
                          e.currentTarget.blur();
                        }}
                      >
                        {`${id + 1} ${option.wordTranslate}`}
                      </button>
                    </GlobalHotKeys>
                  );
                })}
              </div>
              <img className="crystal" src={crystal} alt="crystal-img" />
            </>
          ) : (
            <Countdown
              date={Date.now() + 5000}
              onComplete={countdownCompleteHandler}
              renderer={({ seconds }) => (
                <div className="timer">
                  <div className="timer--time">{seconds}</div>
                  <div className="timer-animate" />
                </div>
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

GameSavannah.defaultProps = undefined;

export default GameSavannah;
