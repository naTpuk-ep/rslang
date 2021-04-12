/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link, useHistory } from "react-router-dom";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import IUserWordData from "../../types/user-words-types";
import "./WordList.scss";
import { BOOK, OWN_GAME } from "../../constants/routes";
import Locations from "../../constants/locations";

interface IWordsListProps {
  route: string;
  group: number;
  page: number;
  words: IUserWordData[];
  pagesCount: number;
  isFetching: boolean;
  isPagesFetching: boolean;
}

const WordsList: React.FunctionComponent<IWordsListProps> = (
  props: IWordsListProps
) => {
  const {
    route,
    group,
    page,
    words,
    pagesCount,
    isFetching,
    isPagesFetching,
  } = props;
  const history = useHistory();

  let filter = "";

  if (history.location.pathname.includes(BOOK)) {
    filter = JSON.stringify({
      $or: [
        {
          $and: [
            { "userWord.status": { $ne: "deleted" }, page: { $lt: page } },
          ],
        },
        { $and: [{ userWord: null, page: { $lt: page } }] },
      ],
    });
  }

  return (
    <div id="body">
      <div id="head">
        <Link
          to={{
            pathname: OWN_GAME,
            state: {
              from: Locations.Book,
              group,
              page,
              filter,
            },
          }}
        >
          GAME
        </Link>
        <Paginator
          route={`${route}/${group}`}
          currentPage={page + 1}
          pageCount={pagesCount}
          isPagesFetching={isPagesFetching}
        />
      </div>
      <div id="content" className="word-list">
        {isFetching ? (
          <LinearProgress />
        ) : (
          <>
            {words.map((word) => {
              return <WordCard key={word._id} word={word} />;
            })}
          </>
        )}
      </div>
      <div id="foot">
        <Paginator
          route={`${route}/${group}`}
          currentPage={page + 1}
          pageCount={pagesCount}
          isPagesFetching={isPagesFetching}
        />
      </div>
    </div>
  );
};

export default WordsList;
