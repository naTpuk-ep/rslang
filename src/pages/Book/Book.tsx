/* eslint-disable react/jsx-props-no-spreading */
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useParams } from "react-router-dom";
import WordsCategories from "../../components/WordsCategories";
import WordsList from "../../components/WordsList";
import { BOOK } from "../../constants/routes";
import useBook from "../../hooks/useBook";

export interface IBookParams {
  group: string;
  page: string;
}

const Book: React.FunctionComponent = () => {
  const { group, page } = useParams<IBookParams>();

  const { words, isFetching } = useBook({
    group: Number(group),
    page: Number(page),
  });

  const props = {
    route: BOOK,
    group: Number(group),
    page: Number(page),
    words,
    pagesCount: 30,
    isFetching,
    isPagesFetching: false,
  };

  return (
    <>
      <Box marginTop={2}>
        <Typography variant="h3" component="h2">
          Учебник
        </Typography>
      </Box>
      <WordsCategories route={BOOK} />
      <WordsList {...props} />
    </>
  );
};

export default Book;
