import * as WordsActionsCreators from "./words";
import * as UserWordsActionsCreators from "./userWords";

export default {
  ...WordsActionsCreators,
  ...UserWordsActionsCreators,
};
