/* eslint-disable no-nested-ternary */
import axios from "axios";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Game from "../../Game";
import "./Knoword.scss";

const Knoword: FC = () => {
  const url = "https://rnovikov-rs-lang-back.herokuapp.com";
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<any | undefined>(); // "any" will be the word interface
  const [inputValue, setInputValue] = useState("");
  const isCorrect = useRef(false);
  const summarize = useCallback(
    (string: string) => string.trim().toLowerCase(),
    []
  );
  console.log(currentWord.word);

  useEffect(() => {
    if (game) {
      setCurrentWord(game.nextWord());
    }
  }, [game]);

  useEffect(() => {
    const getWordsList = async () => {
      const { data } = await axios.get(`${url}/words/group/1`);
      setGame(new Game(data));
    };
    getWordsList();
  }, []);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
      isCorrect.current = summarize(currentWord.word).startsWith(
        summarize(value)
      );
      if (summarize(value) === summarize(currentWord.word)) {
        setCurrentWord(game?.nextWord());
        setInputValue("");
      }
    },
    [currentWord, game, summarize]
  );

  const separateText = useMemo(
    () => currentWord?.textMeaning.split(/<i>.*<\/i>/),
    [currentWord]
  );

  return currentWord ? (
    <div className="knoword">
      <h3>
        {separateText[0]}{" "}
        <input
          className={!inputValue ? "" : isCorrect.current ? "correct" : "wrong"}
          type="text"
          onChange={changeHandler}
          value={inputValue}
        />
        {separateText[1]}
      </h3>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};
export default Knoword;
