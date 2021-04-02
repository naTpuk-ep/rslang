/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";
import WordCard from "../WordCard";

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
    aggregatedWords,
    pages,
    error,
    isFetching,
    isPagesFetching,
    page: userPage,
  } = useTypedSelector((state) => state.userWords);
  const { agregateUserWords, setUserWordsPage, fetchPages } = useActions();

  useEffect(() => {
    fetchPages(groupId);
  }, [groupId]);

  useEffect(() => {
    if (pages.length) {
      const filter = {
        $or: [{ "userWord.status": { $ne: "deleted" } }, { userWord: null }],
      };
      if (!pages[userPage]) {
        setUserWordsPage(0);
        return;
      }
      agregateUserWords(
        groupId,
        pages[userPage]._id,
        JSON.stringify(filter),
        1
      );
    }
  }, [pages.length, userPage]);

  const onPageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page !== 0 && page !== 31) {
      setUserWordsPage(page - 1);
    }
  };

  return (
    <>
      {isPagesFetching ? (
        ""
      ) : (
        <>
          <Pagination
            page={userPage + 1}
            count={pages.length}
            onChange={onPageChangeHandler}
            renderItem={(item) => (
              <PaginationItem
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
              />
            )}
          />
          {isFetching ? (
            ""
          ) : (
            <div className={classes.root}>
              {aggregatedWords.words.map((word) => {
                return <WordCard key={nanoid()} word={word} />;
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WordsList;
