import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { createRootReducer } from "./create-reducer";

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);
export const store = createStore(
  rootReducer,
  applyMiddleware(
    // thunk has to be listed before logger or else we see many "undefined" actions
    thunk,
    // logger,
    routerMiddleware(history) // for dispatching history actions
  )
);

export type StoreState = ReturnType<typeof rootReducer>;
