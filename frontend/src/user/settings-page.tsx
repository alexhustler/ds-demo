import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Divider, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, TextField } from "@material-ui/core";

import { StoreState } from "../redux/configure-store";
import { colors } from "../theme/colors";
import Savebar from "../common/components/cancel-save";
import { updateUserSettings } from "./user-actions";
import {
  navigateToDashboardPage,
  navigateToPasswordPage,
} from "../routing/route-actions";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      margin: `${theme.spacing(5)}px ${theme.spacing()}px`,
      [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
        width: 900,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px`,
      maxHeight: "900px",
      overflowY: "auto",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    root: {
      width: "100%",
      overflowX: "auto",
    },
    dividerWrapper: {
      margin: `${theme.spacing(2)}px 0px`,
    },
    rightColumnWrapper: {
      marginLeft: theme.spacing(5),
      flexGrow: 1,
    },
    formControl: {
      marginTop: "20px",
    },
    section: {
      marginTop: theme.spacing(5),
      width: "100%",
    },
    subtitle: {
      marginTop: theme.spacing(3),
    },
    title: {
      marginTop: theme.spacing(3),
      fontWeight: "bold",
      borderBottomWidth: 3,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.primary.main,
    },
    flexColumnSection: {
      display: "flex",
      flexDirection: "column",
    },
    colorSwitchBaseEnabled: {
      color: colors.green,
    },
    colorSwitchBaseDisabled: {
      color: colors.red,
    },
    savebar: {
      textAlign: "right",
      width: "100%",
    },
  });

// #region
const SettingsPage = (props: any) => {
  const { classes, user } = props;

  const [state, setState] = useState({
    userId: user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    emailAddress: user.emailAddress || "",
  });

  const onChange = (e: any) => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = () => {
    props.updateUserSettings(state.userId);
  };

  const onCancel = () => {
    props.navigateToDashboardPage();
  };
  //#endregion

  return (
    <main className={classes.main}>
      <Typography component="h1" variant="h5" gutterBottom>
        User Settings
      </Typography>
      <Divider className={classes.dividerWrapper} />
      <Grid container spacing={2}>
        <Grid item container xs={12} md={5}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <Button
              style={{ marginBottom: "16px" }}
              onClick={() => props.navigateToPasswordPage()}
              variant="outlined"
              color="secondary"
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} md spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">First Name</Typography>
            <TextField
              margin="dense"
              fullWidth
              variant="filled"
              disabled
              placeholder="First Name"
              name="firstName"
              value={state.firstName}
              onChange={e => {
                onChange(e);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Last Name</Typography>
            <TextField
              margin="dense"
              fullWidth
              variant="filled"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Last Name"
              // label="Last Name"
              name="lastName"
              value={state.lastName}
              onChange={e => {
                onChange(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Email Address - Lead Notifications
            </Typography>
            <TextField
              margin="dense"
              variant="filled"
              disabled
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Email Address"
              name="emailAddress"
              value={state.emailAddress}
              onChange={e => {
                onChange(e);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.dividerWrapper} />
      <div className={classes.savebar}>
        <Savebar disableSave={false} onSave={onSave} onCancel={onCancel} />
      </div>
    </main>
  );
};

const mapStateToProps = (storeState: StoreState) => ({
  user: storeState.authentication.user,
  userSettings: storeState.user.userSettings,
});

export default connect(mapStateToProps, {
  navigateToDashboardPage,
  navigateToPasswordPage,
  updateUserSettings,
})(withStyles(styles)(SettingsPage));
