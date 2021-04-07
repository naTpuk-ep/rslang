import * as React from "react";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import GameNames from "../../constants/game-names";
import Locations from "../../constants/locations";
import { MAIN } from "../../constants/routes";
import useTypedSelector from "../../hooks/useTypeSelector";
import IUserWordData from "../../types/user-words-types";
import "./Game.scss";

interface IGameProps {
  game: GameNames;
}

interface ILocationState {
  from: Locations;
}

interface ITemplateGameProps {
  words: IUserWordData[];
}

const TemplateGame: React.FunctionComponent<ITemplateGameProps> = ({
  words,
}: ITemplateGameProps) => {
  // eslint-disable-next-line no-console
  console.log(words);

  return <></>;
};

const useBackTo = () => {
  const history = useHistory<ILocationState>();

  const backToPreviousPage = () => history.goBack();
  const backToMain = () => {
    if (!history.location.state?.from) history.push(MAIN);
  };

  return {
    backToPreviousPage,
    backToMain,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useGetWordsForGame = (location: Locations) => {
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  return { words: aggregatedWords.words };
};

const useSwitchGame = (
  game: GameNames,
  words: IUserWordData[]
): JSX.Element => {
  switch (game) {
    case GameNames.Savannah:
      return <TemplateGame words={words} />;
    case GameNames.AudioCall:
      return <TemplateGame words={words} />;
    case GameNames.Sprint:
      return <TemplateGame words={words} />;
    case GameNames.OwnGame:
      return <TemplateGame words={words} />;
    default:
      return <div />;
  }
};

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const { backToPreviousPage, backToMain } = useBackTo();
  backToMain();

  const history = useHistory<ILocationState>();
  const { words } = useGetWordsForGame(history.location.state?.from);
  const currentGame = useSwitchGame(game, words);

  const handleClickCloseButton = () => {
    backToMain();
    backToPreviousPage();
  };

  return (
    <div className="game-page">
      <Fab
        onClick={handleClickCloseButton}
        size="small"
        color="secondary"
        className="game-page__button-close"
      >
        <CloseIcon />
      </Fab>
      {currentGame}
    </div>
  );
};

export default Game;
