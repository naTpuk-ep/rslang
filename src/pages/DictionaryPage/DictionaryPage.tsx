import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import WordsList from "../../components/WordsList";
import useUserDictionary from "../../hooks/useUserDictionary";
import WordsCategories from "../../components/WordsCategories";

export interface IDictionaryPageParams {
  group: string;
  page: string;
}

export interface IDictionaryPageProps {
  header: string;
  route: string;
  filter: string;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const DictionaryPage: React.FunctionComponent<IDictionaryPageProps> = (
  props: IDictionaryPageProps
) => {
  const { group, page } = useParams<IDictionaryPageParams>();
  const {
    header,
    route,
    filter,
    difficultCategory,
    learnCategory,
    deletedCategory,
  } = props;
  const { words, pagesCount, isFetching } = useUserDictionary({
    group: Number(group),
    page: Number(page),
    filter,
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {header}
      </Typography>
      <WordsCategories route={route} />
      <WordsList
        route={route}
        group={Number(group)}
        page={Number(page)}
        words={words}
        pagesCount={pagesCount}
        isFetching={isFetching}
        isPagesFetching={false}
        difficultCategory={difficultCategory}
        learnCategory={learnCategory}
        deletedCategory={deletedCategory}
      />
    </>
  );
};

DictionaryPage.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default DictionaryPage;
