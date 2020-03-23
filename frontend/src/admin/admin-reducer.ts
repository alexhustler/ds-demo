import {
  FETCH_APP_STATES_SUCCESS,
  FETCH_USERS_SUCCESS,
  IMPERSONATE_USER,
  STOP_IMPERSONATING_USER,
  ADMIN_EDIT_USER_START,
  ADMIN_EDIT_USER_SUCCESS,
  ADMIN_EDIT_USER_FAIL,
} from "./admin-actions";

import { LOGOUT_SUCCESS } from "../authentication/authentication-actions";
import { ReduxAction } from "../common/interfaces";

interface User {
  isAdmin: boolean;
  emailAddress: string;
}

interface AdminState {
  appStates: any[];
  users: User[];
  impersonatingUserId: number | null;
  isEditingUser: boolean;
  errorEditingUser: string;
}

const createInitialState = (): AdminState => ({
  appStates: [],
  users: [],
  impersonatingUserId: null,
  isEditingUser: false,
  errorEditingUser: "",
});

export const adminReducer = (
  state: AdminState = createInitialState(),
  action: ReduxAction
): AdminState => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_APP_STATES_SUCCESS:
      return {
        ...state,
        appStates: payload.appStates,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
      };
    case IMPERSONATE_USER:
      return {
        ...state,
        impersonatingUserId: payload.user.id,
      };
    case STOP_IMPERSONATING_USER:
      return {
        ...state,
        impersonatingUserId: null,
      };
    case ADMIN_EDIT_USER_START:
      return {
        ...state,
        isEditingUser: true,
        errorEditingUser: "",
      };
    case ADMIN_EDIT_USER_SUCCESS:
      return {
        ...state,
        isEditingUser: false,
        errorEditingUser: "",
      };
    case ADMIN_EDIT_USER_FAIL:
      return {
        ...state,
        isEditingUser: false,
        errorEditingUser: "Error editing user",
      };
    case LOGOUT_SUCCESS:
      return createInitialState();
    default:
      return state;
  }
};
