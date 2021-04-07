import * as WordsActionsCreators from "./words";
import * as UserWordsActionsCreators from "./userWords";
import * as StatisticsActionsCreators from "./statistics";
import * as UnitStatisticsActionsCreators from "./unitStatistics";

export default {
  ...WordsActionsCreators,
  ...UserWordsActionsCreators,
  ...StatisticsActionsCreators,
  ...UnitStatisticsActionsCreators,
};
