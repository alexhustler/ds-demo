import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import { adminReducer } from "../admin/admin-reducer";
import { apiMessagesReducer } from "../api/api-messages-reducer";
import { authenticationReducer } from "../authentication/authentication-reducer";
import { userReducer } from "../user/user-reducer";

export const createRootReducer = (history: History) =>
  combineReducers({
    admin: adminReducer,
    apiMessages: apiMessagesReducer,
    authentication: authenticationReducer,
    router: connectRouter(history),
    user: userReducer,
  });
