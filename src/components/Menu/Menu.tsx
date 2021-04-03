import * as React from "react";
import { Link } from "react-router-dom";
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
} from "../../constants/routes";

const Menu: React.FunctionComponent = () => {
  return (
    <ul>
      <li>
        <Link to={MAIN}>Main</Link>
      </li>
      <li>
        <Link to={`${BOOK}/0/0`}>Book Group 0</Link>
      </li>
      <li>
        <Link to={`${BOOK}/1/0`}>Book Group 1</Link>
      </li>
      <li>
        <Link to={`${BOOK}/2/0`}>Book Group 2</Link>
      </li>
      <li>
        <Link to={`${BOOK}/3/0`}>Book Group 3</Link>
      </li>
      <li>
        <Link to={`${BOOK}/4/0`}>Book Group 4</Link>
      </li>
      <li>
        <Link to={`${BOOK}/5/0`}>Book Group 5</Link>
      </li>
      <li>
        <Link to={STUDIED_WORDS}>Studied Words</Link>
      </li>
      <li>
        <Link to={DIFFICULT_WORDS}>Difficult Words</Link>
      </li>
      <li>
        <Link to={DELETED_WORDS}>Deleted Words</Link>
      </li>
      <li>
        <Link to={SAVANNAH}>Savannah</Link>
      </li>
      <li>
        <Link to={AUDIO_CALL}>Audio Call</Link>
      </li>
      <li>
        <Link to={SPRINT}>Sprint</Link>
      </li>
      <li>
        <Link to={OWN_GAME}>Own Game</Link>
      </li>
      <li>
        <Link to={STATISTICS}>Statistics</Link>
      </li>
    </ul>
  );
};

export default Menu;
