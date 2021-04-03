/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

interface IUseUserBookProps {
  groupId: number;
}

const useUserBook = (props: IUseUserBookProps) => {
  const { groupId } = props;
  const {
    aggregatedWords,
    pages,
    error,
    isFetching,
    isPagesFetching,
    page: userPage,
  } = useTypedSelector((state) => state.userWords);
  const { aggregateUserWords, setUserWordsPage, fetchPages } = useActions();

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
      aggregateUserWords(
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
    setUserWordsPage(page - 1);
  };

  return {
    words: aggregatedWords.words,
    isFetching,
    isPagesFetching,
    onPageChangeHandler,
    pagesCount: pages.length,
    currentPage: userPage,
  };
};

export default useUserBook;
