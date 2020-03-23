import { push } from "connected-react-router";

import api from "../api/api";
import { routePaths } from "../routing/route-paths";
import {
  navigateToAdminPage,
  navigateToDashboardPage,
} from "../routing/route-actions";

export const SUBMITTING_CHANGE_PASSWORD_FORM =
  "SUBMITTING_CHANGE_PASSWORD_FORM";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAIL = "CHANGE_PASSWORD_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const VALIDATING_SESSION_COOKIE = "VALIDATING_SESSION_COOKIE";
export const SUBMITTING_LOGIN_FORM = "SUBMITTING_LOGIN_FORM";

interface User {
  isAdmin: boolean;
  emailAddress: string;
  id: number;
}

const isAdmin = (user: User) => user.isAdmin;

const dispatchLoginSuccess = (
  dispatch: any,
  redirectPath: string,
  user: any
): void => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  });
  if (redirectPath) {
    if (isAdmin(user)) {
      navigateToAdminPage()(dispatch);
      return;
    }
    dispatch(push(redirectPath));
  }
};

const dispatchSubmittingChangePasswordForm = (dispatch: Function): void => {
  dispatch({ type: SUBMITTING_CHANGE_PASSWORD_FORM });
};

const dispatchChangePasswordFail = (dispatch: Function): void => {
  dispatch({ type: CHANGE_PASSWORD_FAIL });
};

const dispatchChangePasswordSuccess = (dispatch: Function): void => {
  dispatch({ type: CHANGE_PASSWORD_SUCCESS });
};

const dispatchLoginFail = (dispatch: Function): void => {
  dispatch({ type: LOGIN_FAIL });
};

const dispatchSubmittingLoginForm = (dispatch: Function): void => {
  dispatch({ type: SUBMITTING_LOGIN_FORM });
};

const dispatchRegisterSuccess = (dispatch: Function, user: any) => {
  dispatch({ type: REGISTER_SUCCESS, payload: { user } });
  navigateToDashboardPage()(dispatch);
};

const dispatchRegisterFail = (dispatch: Function) => {
  dispatch({ type: REGISTER_FAIL });
};

const dispatchLogoutSuccess = (dispatch: Function) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

const dispatchValidatingSessionCookie = (dispatch: Function) => {
  dispatch({ type: VALIDATING_SESSION_COOKIE, payload: {} });
};

export const submitLoginForm = (emailAddress: string, password: string) => {
  return async (dispatch: Function) => {
    try {
      dispatchSubmittingLoginForm(dispatch);
      const loggedUser = await api.auth.login(emailAddress, password);
      dispatchLoginSuccess(dispatch, routePaths.dashboard.root, loggedUser);
      return true;
    } catch (e) {
      //console.log(e.response)
      dispatchLoginFail(dispatch);
      return false;
    }
  };
};

export const submitChangePasswordForm = (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  return async (dispatch: Function) => {
    try {
      dispatchSubmittingChangePasswordForm(dispatch);
      await api.auth.changePassword(userId, currentPassword, newPassword);
      dispatchChangePasswordSuccess(dispatch);
      navigateToDashboardPage()(dispatch);
    } catch (error) {
      dispatchChangePasswordFail(dispatch);
    }
  };
};

export const submitRegisterForm = (
  emailAddress: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return (dispatch: Function) => {
    return api.auth
      .register(emailAddress, password, firstName, lastName)
      .then(user => dispatchRegisterSuccess(dispatch, user))
      .catch(() => dispatchRegisterFail(dispatch));
  };
};

export const logout = () => {
  return (dispatch: Function) => {
    return api.auth.logout().then(() => {
      dispatchLogoutSuccess(dispatch);
      dispatch(push(routePaths.auth.login));
    });
  };
};

export const validateSessionCookie = () => {
  return (dispatch: Function) => {
    dispatchValidatingSessionCookie(dispatch);
    return api.auth
      .validateSessionCookie()
      .then((user: any) => dispatchLoginSuccess(dispatch, "", user))
      .catch(() => {
        dispatchLogoutSuccess(dispatch);
      });
  };
};
