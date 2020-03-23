import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import { createStyles } from "@material-ui/core";

import { StoreState } from "../../redux/configure-store";
import { pathToLogoPartial } from "../../common/assets";

import AccountDropdown from "./account-dropdown";

import { switchMenuDrawer } from "../user-actions";
import { logout } from "../../authentication/authentication-actions";
import {
  navigateToSettingsPage,
  navigateToChangePasswordPage,
} from "../user-actions";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: "48px", // keep right padding when drawer closed
    },

    toolbarContainer: {
      alignItems: "center",
      flexWrap: "nowrap",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    avatarFlex: {
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100vh",
      overflow: "auto",
    },
  });

const TopBar = (props: any) => {
  const {
    classes,
    isMenuDrawerOpen,
    logout,
    switchMenuDrawer,
    navigateToSettingsPage,
    navigateToChangePasswordPage,
    userFirstName,
    userLastName,
    userProfileImage,
  } = props;

  return (
    <>
      <AppBar
        position="fixed"
        className={classNames(
          classes.appBar,
          isMenuDrawerOpen && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!isMenuDrawerOpen} className={classes.toolbar}>
          <Grid container className={classes.toolbarContainer}>
            <Grid item xs={1}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={switchMenuDrawer}
                className={classNames(
                  classes.menuButton,
                  isMenuDrawerOpen && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                <img
                  src={pathToLogoPartial}
                  alt="demo"
                  style={{
                    verticalAlign: "middle",
                    // minWidth: "30%",
                    // maxWidth: "190px",
                  }}
                  width="50%"
                  height="50%"
                />
              </Typography>
            </Grid>
            <div className={classes.title}> </div>

            <Grid item xs={1}>
              <AccountDropdown
                classes={{ root: classes.avatarFlex }}
                userFullName={userFirstName + userLastName}
                userProfileImage={userProfileImage}
                logoutClick={logout}
                changePasswordClick={navigateToChangePasswordPage}
                settingsClick={navigateToSettingsPage}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (storeState: StoreState) => ({
  user: storeState.authentication.user,
  userProfileImage:
    storeState.authentication.user &&
    storeState.authentication.user.profileImageUrl,
  userFirstName:
    storeState.authentication.user && storeState.authentication.user.firstName,
  userLastName:
    storeState.authentication.user && storeState.authentication.user.lastName,
  isMenuDrawerOpen: storeState.user.isMenuDrawerOpen,
});

export default connect(mapStateToProps, {
  logout,
  switchMenuDrawer,
  navigateToSettingsPage,
  navigateToChangePasswordPage,
})(withStyles(styles)(TopBar));
