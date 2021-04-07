/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GET_USER_BOOK_PAGE_FILTER } from "../constants/requestParams";
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
  const { aggregateUserWords, fetchPages, changeUserWordsPages } = useActions();

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

  useEffect(() => {
    if (pages.length && !isFetching) {
      const { length } = aggregatedWords.words.filter((word) => {
        if (word.userWord?.status !== "deleted") return true;
        return false;
      });
      changeUserWordsPages(pages[currentPage]._id, length);
    }
  }, [aggregatedWords]);

  return {
    words: aggregatedWords.words.filter((word) => {
      if (word.userWord?.status !== "deleted") return true;
      return false;
    }),
    isFetching,
    isPagesFetching,
    pagesCount: pages.length,
  };
};

export default useUserBook;
