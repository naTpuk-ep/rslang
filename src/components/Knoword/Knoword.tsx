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
import Game from "../../Game";
import "./Knoword.scss";

const Knoword: FC = () => {
  const url = "https://rnovikov-rs-lang-back.herokuapp.com";
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<any | undefined>(); // "any" will be the word interface
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState<number | undefined>();
  const numberOfSeconds = useMemo(() => 15, []);

  const getWordsList = useCallback(async () => {
    const { data } = await axios.get(`${url}/words/group/1?count=20`);
    setGame(new Game(data));
  }, []);

  const setNext = useCallback(() => {
    setCurrentWord(game?.nextWord());
    setInputValue("");
    setTimer(numberOfSeconds);
  }, [game, numberOfSeconds]);

  useEffect(() => {
    getWordsList();
  }, [getWordsList]);

  useEffect(() => {
    setNext();
  }, [setNext]);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (timer) {
      timeOut = setTimeout(() => {
        if (timer === 1) {
          setNext();
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [timer, setNext]);

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

  return currentWord ? (
    <div className="knoword">
      <h2>{timer}</h2>
      <h3>
        {separateText[0]}{" "}
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
        />
        {separateText[1]}
      </h3>
      <button type="button" onClick={() => setNext()}>
        next
      </button>
    </div>
  ) : game?.isFinish ? (
    <h3>FINISH</h3>
  ) : (
    <h3>Loading...</h3>
  );
};
export default Knoword;
