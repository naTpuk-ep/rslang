/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import {
  MAIN,
  BOOK,
  STUDIED_WORDS,
  DIFFICULT_WORDS,
  DELETED_WORDS,
  SAVANNAH,
  AUDIO_CALL,
  SPRINT,
  OWN_GAME,
  STATISTICS,
} from "../constants/routes";
import "./App.scss";
import Book from "../pages/Book";
import Game from "../pages/Game";
import GameNames from "../constants/game-names";
import useActions from "../hooks/useActions";
import Main from "../pages/Main";

// Temporary page templates!
// const Main: React.FunctionComponent = () => {
//   return (
//     <>
//       <h1>Main Page</h1>
//     </>
//   );
// };

const StudiedWords: React.FunctionComponent = () => {
  return (
    <>
      <h1>Studied Words Dictionary</h1>
    </>
  );
};

const DifficultWords: React.FunctionComponent = () => {
  return (
    <>
      <h1>Difficult Words Dictionary</h1>
    </>
  );
};

const DeletedWords: React.FunctionComponent = () => {
  return (
    <>
      <h1>Deleted Words Dictionary</h1>
    </>
  );
};

const Statistics: React.FunctionComponent = () => {
  return (
    <>
      <h1>Statistics Page</h1>
    </>
  );
};
// Temporary page templates!

const App: React.FunctionComponent = () => {
  const isAuthorization = true;

  const { getStatistics } = useActions();

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <>
      <Header />
      <Container className="main">
        {isAuthorization ? (
          <Switch>
            <Route exact path={MAIN}>
              <Main />
            </Route>
            <Route path={`${BOOK}/:group/:page`}>
              <Book />
            </Route>
            <Route path={STUDIED_WORDS}>
              <StudiedWords />
            </Route>
            <Route path={DIFFICULT_WORDS}>
              <DifficultWords />
            </Route>
            <Route path={DELETED_WORDS}>
              <DeletedWords />
            </Route>
            <Route path={STATISTICS}>
              <Statistics />
            </Route>
            <Route path={SAVANNAH}>
              <Game game={GameNames.Savannah} />
            </Route>
            <Route path={AUDIO_CALL}>
              <Game game={GameNames.AudioCall} />
            </Route>
            <Route path={SPRINT}>
              <Game game={GameNames.Sprint} />
            </Route>
            <Route path={OWN_GAME}>
              <Game game={GameNames.OwnGame} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path={MAIN}>
              <Main />
            </Route>
            <Route path={`${BOOK}/:group`}>
              <Book />
            </Route>
            <Route path={SAVANNAH}>
              <Game game={GameNames.Savannah} />
            </Route>
            <Route path={AUDIO_CALL}>
              <Game game={GameNames.AudioCall} />
            </Route>
            <Route path={SPRINT}>
              <Game game={GameNames.Sprint} />
            </Route>
            <Route path={OWN_GAME}>
              <Game game={GameNames.OwnGame} />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
};

export default App;
