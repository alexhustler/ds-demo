import { ReduxAction } from "../common/interfaces";

import {} from "../admin/admin-actions";
import { LOGOUT_SUCCESS } from "../authentication/authentication-actions";

interface ApiMessagesState {
  isLoading: {
    admin: any;
    authentication: any;
    user: any;
  };

  success: {
    admin: any;
    authentication: any;
    user: any;
  };

  error: {
    admin: any;
    authentication: any;
    user: any;
  };
}

const initialState: ApiMessagesState = {
  isLoading: {
    admin: false,
    authentication: false,
    user: false,
  },

  error: {
    admin: "",
    authentication: "",
    user: "",
  },

  success: {
    admin: "",
    authentication: "",
    user: "",
  },
};

export const apiMessagesReducer = (
  state: ApiMessagesState = initialState,
  action: ReduxAction
): ApiMessagesState => {
  const { payload, type } = action;

  switch (type) {
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
