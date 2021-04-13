import React from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import WordsList from "../../components/WordsList";
import useUserDictionary from "../../hooks/useUserDictionary";
import WordsCategories from "../../components/WordsCategories";

export interface IDictionaryParams {
  group: string;
  page: string;
}

export interface IDictionaryProps {
  header: string;
  route: string;
  filter: string;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const Dictionary: React.FunctionComponent<IDictionaryProps> = (
  props: IDictionaryProps
) => {
  const { group, page } = useParams<IDictionaryParams>();
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
      <Box marginTop={2}>
        <Typography variant="h3" component="h2">
          {header}
        </Typography>
      </Box>
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

Dictionary.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default Dictionary;
