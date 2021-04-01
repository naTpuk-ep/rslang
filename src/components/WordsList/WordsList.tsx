/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonGroup, Button, Typography, IconButton } from "@material-ui/core";
import { nanoid } from "nanoid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";
import WordCard from "../WordCard";

interface IWordsListProps {
  groupId: number;
}

const WordsList: React.FunctionComponent<IWordsListProps> = (
  props: IWordsListProps
) => {
  const { groupId } = props;
  const { words, error, isFetching, page } = useTypedSelector(
    (state) => state.userWords
  );
  const { agregateUserWords, setUserWordsPage } = useActions();

  useEffect(() => {
    const filter = { $or: [{ "userWord.status": "hard" }, { userWord: null }] };

    agregateUserWords(groupId, page, 20, JSON.stringify(filter));
  }, [page]);

  const onclickHandler = (number: number) => {
    setUserWordsPage(number);
  };

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
        return <WordCard key={nanoid()} word={word} />;
      })}
    </>
  );
};

export default WordsList;
