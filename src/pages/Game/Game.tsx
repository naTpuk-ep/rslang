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

const useBackTo = () => {
  const history = useHistory<ILocationState>();

  const backToPreviousPage = () => history.goBack();
  const backToPage = (route: string) => history.push(route);
  const backToMain = () => {
    if (!history.location.state?.from) history.push(MAIN);
  };

  return {
    backToPreviousPage,
    backToPage,
    backToMain,
  };
};

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const { backToPreviousPage, backToPage, backToMain } = useBackTo();
  const history = useHistory<ILocationState>();
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { words } = aggregatedWords;

  backToMain();

  // eslint-disable-next-line no-console
  console.log(history.location.state?.from, game, words);
  return <div className="game-page" />;
};

export default Game;
