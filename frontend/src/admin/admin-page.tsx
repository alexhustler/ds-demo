import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";

import { StoreState } from "../redux/configure-store";
import { parseRouteIdFromProps, routePaths } from "../routing/route-paths";
import TopBar from "../user/components-layout/top-bar";
import MenuDrawer from "../user/components-layout/menu-drawer";
import AdminMenuList from "./admin-menu-list";
import RegisterPage from "../authentication/register-page";
import AppStatesTable from "./app-states/app-states-table";
import AdminUsersTable from "./users/admin-users-table";
import AdminUsersView from "./users/admin-users-view";

import { switchMenuDrawer } from "../user/user-actions";
import { navigateToAdminUsersViewPage } from "../routing/route-actions";
import {
  fetchAppStatesForAdmin,
  fetchUsersForAdmin,
  setAppStateWorkerProcessLock,
} from "./admin-actions";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingLeft: "100px",
      height: "100vh",
      overflow: "auto",
    },
    h5: {
      marginBottom: theme.spacing(2),
    },
  });

class Dashboard extends React.Component<any> {
  componentDidMount = () => {
    this.props.fetchUsersForAdmin();
    this.props.fetchAppStatesForAdmin();
  };

  render() {
    const {
      classes,
      pathname,
      switchMenuDrawer,
      isMenuDrawerOpen,
    } = this.props;
    return (
      <div className={classes.root}>
        <TopBar />
        <MenuDrawer
          pathname={pathname}
          open={isMenuDrawerOpen}
          handleDrawerClose={switchMenuDrawer}
          ListComponent={AdminMenuList}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Redirect
              exact
              path={routePaths.admin.root}
              to={routePaths.admin.users}
            />
            <Route
              path={routePaths.admin.appStates}
              render={props => (
                <AppStatesTable
                  {...props}
                  appStates={this.props.appStates}
                  setAppStateWorkerProcessLock={
                    this.props.setAppStateWorkerProcessLock
                  }
                />
              )}
            />
            <Route
              exact
              path={routePaths.admin.users}
              render={props => (
                <AdminUsersTable
                  {...props}
                  navigateToAdminUsersViewPage={
                    this.props.navigateToAdminUsersViewPage
                  }
                />
              )}
            />
            <Route
              exact
              path={routePaths.admin.usersView}
              render={props => (
                <AdminUsersView
                  {...props}
                  selectedUser={this.props.users.find(
                    (user: any) => user.id === parseRouteIdFromProps(props)
                  )}
                />
              )}
            />
            <Route
              path={routePaths.admin.register}
              render={props => <RegisterPage {...props} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  pathname: storeState.router.location.pathname,
  appStates: storeState.admin.appStates,
  isMenuDrawerOpen: storeState.user.isMenuDrawerOpen,
  user: storeState.authentication.user,
  users: storeState.admin.users,
});

export default connect(mapStateToProps, {
  switchMenuDrawer,
  fetchUsersForAdmin,
  fetchAppStatesForAdmin,
  navigateToAdminUsersViewPage,
  setAppStateWorkerProcessLock,
})(withStyles(styles)(Dashboard));
