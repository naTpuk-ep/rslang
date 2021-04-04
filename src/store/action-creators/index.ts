import * as WordsActionsCreators from "./words";
import * as UserWordsActionsCreators from "./userWords";
import * as StatisticsActionsCreators from "./statistics";

export default {
  ...WordsActionsCreators,
  ...UserWordsActionsCreators,
  ...StatisticsActionsCreators,
};
