/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useHistory } from "react-router-dom";
import {
  BOOK,
  DELETED_WORDS,
  DIFFICULT_WORDS,
  STUDIED_WORDS,
} from "../../constants/routes";
import {
  GET_USER_DELETED_WORDS_FILTER,
  GET_USER_HARD_WORDS_FILTER,
  GET_USER_LEARN_WORDS_FILTER,
} from "../../constants/request-params";
import useTypedSelector from "../../hooks/useTypeSelector";

const useSwitchParams = (page: number) => {
  const {
    location: { pathname },
  } = useHistory();

  let filter = "";
  let wordsPerPage = 0;
  let count = 0;
  const { pages } = useTypedSelector((state) => state.userWords);

  if (pathname.includes(BOOK)) {
    let bookPage = page;
    if (pages[bookPage]) {
      bookPage = pages[bookPage]._id;
    }
    filter = JSON.stringify({
      $or: [
        {
          $and: [
            { "userWord.status": { $ne: "deleted" }, page: { $lt: bookPage } },
          ],
        },
        { $and: [{ userWord: null, page: { $lt: bookPage } }] },
      ],
    });
    wordsPerPage = 20;
    count = 20;
  } else if (pathname.includes(STUDIED_WORDS)) {
    filter = JSON.stringify(GET_USER_LEARN_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  } else if (pathname.includes(DIFFICULT_WORDS)) {
    filter = JSON.stringify(GET_USER_HARD_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  } else if (pathname.includes(DELETED_WORDS)) {
    filter = JSON.stringify(GET_USER_DELETED_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  }

  return { filter, wordsPerPage, count };
};

export default useSwitchParams;
