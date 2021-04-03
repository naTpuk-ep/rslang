/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

interface IPaginatorProps {
  route: string;
  currentPage: number;
  pageCount: number;
  isPagesFetching: boolean;
}

const Paginator: React.FunctionComponent<IPaginatorProps> = (
  props: IPaginatorProps
) => {
  const { route, currentPage, pageCount, isPagesFetching } = props;

  return (
    <>
      {isPagesFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Pagination
            page={currentPage}
            count={pageCount}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${route}/${item.page - 1}`}
                {...item}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default Paginator;
