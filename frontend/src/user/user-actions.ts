import { push } from "connected-react-router";

import { routePaths } from "../routing/route-paths";
import { navigateToDashboardPage } from "../routing/route-actions";
import api from "../api/api";

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const SWITCH_MENU_DRAWER = "SWITCH_MENU_DRAWER";
export const UPDATE_USER_SETTINGS_SUCCESS = "UPDATE_USER_SETTINGS_SUCCESS";

export const UPDATE_USER_LOGO_IMAGE = "UPDATE_USER_LOGO_IMAGE";
export const UPDATE_USER_LOGO_IMAGE_SUCCESS = "UPDATE_USER_LOGO_IMAGE_SUCCESS";
export const UPDATE_USER_LOGO_IMAGE_FAIL = "UPDATE_USER_LOGO_IMAGE_FAIL";
export const UPDATE_USER_PROFILE_IMAGE = "UPDATE_USER_PROFILE_IMAGE";

export const updateUserSettings = (userId: number) => {
  return async (dispatch: Function) => {
    try {
      const user = await api.users.updateUserSettings(userId);
      dispatch({
        type: UPDATE_USER_SETTINGS_SUCCESS,
        payload: {
          user,
        },
      });
      navigateToDashboardPage()(dispatch);
    } catch (error) {}
  };
};

export const navigateToSettingsPage = () => (dispatch: Function) =>
  dispatch(push(routePaths.user.settings));

export const navigateToChangePasswordPage = () => (dispatch: Function) =>
  dispatch(push(routePaths.auth.changePassword));

export const switchMenuDrawer = () => (dispatch: Function) =>
  dispatch({
    type: SWITCH_MENU_DRAWER,
    payload: {},
  });
