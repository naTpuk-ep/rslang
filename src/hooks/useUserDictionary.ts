/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import IUserWordData from "../types/user-words-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

interface IUseUserDictionaryProps {
  group: number;
  page: number;
  filter: string;
}

const useUserDictionary = (
  props: IUseUserDictionaryProps
): { words: IUserWordData[]; pagesCount: number; isFetching: boolean } => {
  const history = useHistory();
  const { group, page, filter } = props;
  const { aggregatedWords, isFetching } = useTypedSelector(
    (state) => state.userWords
  );
  const { userId, token } = useTypedSelector((state) => state.auth);

  const { aggregateUserWords } = useActions();

  useEffect(() => {
    const { totalCount } = aggregatedWords;
    const { length } = aggregatedWords.words;

    if (!length && !isFetching && page !== 0) {
      history.push(`${history.location.pathname.slice(0, -1)}${page - 1}`);
    }

    if (page + 1 < Math.ceil(totalCount / 20) && length < 20) {
      aggregateUserWords(group, page, filter, userId, token);
    }
  }, [aggregatedWords.words.length]);

  useEffect(() => {
    aggregateUserWords(group, page, filter, userId, token);
  }, [group, page, filter, userId]);

  return {
    words: aggregatedWords.words,
    pagesCount: Math.ceil(aggregatedWords.totalCount / 20),
    isFetching,
  };
};

export default useUserDictionary;
