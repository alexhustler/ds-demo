import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  VALIDATING_SESSION_COOKIE,
  SUBMITTING_CHANGE_PASSWORD_FORM,
  SUBMITTING_LOGIN_FORM,
} from "./authentication-actions";
import {
  IMPERSONATE_USER,
  STOP_IMPERSONATING_USER,
} from "../admin/admin-actions";
import {
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_LOGO_IMAGE_SUCCESS,
} from "../user/user-actions";
import { ReduxAction } from "../common/interfaces";

interface User {
  isAdmin: boolean;
  emailAddress: string;
  firstName: string;
  lastName: string;
  logoImageUrl: string;
  profileImageUrl: string;
  autoDialerRecordedMessageFileName: string | null;
  autoDialerRecordedMessageUrl: string | null;
}

interface AuthenticationState {
  adminUser?: User | null; // this is used when the admin is impersonating another user
  isAuthenticated: boolean;
  validatingSessionCookie: boolean;
  user: User | null | undefined;
  isLoginFailed: boolean;
  registerFailed: boolean;
  isSubmittingLoginForm: boolean;
  isSubmittingChangePasswordForm: boolean;
}

export const createInitialState = (): AuthenticationState => ({
  isAuthenticated: false,
  validatingSessionCookie: false,
  user: null,
  isLoginFailed: false,
  registerFailed: false,
  isSubmittingLoginForm: false,
  isSubmittingChangePasswordForm: false,
});

export const authenticationReducer = (
  state: AuthenticationState = createInitialState(),
  action: ReduxAction
): AuthenticationState => {
  const { payload, type } = action;
  switch (type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmittingChangePasswordForm: false,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isSubmittingChangePasswordForm: false,
      };
    case IMPERSONATE_USER:
      return {
        ...state,
        adminUser: state.user,
        user: payload.user,
      };
    case STOP_IMPERSONATING_USER:
      return {
        ...state,
        adminUser: null,
        user: state.adminUser,
      };
    case LOGIN_FAIL:
      return {
        ...createInitialState(),
        isLoginFailed: true,
        isSubmittingLoginForm: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerFailed: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoginFailed: false,
        registerFailed: false,
        isAuthenticated: true,
        isSubmittingLoginForm: false,
        validatingSessionCookie: false,
        user: payload.user,
      };
    case LOGOUT_SUCCESS:
      return createInitialState();
    case VALIDATING_SESSION_COOKIE:
      return {
        ...state,
        validatingSessionCookie: true,
        isSubmittingLoginForm: false,
      };
    case SUBMITTING_LOGIN_FORM:
      return {
        ...state,
        isSubmittingLoginForm: true,
      };
    case SUBMITTING_CHANGE_PASSWORD_FORM:
      return {
        ...state,
        isSubmittingChangePasswordForm: true,
      };
    case UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };

    case UPDATE_USER_LOGO_IMAGE_SUCCESS:
      let __user = state.user;
      if (__user) {
        __user.logoImageUrl = payload.url;
      }
      return {
        ...state,
        user: __user || state.user,
      };

    default:
      return state;
  }
};
