/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link, useParams } from "react-router-dom";
import UnitStatistics from "../../components/UnitStatistics/UnitStatistics";
import WordsCategories from "../../components/WordsCategories";
import WordsList from "../../components/WordsList";
import Locations from "../../constants/locations";
import { BOOK, SAVANNAH } from "../../constants/routes";
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
        <UnitStatistics group={Number(group)} />
        <WordsCategories route={BOOK} />
        <Link to={{ pathname: SAVANNAH, state: { from: Locations.Book } }}>
          GAME
        </Link>
        <WordsList {...props} />
      </h1>
    </>
  );
};

export default Book;
