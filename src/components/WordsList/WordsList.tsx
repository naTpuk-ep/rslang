/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import IUserWordData from "../../types/user-words-types";
import "./WordList.scss";
import useSwitchParams from "./useSwitchParams";
import LinksGames from "../LinksGames";

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

  const { filter, wordsPerPage } = useSwitchParams(page);

  return (
    <>
      <Paginator
        route={`${route}/${group}`}
        currentPage={page + 1}
        pageCount={pagesCount}
        isPagesFetching={isPagesFetching}
      />
      {isFetching ? (
        <Box m={2}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <LinksGames
            group={group}
            page={page}
            filter={filter}
            wordsPerPage={wordsPerPage}
          />
          <div className="word-list">
            {words.map((word) => {
              return <WordCard key={word._id} word={word} />;
            })}
          </div>
          <LinksGames
            group={group}
            page={page}
            filter={filter}
            wordsPerPage={wordsPerPage}
          />
        </>
      )}
      <Paginator
        route={`${route}/${group}`}
        currentPage={page + 1}
        pageCount={pagesCount}
        isPagesFetching={isPagesFetching}
      />
    </>
  );
};

export default WordsList;
