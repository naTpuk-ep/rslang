/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/http.hook";
import IWordData from "../../../models/word-model";
import { setWords } from "../../store/reducers/wordsReducer";

interface IWordsListParams {
  groupId: number;
  fetchWords: (data: IWordData[]) => void;
}

const WordsList: React.FunctionComponent<IWordsListParams> = (
  props: IWordsListParams
) => {
  const { groupId, fetchWords } = props;

  const { request } = useHttp();

  const words = useSelector(
    (state: { words: { words: IWordData[] } }) => state.words.words
  );

  useEffect(() => {
    request(
      `https://rnovikov-rs-lang-back.herokuapp.com/words?group=${1}&page=${1}`,
      "GET"
    ).then((data) => fetchWords(data));
  }, []);

  return (
    <>
      {words.map((word) => {
        return <div key={nanoid()}>{word.textExample}</div>;
      })}
    </>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: IWordData[] }) => void
) => {
  return {
    fetchWords: (data: IWordData[]) => dispatch(setWords(data)),
  };
};

export default connect(null, mapDispatchToProps)(WordsList);
