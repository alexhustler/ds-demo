import { ReduxAction } from "../common/interfaces";

import { LOGOUT_SUCCESS } from "../authentication/authentication-actions";
import { SWITCH_MENU_DRAWER } from "./user-actions";

interface UserState {
  isMenuDrawerOpen: boolean;
  languageCode: string;
  userSettings: any;
  isUpdatingLogoImage: boolean;
  isUpdatingProfileImage: boolean;
  isUpdatingAutoDialerSettings: boolean;
}

const initialState: UserState = {
  isMenuDrawerOpen: false,
  languageCode: "en",
  userSettings: {},
  isUpdatingLogoImage: false,
  isUpdatingProfileImage: false,
  isUpdatingAutoDialerSettings: false,
};

export const userReducer = (
  state: UserState = initialState,
  action: ReduxAction
): UserState => {
  const { payload, type } = action;
  switch (type) {
    case SWITCH_MENU_DRAWER:
      return {
        ...state,
        isMenuDrawerOpen: !state.isMenuDrawerOpen,
      };
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
