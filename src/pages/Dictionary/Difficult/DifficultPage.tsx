/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../../hooks/useActions";
import useTypedSelector from "../../../hooks/useTypeSelector";
import { GET_USER_HARD_WORDS_FILTER } from "../../../constants/requestParams";
import WordsList from "../../../components/WordsList";
import { DIFFICULT_WORDS } from "../../../constants/routes";

export interface IDifficultPageParams {
  group: string;
  page: string;
}

const DifficultPage: React.FunctionComponent = () => {
  const { group, page } = useParams<IDifficultPageParams>();

  // useUserDifficult

  const { aggregatedWords, isFetching } = useTypedSelector(
    (state) => state.userWords
  );
  // const history = useHistory();
  const { aggregateUserWords } = useActions();

  useEffect(() => {
    aggregateUserWords(
      Number(group),
      Number(page),
      JSON.stringify(GET_USER_HARD_WORDS_FILTER)
    );
  }, [group, page]);

  // useUserDifficult

  const props = {
    route: DIFFICULT_WORDS,
    group: Number(group),
    page: Number(page),
    words: aggregatedWords.words,
    pagesCount: Math.ceil(aggregatedWords.totalCount / 20),
    isFetching,
    isPagesFetching: false,
    difficultCategory: true,
  };

  return (
    <>
      <h1>
        Difficult Group: {group} Page: {page}
        <WordsList {...props} />
      </h1>
    </>
  );
};

export default DifficultPage;
