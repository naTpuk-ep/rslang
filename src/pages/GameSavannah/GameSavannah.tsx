import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./GameSavannah.scss";

const GameSavannah: React.FunctionComponent = () => {
  const [words, setWords] = useState(["Word 1", "Word 2", "Word 3"]);
  const [guessWord, setGuessWord] = useState(words[0]);
  const [animated, setAnimated] = useState(nanoid());

  return (
    <div className="game-field">
      <div className="game-field--buttons">
        <div key={animated} className="game-field--guess-word animation">
          {guessWord}
        </div>
        <div className="game-field--buttons-button">1 Word</div>
        <div className="game-field--buttons-button">2 Word</div>
        <div className="game-field--buttons-button">3 Word</div>
        <div className="game-field--buttons-button">4 Word</div>
      </div>
    </div>
  );
};

export default GameSavannah;
