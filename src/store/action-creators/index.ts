import * as WordsActionsCreators from "./words";
import * as UserWordsActionsCreators from "./userWords";
import * as StatisticsActionsCreators from "./statistics";
import * as UnitStatisticsActionsCreators from "./unitStatistics";
import * as AuthActionsCreators from "./auth";
import * as SettingsActionsCreators from "./settings";

export default {
  ...WordsActionsCreators,
  ...UserWordsActionsCreators,
  ...StatisticsActionsCreators,
  ...UnitStatisticsActionsCreators,
  ...AuthActionsCreators,
  ...SettingsActionsCreators,
};
