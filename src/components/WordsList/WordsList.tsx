/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "nanoid";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import IUserWordData from "../../types/userWords-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      rowGap: 15,
      padding: theme.spacing(2, 2),
    },
  })
);

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
  const classes = useStyles();
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
    <>
      <Paginator
        route={`${route}/${group}`}
        currentPage={page + 1}
        pageCount={pagesCount}
        isPagesFetching={isPagesFetching}
      />
      <>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <div className={classes.root}>
            {words.map((word) => {
              return <WordCard key={nanoid()} word={word} />;
            })}
          </div>
        )}
      </>
    </>
  );
};

export default WordsList;
