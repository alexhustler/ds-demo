import React from "react";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import PeopleIcon from "@material-ui/icons/People";

import { routePaths } from "../routing/route-paths";

const linkToUsers = (props: any) => (
  <Link to={routePaths.admin.users} {...props} />
);

const linkToRegister = (props: any) => (
  <Link to={routePaths.admin.register} {...props} />
);

const linkToAppStates = (props: any) => (
  <Link to={routePaths.admin.appStates} {...props} />
);

const AdminMenuList = (props: any) => {
  const { pathname } = props;

  return (
    <List>
      <ListItem
        button
        component={linkToUsers}
        selected={pathname.startsWith("/admin/users")}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem
        button
        component={linkToAppStates}
        selected={pathname.startsWith("/admin/app-states")}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="App States" />
      </ListItem>
      <ListItem
        button
        component={linkToRegister}
        selected={pathname.startsWith("/admin/register")}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
    </List>
  );
};

export default AdminMenuList;
