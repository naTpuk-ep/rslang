/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
  const { group, page, filter } = props;
  const { aggregatedWords, isFetching } = useTypedSelector(
    (state) => state.userWords
  );
  const { userId, token } = useTypedSelector((state) => state.auth);

  const { aggregateUserWords } = useActions();

  useEffect(() => {
    aggregateUserWords(Number(group), Number(page), filter, userId, token);
  }, []);

  return {
    words: aggregatedWords.words,
    pagesCount: Math.ceil(aggregatedWords.totalCount / 20),
    isFetching,
  };
};

export default useUserDictionary;
