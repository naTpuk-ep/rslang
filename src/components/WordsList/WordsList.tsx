/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import IUserWordData from "../../types/user-words-types";
import "./WordList.scss";
import BookSettings from "../Settings";

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

  return (
    <div id="body">
      <div id="head">
        <Paginator
          route={`${route}/${group}`}
          currentPage={page + 1}
          pageCount={pagesCount}
          isPagesFetching={isPagesFetching}
        />
      </div>
      <BookSettings />
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
