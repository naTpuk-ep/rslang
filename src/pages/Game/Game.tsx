/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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

interface ITemplateGameProps {
  words: IUserWordData[];
}

const TemplateGame: React.FunctionComponent<ITemplateGameProps> = ({
  words,
}: ITemplateGameProps) => {
  console.log(words);
  return <h1>Game</h1>;
};

interface ILocationState {
  from: Locations;
  group: number;
  page: number;
  filter: string;
}

interface IGameProps {
  game: GameNames;
}

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const { backToPreviousPage, backToMain } = useBackTo();
  backToMain();

  const history = useHistory<ILocationState>();
  const { from, group, page, filter } = history.location.state;
  const [openStartDialog, setOpenStartDialog] = useState(
    from === Locations.Menu
  );
  const [openLoader, setOpenLoader] = useState(from === Locations.Book);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const {
    userId,
    token,
    isAuthenticated,
    words,
    aggregateUserWords,
    gameWords,
    isGameWordsFetching,
    fetchGameWords,
    fetchAggregatedGameWords,
    fillGameWords,
    clearGameWords,
  } = useGetWordsForGame();

  const finishWords =
    !isAuthenticated && from === Locations.Book ? words : gameWords;

  useEffect(() => {
    return () => {
      clearGameWords();
    };
  }, []);

  useEffect(() => {
    if (from === Locations.Menu && selectedGroup !== null) {
      if (isAuthenticated) {
        // fetchAggregatedGameWords(group, 30, filter, );
        console.log();
      } else {
        fetchGameWords(selectedGroup as number, 30);
      }
    }
    return () => {};
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup !== null && finishWords.length) {
      setOpenStartDialog(false);
    }
  }, [finishWords.length]);

  useEffect(() => {
    if (finishWords.length) {
      setOpenLoader(false);
    }
  }, [finishWords.length]);

  useEffect(() => {
    if (from === Locations.Book && isAuthenticated) {
      console.log(filter);
      console.log(words);
      fillGameWords(group, 0, words, filter, 20, 20, userId, token);
    }
  }, []);

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
      <Backdrop open={openLoader}>
        <CircularProgress />
      </Backdrop>
      <Fab
        onClick={handleClickCloseButton}
        size="small"
        color="secondary"
        className="game-page__button-close"
      >
        <CloseIcon />
      </Fab>
      {openStartDialog || openLoader ? (
        ""
      ) : (
        <>
          {game === GameNames.Savannah && <TemplateGame words={finishWords} />}
          {game === GameNames.AudioCall && <TemplateGame words={finishWords} />}
          {game === GameNames.Sprint && <TemplateGame words={finishWords} />}
          {game === GameNames.OwnGame && <TemplateGame words={finishWords} />}
        </>
      )}
    </div>
  );
};

export default Game;
