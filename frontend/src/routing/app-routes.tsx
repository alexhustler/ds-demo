import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";

import { StoreState } from "../redux/configure-store";
import MainList from "./menu-list";
import DashboardPage from "../user/dashboard-page";
import TopBar from "../user/components-layout/top-bar";
import MenuDrawer from "../user/components-layout/menu-drawer";

import { switchMenuDrawer } from "../user/user-actions";
import { stopImpersonatingUser } from "../admin/admin-actions";
import { navigateToAdminPage } from "./route-actions";

import { routePaths } from "./route-paths";
import SettingsPage from "../user/settings-page";
import ChangePasswordPage from "../authentication/change-password-page";

const drawerWidth = 72;
const openDrawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
      overflow: "hidden",
    },
    appBarSpacer: theme.mixins.toolbar,
    contentMenuOpen: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      minWidth: "50vw",
      minHeight: "100vh",
      marginLeft: `${openDrawerWidth}px`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      minWidth: "50vw",
      minHeight: "100vh",
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    tableContainer: {
      height: 320,
    },
    h5: {
      marginBottom: theme.spacing(2),
    },
  });

class AppRoutes extends React.Component<any> {
  render() {
    const { classes, pathname, isMenuDrawerOpen } = this.props;

    return (
      <div className={classes.root}>
        <TopBar />
        <MenuDrawer
          pathname={pathname}
          open={isMenuDrawerOpen}
          handleDrawerClose={this.props.switchMenuDrawer}
          ListComponent={MainList}
        />

        <main
          className={
            isMenuDrawerOpen ? classes.contentMenuOpen : classes.content
          }
        >
          <div className={classes.appBarSpacer} />
          <Switch>
            <Redirect exact path="/" to={routePaths.dashboard.root} />
            <Route
              exact
              path={routePaths.user.settings}
              render={props => <SettingsPage {...props} />}
            />
            <Route
              path={routePaths.auth.changePassword}
              render={props => <ChangePasswordPage {...props} />}
            />
            <Route
              path={routePaths.dashboard.root}
              render={props => <DashboardPage {...props} />}
            />
          </Switch>
        </main>
        {this.props.impersonatingUserId && (
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "red",
              position: "fixed",
              top: "64px",
              color: "white",
              textAlign: "center",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            IMPERSONATING USER {`${this.props.impersonatingUserId} `}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.stopImpersonatingUser();
                this.props.navigateToAdminPage();
              }}
              style={{
                marginLeft: "15px",
                width: "auto",
              }}
            >
              EXIT{" "}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  pathname: storeState.router.location.pathname,
  isMenuDrawerOpen: storeState.user.isMenuDrawerOpen,
  impersonatingUserId: storeState.admin.impersonatingUserId,
  user: storeState.authentication.user,
});

export default connect(mapStateToProps, {
  switchMenuDrawer,
  navigateToAdminPage,
  stopImpersonatingUser,
})(withStyles(styles)(AppRoutes));
