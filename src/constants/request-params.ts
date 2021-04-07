const STATUS_DELETED = "deleted";
const STATUS_HARD = "hard";
const NO_STATUS = "";

const GET_USER_BOOK_PAGE_FILTER = {
  $or: [{ "userWord.status": { $ne: "deleted" } }, { userWord: null }],
};
const GET_USER_LEARN_WORDS_FILTER = { "userWord.isLearn": true };
const GET_USER_DELETED_WORDS_FILTER = { "userWord.status": "deleted" };
const GET_USER_HARD_WORDS_FILTER = { "userWord.status": "hard" };

const BACKEND_PATH = "https://rnovikov-rs-lang-back.herokuapp.com/";

export {
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
  BACKEND_PATH,
  GET_USER_BOOK_PAGE_FILTER,
  GET_USER_LEARN_WORDS_FILTER,
  GET_USER_DELETED_WORDS_FILTER,
  GET_USER_HARD_WORDS_FILTER,
};
