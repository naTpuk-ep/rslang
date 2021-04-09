/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

const useGetWordsForGame = () => {
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { aggregateUserWords, setUserWordsPage } = useActions();

  return { words: aggregatedWords.words, aggregateUserWords, setUserWordsPage };
};

export default useGetWordsForGame;
