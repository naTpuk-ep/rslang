/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
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
  SIGN_IN,
  SIGN_UP,
} from "../constants/routes";
import "./App.scss";
import Game from "../pages/Game";
import GameNames from "../constants/game-names";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import useAuthentication from "../hooks/useAuthentication";
import UserBook from "../pages/UserBook";
import Book from "../pages/Book";
import Statistics from "../pages/Statistics";
import "fontsource-roboto";

// Temporary page templates!
const Main: React.FunctionComponent = () => {
  return <></>;
};

const StudiedWords: React.FunctionComponent = () => {
  return <></>;
};

const DifficultWords: React.FunctionComponent = () => {
  return <></>;
};

const DeletedWords: React.FunctionComponent = () => {
  return <></>;
};

const App: React.FunctionComponent = () => {
  const { isAuthenticated, loading } = useAuthentication();

  return (
    <>
      <Header />
      <Container className="main">
        <Switch>
          <Route exact path={MAIN}>
            <Main />
          </Route>
          <Route path={`${BOOK}/:group/:page`}>
            {loading ? <></> : isAuthenticated ? <UserBook /> : <Book />}
          </Route>
          <Route path={STUDIED_WORDS}>
            {isAuthenticated ? <StudiedWords /> : <Redirect to={SIGN_IN} />}
          </Route>
          <Route path={DIFFICULT_WORDS}>
            {isAuthenticated ? <DifficultWords /> : <Redirect to={SIGN_IN} />}
          </Route>
          <Route path={DELETED_WORDS}>
            {isAuthenticated ? <DeletedWords /> : <Redirect to={SIGN_IN} />}
          </Route>
          <Route path={STATISTICS}>
            {isAuthenticated ? <Statistics /> : <Redirect to={SIGN_IN} />}
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
          <Route exact path={SIGN_IN}>
            {isAuthenticated ? <Redirect to={MAIN} /> : <Login />}
          </Route>
          <Route exact path={SIGN_UP}>
            {isAuthenticated ? <Redirect to={MAIN} /> : <Registration />}
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
