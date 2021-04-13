import { STORAGE_SETTING_NAME } from "../../constants/request-params";
import {
  SettingsActionsTypes,
  SettingsState,
} from "../../types/settings-types";
import { loadFromLocalStorage } from "../action-creators/saveLocalStorage";

const defaultState = loadFromLocalStorage(STORAGE_SETTING_NAME);

const settingsReducer = (
  state = defaultState,
  action: {
    type: SettingsActionsTypes;
    payload: {
      isButtons: boolean;
      isWordTranslate: boolean;
      isSentenceTranslate: boolean;
    };
  }
): SettingsState => {
  switch (action.type) {
    case SettingsActionsTypes.SET_SETTINGS:
      return {
        ...state,
        bookSettings: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
