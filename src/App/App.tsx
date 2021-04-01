import React from "react";
import { Router, Link } from "@reach/router";
import { Container } from "@material-ui/core";
import "./App.scss";

// const Main: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Main Page</h1>
//     </Container>
//   );
// };

// const Book: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Book</h1>
//     </Container>
//   );
// };

// const Dictionary: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Dictionary</h1>
//     </Container>
//   );
// };

// const Statistics: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Statistics Page</h1>
//     </Container>
//   );
// };

// const Savannah: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Savannah</h1>
//     </Container>
//   );
// };

// const AudioCall: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Audio Call</h1>
//     </Container>
//   );
// };

// const Sprint: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Sprint</h1>
//     </Container>
//   );
// };

// const OwnGame: React.FunctionComponent = () => {
//   return (
//     <Container>
//       <h1>Own Game</h1>
//     </Container>
//   );
// };

const App: React.FunctionComponent = () => {
  return (
    <Router>
      {/* <Main path="/" />
      <Book path="/book/:group" />
      <Dictionary path="/dictionary" />
      <Statistics path="/statistics" />
      <Savannah path="/savannah" /> */}
    </Router>
  );
};

export default App;
