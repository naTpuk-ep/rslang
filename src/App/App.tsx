import React from "react";
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
import OwnGame from "../games/OwnGame";
import BookPage from "../pages/BookPage";

// Temporary page templates!
const Main: React.FunctionComponent = () => {
  return (
    <>
      <h1>Main Page</h1>
    </>
  );
};

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

const AudioCall: React.FunctionComponent = () => {
  return (
    <>
      <h1>Audio Call</h1>
    </>
  );
};

const GameSavannah: React.FunctionComponent = () => {
  return (
    <>
      <h1>GameSavannah</h1>
    </>
  );
};

const GameSprint: React.FunctionComponent = () => {
  return (
    <>
      <h1>GameSprint</h1>
    </>
  );
};

// Temporary page templates!

const App: React.FunctionComponent = () => {
  const isAuthorization = true;

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
              <BookPage />
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
              <GameSavannah />
            </Route>
            <Route path={AUDIO_CALL}>
              <AudioCall />
            </Route>
            <Route path={SPRINT}>
              <GameSprint />
            </Route>
            <Route path={OWN_GAME}>
              <OwnGame />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path={MAIN}>
              <Main />
            </Route>
            <Route path={`${BOOK}/:group`}>
              <BookPage />
            </Route>
            <Route path={SAVANNAH}>
              <GameSavannah />
            </Route>
            <Route path={AUDIO_CALL}>
              <AudioCall />
            </Route>
            <Route path={SPRINT}>
              <GameSprint />
            </Route>
            <Route path={OWN_GAME}>
              <OwnGame />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
};

export default App;
