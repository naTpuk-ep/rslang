/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonGroup, Button, Typography, IconButton } from "@material-ui/core";
import { nanoid } from "nanoid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useEffect } from "react";
import useTypedSelector from "../../hooks/useTypeSelector";

interface IWordsListProps {
  groupId: number;
}

const WordsList: React.FunctionComponent<IWordsListProps> = (
  props: IWordsListProps
) => {
  const { groupId } = props;
  const { words, error, isFetching, page } = useTypedSelector(
    (state) => state.words
  );

  useEffect(() => {
    const filter = { $or: [{ "userWord.status": "hard" }, { userWord: null }] };
  }, [page]);

  const onclickHandler = (number: number) => {};

  return (
    <>
      <div>
        <IconButton
          aria-label="prev"
          disabled={page === 0}
          onClick={() => {
            onclickHandler(page - 1);
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Typography>{page + 1}</Typography>
        <IconButton
          aria-label="next"
          disabled={page === 29}
          onClick={() => {
            onclickHandler(page + 1);
          }}
        >
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </div>
      {words.map((word) => {
        return <></>;
      })}
    </>
  );
};

export default WordsList;
