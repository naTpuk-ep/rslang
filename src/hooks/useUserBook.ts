/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GET_USER_BOOK_PAGE_FILTER } from "../constants/request-params";
import { BOOK } from "../constants/routes";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

interface IUseUserBookProps {
  group: number;
  page: number;
}

const useUserBook = (props: IUseUserBookProps) => {
  const { group, page: currentPage } = props;
  const {
    aggregatedWords,
    pages,
    isFetching,
    isPagesFetching,
  } = useTypedSelector((state) => state.userWords);
  const history = useHistory();
  const { aggregateUserWords, setUserWordsPage, fetchPages } = useActions();

  useEffect(() => {
    fetchPages(group);
  }, [group]);

  useEffect(() => {
    if (pages.length) {
      if (!pages[currentPage]) {
        history.push(`${BOOK}/${group}/0`);
        return;
      }
      aggregateUserWords(
        group,
        pages[currentPage]._id,
        JSON.stringify(GET_USER_BOOK_PAGE_FILTER),
        1
      );
    }
  }, [pages.length, currentPage]);

  const onPageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setUserWordsPage(page - 1);
  };

  return {
    words: aggregatedWords.words,
    isFetching,
    isPagesFetching,
    onPageChangeHandler,
    pagesCount: pages.length,
  };
};

export default useUserBook;
