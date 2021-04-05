import { useEffect } from "react";
import IUserWordData from "../types/userWords-types";
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

  const { aggregateUserWords } = useActions();

  useEffect(() => {
    aggregateUserWords(Number(group), Number(page), filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, page, filter]);

  return {
    words: aggregatedWords.words,
    pagesCount: Math.ceil(aggregatedWords.totalCount / 20),
    isFetching,
  };
};

export default useUserDictionary;
