export const routePaths = {
  admin: {
    root: "/admin",
    appStates: "/admin/app-states",
    register: "/admin/register",
    users: "/admin/users",
    usersView: "/admin/users/:id",
  },
  auth: {
    changePassword: "/change-password",
    login: "/login",
  },
  dashboard: {
    root: "/dashboard",
  },
  root: "/",
  user: {
    root: "/",
    settings: "/settings",
  },
};

export const parseRouteIdFromProps = (props: any): number =>
  parseInt(props.match.params.id);

export const setPathId = (path: string, id: number): string =>
  path.replace(":id", String(id));
