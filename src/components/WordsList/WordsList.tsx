/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "nanoid";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import useUserBook from "../../hooks/useUserBook";

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
  groupId: number;
}

const WordsList: React.FunctionComponent<IWordsListProps> = (
  props: IWordsListProps
) => {
  const classes = useStyles();
  const { groupId } = props;
  const {
    words,
    currentPage,
    pagesCount,
    onPageChangeHandler,
    isFetching,
    isPagesFetching,
  } = useUserBook({ groupId });

  return (
    <>
      <Paginator
        currentPage={currentPage + 1}
        pageCount={pagesCount}
        onPageChangeHandler={onPageChangeHandler}
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
