/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

const useGetWordsForGame = () => {
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { aggregateUserWords, clearGameWords } = useActions();

  return { words: aggregatedWords.words, aggregateUserWords, clearGameWords };
};

export default useGetWordsForGame;
