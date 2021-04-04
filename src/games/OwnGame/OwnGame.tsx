/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import { Typography } from "@material-ui/core";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FinishGameModal from "../../components/FinishGameModal/FinishGameModal";
import SectionModal from "../../components/SectionModal";
import IWordData from "../../types/words-types";
import Game from "./Game";
import "./OwnGame.scss";

interface IGameProps {
  wordList?: IWordData[];
}

const OwnGame: FC<IGameProps> = (props: IGameProps) => {
  const [wordList, setWordList] = useState<IWordData[] | undefined>(
    props.wordList
  );
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<IWordData | undefined>(); // "any" will be the word interface
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState<number | undefined>();
  const numberOfSeconds = useMemo(() => 90, []);
  const [isFinish, setIsFinish] = useState(false);
  const totalWordCount = useRef(0);
  const numberOfCorrectAnswers = useRef(0);
  const correctAnswersPercent = useRef(0);
  const series = useRef(0);
  const longestSeries = useRef(0);

  const setNext = useCallback(() => {
    setCurrentWord(game?.nextWord());
    totalWordCount.current += 1;
    setInputValue("");
  }, [game]);

  useEffect(() => {
    if (wordList) {
      setGame(new Game(wordList));
      setTimer(numberOfSeconds);
    }
  }, [numberOfSeconds, wordList]);

  useEffect(() => {
    if (game) {
      setNext();
    }
  }, [game, setNext]);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (timer) {
      timeOut = setTimeout(() => {
        if (timer === 1) {
          setIsFinish(true);
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [timer]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
      if (game?.isCorrect(value)) {
        numberOfCorrectAnswers.current += 1;
        series.current += 1;
        if (longestSeries.current < series.current) {
          longestSeries.current = series.current;
        }
        setNext();
      }
    },
    [game, setNext]
  );

  const skipHandler = useCallback(() => {
    if (longestSeries.current < series.current) {
      longestSeries.current = series.current;
    }
    series.current = 0;
    setNext();
  }, [setNext]);

  const separateText = useMemo(
    () => currentWord?.textMeaning.split(/<i>.*<\/i>/),
    [currentWord]
  );

  if (!wordList) {
    return <SectionModal setWordList={setWordList} />;
  }

  if (isFinish) {
    return (
      <FinishGameModal
        totalWordCount={totalWordCount.current}
        numberOfCorrectAnswers={numberOfCorrectAnswers.current}
        longestSeries={longestSeries.current}
      />
    );
  }

  return (
    <div className="own-game">
      <h2>{timer}</h2>
      <h3>
        {separateText?.[0]}{" "}
        <input
          className={
            !inputValue
              ? ""
              : game?.startsWith(inputValue)
              ? "correct"
              : "wrong"
          }
          type="text"
          onChange={changeHandler}
          value={inputValue}
          placeholder={`Starts with ${currentWord?.word[0].toUpperCase()}`}
        />
        {separateText?.[1]}
      </h3>
      <button type="button" onClick={skipHandler}>
        skip
      </button>
      <div className="modal-content">
        <Typography variant="h4">{`Total word count: ${totalWordCount.current}`}</Typography>
        <Typography variant="h5">{`Number of words learned: ${numberOfCorrectAnswers.current}`}</Typography>
        <Typography variant="h5">{`Correct answers: ${correctAnswersPercent.current} %`}</Typography>
        <Typography variant="h5">{`Longest series: ${longestSeries.current}`}</Typography>
        <Typography variant="h5">{`series: ${series.current}`}</Typography>
      </div>
    </div>
  );
};

OwnGame.defaultProps = undefined;

export default OwnGame;
