import React from "react";

import GameField from "./Card";
import Score from "./Score";
import Time from "./Time";

import "./game-sprint.scss";

const GameSprint = () => {
  return (
    <div className="game-sprint">
      <Score />
      <GameField />
      <div className="game-sprint-time">
        <Time />
      </div>
    </div>
  );
};

export default GameSprint;
