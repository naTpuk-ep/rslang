/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Fullscreen, Close, FullscreenExit } from "@material-ui/icons/";
import { Redirect, useHistory } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import GameNames from "../../constants/game-names";
import Locations from "../../constants/locations";
import IUserWordData from "../../types/user-words-types";
import StartDialog from "../../components/StartDialog";
import useGetWordsForGame from "./useGetWordsForGame";
import useBackTo from "./useBackTo";
import { MAIN } from "../../constants/routes";
import { GET_USER_BOOK_PAGE_FILTER } from "../../constants/request-params";
import "./Game.scss";
import GameSavannah from "../GameSavannah";

interface ITemplateGameProps {
  words: IUserWordData[];
}

const TemplateGame: React.FunctionComponent<ITemplateGameProps> = ({
  words,
}: ITemplateGameProps) => {
  // eslint-disable-next-line no-console
  console.log(words);
  return (
    <div style={{ width: "100%", height: "100%", background: "white" }}>
      Game
    </div>
  );
};

interface ILocationState {
  from: Locations;
  group: number;
  page: number;
  filter: string;
  wordsPerPage: number;
}

interface IGameProps {
  game: GameNames;
}

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const history = useHistory<ILocationState>();
  const handle = useFullScreenHandle();
  const { from, group, filter, wordsPerPage } = history.location.state
    ? history.location.state
    : { from: "", group: 0, filter: "", wordsPerPage: 0 };
  const { backToPreviousPage } = useBackTo();
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
    gameWords,
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
        fetchAggregatedGameWords(
          selectedGroup as number,
          30,
          JSON.stringify(GET_USER_BOOK_PAGE_FILTER),
          userId,
          token
        );
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
      fillGameWords(group, 0, words, filter, wordsPerPage, 20, userId, token);
    }
  }, []);

  const handleClickCloseButton = () => {
    backToPreviousPage();
  };

  const handleClickFullscreenButton = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const handleCloseStartDialog = (value: number) => {
    setSelectedGroup(value);
  };

  return history.location.state ? (
    <div className="game-page">
      <FullScreen handle={handle} className="game-page__fullscreen">
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
          <Close />
        </Fab>
        <Fab
          onClick={handleClickFullscreenButton}
          size="small"
          color="primary"
          className="game-page__button-fullscreen"
        >
          {handle.active ? <FullscreenExit /> : <Fullscreen />}
        </Fab>
        {openStartDialog || openLoader ? (
          ""
        ) : (
          <>
            {game === GameNames.Savannah && (
              <GameSavannah words={finishWords} />
            )}
            {game === GameNames.AudioCall && (
              <TemplateGame words={finishWords} />
            )}
            {game === GameNames.Sprint && <TemplateGame words={finishWords} />}
            {game === GameNames.OwnGame && <TemplateGame words={finishWords} />}
          </>
        )}
      </FullScreen>
    </div>
  ) : (
    <Redirect to={MAIN} />
  );
};

export default Game;
