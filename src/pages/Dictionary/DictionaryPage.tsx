import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { GET_USER_HARD_WORDS_FILTER } from "../../../constants/requestParams";
import WordsList from "../../../components/WordsList";
import { DIFFICULT_WORDS } from "../../../constants/routes";
import useUserDictionary from "../../../hooks/useUserDictionary";
import WordsCategories from "../../../components/WordsCategories";

export interface IDifficultPageParams {
  group: string;
  page: string;
}

const DifficultPage: React.FunctionComponent = () => {
  const { group, page } = useParams<IDifficultPageParams>();
  const { words, pagesCount, isFetching } = useUserDictionary({
    group: Number(group),
    page: Number(page),
    filter: JSON.stringify(GET_USER_HARD_WORDS_FILTER),
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Сложные слова
      </Typography>
      <WordsCategories route={DIFFICULT_WORDS} />
      <WordsList
        route={DIFFICULT_WORDS}
        group={Number(group)}
        page={Number(page)}
        words={words}
        pagesCount={pagesCount}
        isFetching={isFetching}
        isPagesFetching={false}
        difficultCategory
      />
    </>
  );
};

export default DifficultPage;
