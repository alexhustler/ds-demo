import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Omit } from "@material-ui/types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Tooltip } from "@material-ui/core";

import { routePaths } from "./route-paths";

const linkToDashboard = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => (
    <RouterLink ref={ref} to={routePaths.dashboard.root} {...props} />
  )
);

interface MainListItemsProps {
  pathname: string;
}

const getCurrentMenuItemIdFromPathname = (pathname: string): string => {
  if (pathname.startsWith("/dashboard")) return "dashboard";
  return "";
};

const createMenuItems = () => {
  return [
    {
      id: "dashboard",
      primary: "Dashboard",
      buttonComponent: linkToDashboard,
      icon: DashboardIcon,
    },
  ];
};

const MainMenuList = (props: MainListItemsProps) => {
  const { pathname } = props;
  let menuItems = createMenuItems();
  let currentMenuItemId = getCurrentMenuItemIdFromPathname(pathname);

  return (
    <List>
      {menuItems.map(menuItem => (
        <Tooltip
          key={menuItem.primary}
          title={menuItem.primary}
          placement="right"
        >
          <ListItem
            button
            key={menuItem.id}
            component={menuItem.buttonComponent}
            selected={currentMenuItemId === menuItem.id}
          >
            <ListItemIcon>
              <menuItem.icon />
            </ListItemIcon>
            <ListItemText primary={menuItem.primary} />
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default MainMenuList;
