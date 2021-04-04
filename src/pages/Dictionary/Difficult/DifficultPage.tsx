import React from "react";
import { useParams } from "react-router-dom";

export interface IDifficultPageParams {
  group: string;
  page: string;
}

const DifficultPage: React.FunctionComponent = () => {
  const { group, page } = useParams<IDifficultPageParams>();

  // useUserDifficult

  return (
    <>
      <h1>
        Difficult Group: {group} Page: {page}
      </h1>
    </>
  );
};

export default DifficultPage;
