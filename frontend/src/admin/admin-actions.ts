import api from "../api/api";
import httpService from "../http-service";

export const FETCH_APP_STATES_SUCCESS = "FETCH_APP_STATES_SUCCESS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const IMPERSONATE_USER = "IMPERSONATE_USER";
export const STOP_IMPERSONATING_USER = "STOP_IMPERSONATING_USER";
export const ADMIN_EDIT_USER_START = "ADMIN_EDIT_USER_START";
export const ADMIN_EDIT_USER_SUCCESS = "ADMIN_EDIT_USER_SUCCESS";
export const ADMIN_EDIT_USER_FAIL = "ADMIN_EDIT_USER_FAIL";

let adminAxiosInterceptor: any;

const dispatchFetchUsersSuccess = (dispatch: Function, users: any) => {
  dispatch({ type: FETCH_USERS_SUCCESS, payload: { users } });
};

const dispatchFetchAppStatesSuccess = (dispatch: Function, appStates: any) => {
  dispatch({ type: FETCH_APP_STATES_SUCCESS, payload: { appStates } });
};

const dispatchAdminEditUserStart = (dispatch: Function) => {
  dispatch({ type: ADMIN_EDIT_USER_START, payload: {} });
};
const dispatchAdminEditUserSuccess = (dispatch: Function) => {
  dispatch({ type: ADMIN_EDIT_USER_SUCCESS, payload: {} });
};
const dispatchAdminEditUserFail = (dispatch: Function) => {
  dispatch({ type: ADMIN_EDIT_USER_FAIL, payload: {} });
};

const ejectAdminAxiosInterceptor = () => {
  httpService.axios.interceptors.request.eject(adminAxiosInterceptor);
  adminAxiosInterceptor = null;
};

export const updateUserForAdmin = (updatedUserForm: any) => {
  return async (dispatch: Function) => {
    try {
      dispatchAdminEditUserStart(dispatch);
      await api.admin.updateUserForAdmin(updatedUserForm);
      await fetchUsersForAdmin()(dispatch);
      dispatchAdminEditUserSuccess(dispatch);
      return true;
    } catch (error) {
      dispatchAdminEditUserFail(dispatch);
      return false;
    }
  };
};

export const impersonateUser = (user: any) => {
  return async (dispatch: Function) => {
    if (adminAxiosInterceptor) {
      ejectAdminAxiosInterceptor();
    }
    adminAxiosInterceptor = httpService.axios.interceptors.request.use(
      (config: any) => {
        config.headers = {
          ...config.headers,
          "x-admin-impersonate-user-id": user.id,
        };
        return config;
      }
    );
    dispatch({
      type: IMPERSONATE_USER,
      payload: {
        user,
      },
    });
  };
};

export const stopImpersonatingUser = () => {
  return async (dispatch: Function) => {
    ejectAdminAxiosInterceptor();
    dispatch({
      type: STOP_IMPERSONATING_USER,
      payload: {},
    });
  };
};

export const setAppStateWorkerProcessLock = (isLockWorkerProcess: boolean) => {
  return async (dispatch: Function) => {
    await api.admin.setAppStateWorkerProcessLock(isLockWorkerProcess);
    await fetchAppStatesForAdmin()(dispatch);
  };
};

export const fetchAppStatesForAdmin = () => {
  return async (dispatch: Function) => {
    const appStates = await api.admin.fetchAppStates();
    dispatchFetchAppStatesSuccess(dispatch, appStates);
  };
};

export const fetchUsersForAdmin = () => {
  return async (dispatch: Function) => {
    try {
      const users = await api.admin.fetchUsersForAdmin();
      dispatchFetchUsersSuccess(dispatch, users);
      return true;
    } catch (e) {
      return false;
    }
  };
};
