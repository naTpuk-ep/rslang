import * as React from "react";
import { useHistory } from "react-router-dom";
import GameNames from "../../constants/game-names";
import Locations from "../../constants/locations";
import { MAIN } from "../../constants/routes";
import useTypedSelector from "../../hooks/useTypeSelector";
import "./Game.scss";

interface IGameProps {
  game: GameNames;
}

interface ILocationState {
  from: Locations;
}

const useBackToMain = () => {
  const history = useHistory<ILocationState>();

  if (!history.location.state?.from) history.push(MAIN);
};

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  useBackToMain();

  const history = useHistory<ILocationState>();
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { words } = aggregatedWords;

  // eslint-disable-next-line no-console
  console.log(history.location.state?.from, game, words);
  return <div className="game-page" />;
};

export default Game;
