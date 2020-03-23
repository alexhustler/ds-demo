import { routePaths, setPathId } from "../routing/route-paths";
import { push } from "connected-react-router";

export const navigateToDashboardPage = () => (dispatch: Function) =>
  dispatch(push(routePaths.dashboard.root));

export const navigateToPasswordPage = () => (dispatch: Function) =>
  dispatch(push(routePaths.auth.changePassword));

export const navigateToAdminPage = () => (dispatch: Function) =>
  dispatch(push(routePaths.admin.root));

export const navigateToAdminUsersViewPage = (userId: number) => (
  dispatch: Function
) => dispatch(push(setPathId(routePaths.admin.usersView, userId)));
