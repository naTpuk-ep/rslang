import React from "react";

import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import CircularProgress from "@material-ui/core/CircularProgress";

interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  isPagesFetching: boolean;
  onPageChangeHandler: (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => void;
}

const Paginator: React.FunctionComponent<PaginatorProps> = (
  props: PaginatorProps
) => {
  const {
    currentPage,
    pageCount,
    onPageChangeHandler,
    isPagesFetching,
  } = props;

  return (
    <>
      {isPagesFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Pagination
            page={currentPage}
            count={pageCount}
            onChange={onPageChangeHandler}
            renderItem={(item) => (
              <PaginationItem
                // eslint-disable-next-line react/jsx-props-no-spreading
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
