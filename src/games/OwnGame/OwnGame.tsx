/* eslint-disable no-nested-ternary */
import axios from "axios";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import IWordData from "../../types/words-types";
import Game from "./Game";
import "./OwnGame.scss";

const OwnGame: FC = () => {
  const url = "https://rnovikov-rs-lang-back.herokuapp.com";
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<IWordData | undefined>(); // "any" will be the word interface
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState<number | undefined>();
  const numberOfSeconds = useMemo(() => 90, []);
  const [isFinish, setIsFinish] = useState(false);

  const getWordsList = useCallback(async () => {
    const { data } = await axios.get(`${url}/words/group/1`);
    setGame(new Game(data));
  }, []);

  const setNext = useCallback(() => {
    setCurrentWord(game?.nextWord());
    setInputValue("");
  }, [game]);

  useEffect(() => {
    getWordsList();
  }, [getWordsList]);

  useEffect(() => {
    if (game) {
      setNext();
      setTimer(numberOfSeconds);
    }
  }, [game, numberOfSeconds, setNext]);

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
        setNext();
      }
    },
    [game, setNext]
  );

  const separateText = useMemo(
    () => currentWord?.textMeaning.split(/<i>.*<\/i>/),
    [currentWord]
  );

  return isFinish ? (
    <h3>FINISH</h3>
  ) : currentWord ? (
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
          placeholder={currentWord.word[0].toUpperCase()}
        />
        {separateText?.[1]}
      </h3>
      <button type="button" onClick={() => setNext()}>
        skip
      </button>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};
export default OwnGame;
