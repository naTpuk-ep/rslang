/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import GameNames from "../../constants/game-names";
import Locations from "../../constants/locations";
import IUserWordData from "../../types/user-words-types";
import StartDialog from "../../components/StartDialog";
import { GET_USER_BOOK_PAGE_FILTER } from "../../constants/request-params";
import useGetWordsForGame from "./useGetWordsForGame";
import useBackTo from "./useBackTo";
import "./Game.scss";
import useTypedSelector from "../../hooks/useTypeSelector";

interface ITemplateGameProps {
  words: IUserWordData[];
}

const TemplateGame: React.FunctionComponent<ITemplateGameProps> = ({
  words,
}: ITemplateGameProps) => {
  console.log(words);
  return <Typography variant="h3">Game</Typography>;
};

interface IGameProps {
  game: GameNames;
}

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const { backToPreviousPage, backToMain } = useBackTo();
  backToMain();
  const { userId, token } = useTypedSelector((state) => state.auth);

  const history = useHistory<{ from: Locations }>();
  const [openStartDialog, setOpenStartDialog] = useState(
    history.location.state?.from === Locations.Menu
  );
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const { words, aggregateUserWords, clearGameWords } = useGetWordsForGame();

  useEffect(() => {
    if (history.location.state?.from === Locations.Menu) {
      clearGameWords();
      console.log("clear");
    }
    return () => {
      clearGameWords();
      console.log("clear");
    };
  }, []);

  useEffect(() => {
    if (selectedGroup !== null) {
      aggregateUserWords(
        selectedGroup,
        0,
        JSON.stringify(GET_USER_BOOK_PAGE_FILTER),
        userId,
        token,
        1
      );
      console.log("start");
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup !== null && words.length) {
      setOpenStartDialog(false);
      console.log("load");
    }
  }, [words.length]);

  const handleClickCloseButton = () => {
    backToPreviousPage();
  };

  const handleCloseStartDialog = (value: number) => {
    setSelectedGroup(value);
  };

  return (
    <div className="game-page">
      <StartDialog
        open={openStartDialog}
        group={selectedGroup}
        selectGroup={handleCloseStartDialog}
      />
      <Fab
        onClick={handleClickCloseButton}
        size="small"
        color="secondary"
        className="game-page__button-close"
      >
        <CloseIcon />
      </Fab>
      {openStartDialog ? (
        ""
      ) : (
        <>
          {game === GameNames.Savannah && <TemplateGame words={words} />}
          {game === GameNames.AudioCall && <TemplateGame words={words} />}
          {game === GameNames.Sprint && <TemplateGame words={words} />}
          {game === GameNames.OwnGame && <TemplateGame words={words} />}
        </>
      )}
    </div>
  );
};

export default Game;
