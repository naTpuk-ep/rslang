/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useParams } from "react-router-dom";
import WordsCategories from "../../components/WordsCategories";
import WordsList from "../../components/WordsList";
import { BOOK } from "../../constants/routes";
import useUserBook from "../../hooks/useUserBook";

export interface IBookParams {
  group: string;
  page: string;
}

const Book: React.FunctionComponent = () => {
  const { group, page } = useParams<IBookParams>();

  const { words, pagesCount, isFetching, isPagesFetching } = useUserBook({
    group: Number(group),
    page: Number(page),
  });

  const props = {
    route: BOOK,
    group: Number(group),
    page: Number(page),
    words,
    pagesCount,
    isFetching,
    isPagesFetching,
  };

  return (
    <>
      <h1>
        Book Group: {group} Page: {page}
        <WordsCategories route={BOOK} />
        <WordsList {...props} />
      </h1>
    </>
  );
};

export default Book;
