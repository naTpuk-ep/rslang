import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Game from "../../Game";

const Knoword: FC = () => {
  const url = "https://rnovikov-rs-lang-back.herokuapp.com";
  const [game, setGame] = useState<Game | undefined>(); // "any" will be the word interface
  const [gamingWord, setGamingWord] = useState<any | undefined>();

  useEffect(() => {
    if (game) {
      setGamingWord(game.nextWord());
    }
  }, [game]);

  useEffect(() => {
    const getWordsList = async () => {
      const { data } = await axios.get(`${url}/words`);
      setGame(new Game(data));
    };
    getWordsList();
  }, []);

  useEffect(() => {
    const nextWord = () => {
      setGamingWord(game?.nextWord());
    };
    window.addEventListener("keydown", nextWord);
    return () => window.removeEventListener("keydown", nextWord);
  }, [game]);

  return (
    <>
      <div />
    </>
  );
};

export default Knoword;
