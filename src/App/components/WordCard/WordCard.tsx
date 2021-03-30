/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IWordsListParams {
  groupId: number;
}

const WordsList: React.FunctionComponent<IWordsListParams> = (
  props: IWordsListParams
) => {
  const { groupId } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return <div />;
};
