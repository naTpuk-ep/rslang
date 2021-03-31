/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

interface IWordsListParams {
  groupId: number;
}

const WordsList: React.FunctionComponent<IWordsListParams> = (
  props: IWordsListParams
) => {
  const { groupId } = props;

  const { words, error, isFetching } = useTypedSelector((state) => state.words);
  const { fetchWords } = useActions();

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <>
      {words.map((word) => {
        return <div key={nanoid()}>{word.textExample}</div>;
      })}
    </>
  );
};

export default WordsList;
