import * as React from "react";
import GameNames from "../../constants/game-names";
import "./Game.scss";

interface IGameProps {
  game: GameNames;
}

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  return <div className="game-page" />;
};

export default Game;
